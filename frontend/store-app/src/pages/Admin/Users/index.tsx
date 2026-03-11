import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AdminUser, AdminUserDetail, VendorProfile } from '@/services/adminUsers.service';
import {
  useAdminUsersQuery,
  useAdminVendorStatsQuery,
  useChangeRoleMutation,
  useDeleteUserMutation,
  useResetPasswordMutation,
  useToggleBanMutation,
  useAdminUserDetailQuery,
  useAdminVendorProfileQuery,
  useAdminSetIdentityStatusMutation,
} from '@/queries/useAdminUsersQuery';

type DialogType = 'role' | 'ban' | 'reset' | 'delete' | null;

const ROLE_COLORS: Record<string, string> = {
  ADMIN: 'bg-purple-100 text-purple-800',
  VENDOR: 'bg-blue-100 text-blue-800',
  CUSTOMER: 'bg-green-100 text-green-800',
  SUPPORT: 'bg-orange-100 text-orange-800',
};

const IDENTITY_STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-700',
  PROCESSING: 'bg-yellow-100 text-yellow-800',
  VERIFIED: 'bg-green-100 text-green-800',
  FAILED: 'bg-red-100 text-red-800',
};

const PROFILE_STATUS_COLORS: Record<string, string> = {
  COMPLETE: 'bg-green-100 text-green-800',
  PENDING_PROFILE: 'bg-yellow-100 text-yellow-800',
  PENDING_IDENTITY: 'bg-orange-100 text-orange-800',
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminUsersPage() {
  const { t } = useTranslation('admin');
  const { data: users, isLoading, isError } = useAdminUsersQuery();
  const { data: vendorStats } = useAdminVendorStatsQuery();

  const changeRoleMutation = useChangeRoleMutation();
  const toggleBanMutation = useToggleBanMutation();
  const resetPasswordMutation = useResetPasswordMutation();
  const deleteUserMutation = useDeleteUserMutation();

  const setIdentityStatusMutation = useAdminSetIdentityStatusMutation();
  const [detailUserId, setDetailUserId] = useState<string | null>(null);
  const [detailUserRole, setDetailUserRole] = useState<string | undefined>(undefined);

  const { data: userDetail, isLoading: isLoadingDetail } = useAdminUserDetailQuery(detailUserId);
  const { data: vendorProfile, isLoading: isLoadingProfile } = useAdminVendorProfileQuery(detailUserId, detailUserRole);

  function openDetailDialog(user: AdminUser) {
    setDetailUserId(user.id);
    setDetailUserRole(user.role);
  }

  function closeDetailDialog() {
    setDetailUserId(null);
    setDetailUserRole(undefined);
  }

  const [activeDialog, setActiveDialog] = useState<DialogType>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [tempPassword, setTempPassword] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());

  const ALL_ROLES = ['ADMIN', 'VENDOR', 'CUSTOMER', 'SUPPORT'] as const;

  function toggleRole(role: string) {
    setSelectedRoles(prev => {
      const next = new Set(prev);
      if (next.has(role)) next.delete(role); else next.add(role);
      return next;
    });
  }

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRoles.size === 0 || selectedRoles.has(user.role);
    return matchesSearch && matchesRole;
  });

  function openDialog(type: DialogType, user: AdminUser) {
    setSelectedUser(user);
    setActiveDialog(type);
    if (type === 'role') setSelectedRole(user.role);
    if (type === 'reset') { setTempPassword(''); setCopied(false); }
  }

  function closeDialog() {
    setActiveDialog(null);
    setSelectedUser(null);
    setTempPassword('');
    setCopied(false);
  }

  async function handleChangeRole() {
    if (!selectedUser) return;
    await changeRoleMutation.mutateAsync({ id: selectedUser.id, role: selectedRole });
    closeDialog();
  }

  async function handleToggleBan() {
    if (!selectedUser) return;
    await toggleBanMutation.mutateAsync({ id: selectedUser.id, banned: !selectedUser.isBanned });
    closeDialog();
  }

  async function handleResetPassword() {
    if (!selectedUser) return;
    const result = await resetPasswordMutation.mutateAsync(selectedUser.id);
    setTempPassword(result.tempPassword);
  }

  async function handleDeleteUser() {
    if (!selectedUser) return;
    await deleteUserMutation.mutateAsync(selectedUser.id);
    closeDialog();
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(tempPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (isLoading) return <p className="p-6 text-muted-foreground">{t('users.loading')}</p>;
  if (isError) return <p className="p-6 text-destructive">{t('users.errorLoad')}</p>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">{t('users.title')}</h1>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder={t('users.searchPlaceholder')}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t('users.filterByRole')}</span>
          {ALL_ROLES.map(role => (
            <button
              key={role}
              type="button"
              onClick={() => toggleRole(role)}
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-opacity cursor-pointer
                ${selectedRoles.has(role)
                  ? ROLE_COLORS[role]
                  : 'bg-muted text-muted-foreground opacity-50 hover:opacity-75'
                }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left px-4 py-3 font-medium">{t('users.email')}</th>
              <th className="text-left px-4 py-3 font-medium">{t('users.role')}</th>
              <th className="text-left px-4 py-3 font-medium">{t('users.status')}</th>
              <th className="text-left px-4 py-3 font-medium">{t('users.lastIp')}</th>
              <th className="text-left px-4 py-3 font-medium">{t('users.sales')}</th>
              <th className="text-left px-4 py-3 font-medium">{t('users.lastLogin')}</th>
              <th className="text-left px-4 py-3 font-medium">{t('users.createdAt')}</th>
              <th className="text-left px-4 py-3 font-medium">{t('users.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => openDetailDialog(user)}
                    className="font-medium text-primary underline-offset-2 hover:underline cursor-pointer text-left"
                  >
                    {user.email}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLORS[user.role] ?? 'bg-gray-100 text-gray-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {user.isBanned ? (
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                      {t('users.banned')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      {t('users.active')}
                    </span>
                  )}
                </td>

                {/* Colonna IP con tooltip storico */}
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {user.lastIp ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help underline decoration-dotted decoration-muted-foreground/50">
                          {user.lastIp}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-xs p-2">
                        <p className="font-semibold text-xs mb-1.5">{t('users.ipHistory')}</p>
                        <ul className="space-y-1">
                          {user.ipHistory.map((entry, i) => (
                            <li key={i} className="flex justify-between gap-4 text-xs">
                              <span className="font-mono">{entry.ipAddress}</span>
                              <span className="text-muted-foreground whitespace-nowrap">
                                {formatDate(entry.createdAt)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <span>—</span>
                  )}
                </td>

                {/* Colonna Vendite (solo per VENDOR) */}
                <td className="px-4 py-3">
                  {user.role === 'VENDOR' && vendorStats?.[user.id] ? (
                    <div className="text-xs space-y-0.5">
                      <div className="font-medium">
                        €{vendorStats[user.id].totalRevenue.toFixed(2)}
                      </div>
                      <div className="text-muted-foreground">
                        {vendorStats[user.id].totalOrders} {t('users.orders')}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>

                <td className="px-4 py-3 text-muted-foreground">{formatDate(user.lastLoginAt)}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDialog('role', user)}
                    >
                      {t('users.changeRole')}
                    </Button>
                    <Button
                      variant={user.isBanned ? 'default' : 'destructive'}
                      size="sm"
                      onClick={() => openDialog('ban', user)}
                    >
                      {user.isBanned ? t('users.unban') : t('users.ban')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDialog('reset', user)}
                    >
                      {t('users.resetPassword')}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDialog('delete', user)}
                    >
                      {t('users.deleteUser')}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers?.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            {t('users.noResults')}
          </p>
        )}
      </div>

      {/* Dialog: Dettaglio Utente */}
      <Dialog open={!!detailUserId} onOpenChange={(open) => !open && closeDetailDialog()}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('users.detailTitle')}</DialogTitle>
          </DialogHeader>

          {isLoadingDetail ? (
            <p className="py-4 text-center text-sm text-muted-foreground">{t('users.loading')}</p>
          ) : userDetail ? (
            <div className="space-y-6 py-2">

              {/* Sezione 1: Account — tutti gli utenti */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {t('users.sectionAccount')}
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-0.5">{t('users.email')}</p>
                    <p className="font-medium">{userDetail.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5">{t('users.role')}</p>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLORS[userDetail.role] ?? 'bg-gray-100'}`}>
                      {userDetail.role}
                    </span>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5">{t('users.status')}</p>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${userDetail.isBanned ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {userDetail.isBanned ? t('users.banned') : t('users.active')}
                    </span>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5">{t('users.profileStatus')}</p>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${PROFILE_STATUS_COLORS[userDetail.profileStatus] ?? 'bg-gray-100 text-gray-700'}`}>
                      {userDetail.profileStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5">{t('users.lastLogin')}</p>
                    <p>{formatDate(userDetail.lastLoginAt)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5">{t('users.createdAt')}</p>
                    <p>{formatDate(userDetail.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Sezione 2: Anagrafica — solo VENDOR */}
              {userDetail.role === 'VENDOR' && (
                <div className="space-y-3 border-t pt-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {t('users.sectionProfile')}
                  </h3>
                  {isLoadingProfile ? (
                    <p className="text-sm text-muted-foreground">{t('users.loading')}</p>
                  ) : vendorProfile ? (
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-0.5">{t('users.fullName')}</p>
                        <p className="font-medium">{vendorProfile.firstName} {vendorProfile.lastName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">{t('users.dateOfBirth')}</p>
                        <p>{formatDate(vendorProfile.dateOfBirth)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">{t('users.fiscalCode')}</p>
                        <p className="font-mono text-xs">{vendorProfile.fiscalCode}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">{t('users.vatNumber')}</p>
                        <p className="font-mono text-xs">{vendorProfile.vatNumber ?? '—'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground mb-0.5">{t('users.businessName')}</p>
                        <p className="font-medium">{vendorProfile.businessName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">{t('users.contactEmail')}</p>
                        <p>{vendorProfile.contactEmail}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-0.5">{t('users.phoneNumber')}</p>
                        <p>{vendorProfile.phoneNumber}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground mb-0.5">{t('users.address')}</p>
                        <p>{vendorProfile.address.street}, {vendorProfile.address.zip} {vendorProfile.address.city} ({vendorProfile.address.country})</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{t('users.noProfile')}</p>
                  )}
                </div>
              )}

              {/* Sezione 3: Verifica identità — solo VENDOR con profilo */}
              {userDetail.role === 'VENDOR' && vendorProfile && (
                <div className="space-y-3 border-t pt-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {t('users.sectionIdentity')}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">{t('users.identityStatus')}</p>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${IDENTITY_STATUS_COLORS[vendorProfile.identityStatus] ?? 'bg-gray-100'}`}>
                        {vendorProfile.identityStatus}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {vendorProfile.identityStatus !== 'PENDING' && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={setIdentityStatusMutation.isPending}
                          onClick={() => setIdentityStatusMutation.mutate({ userId: detailUserId!, status: 'PENDING' })}
                        >
                          {t('users.resetIdentity')}
                        </Button>
                      )}
                      {vendorProfile.identityStatus !== 'VERIFIED' && (
                        <Button
                          variant="default"
                          size="sm"
                          disabled={setIdentityStatusMutation.isPending}
                          onClick={() => setIdentityStatusMutation.mutate({ userId: detailUserId!, status: 'VERIFIED' })}
                        >
                          {t('users.approveIdentity')}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : null}

          <DialogFooter>
            <Button variant="outline" onClick={closeDetailDialog}>{t('users.close')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Cambia Ruolo */}
      <Dialog open={activeDialog === 'role'} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('users.changeRole')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
            <Label>{t('users.role')}</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
                <SelectItem value="VENDOR">VENDOR</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="SUPPORT">SUPPORT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>{t('users.cancel')}</Button>
            <Button onClick={handleChangeRole} disabled={changeRoleMutation.isPending}>
              {changeRoleMutation.isPending ? t('users.saving') : t('users.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Banna / Sbanna */}
      <Dialog open={activeDialog === 'ban'} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.isBanned ? t('users.unban') : t('users.ban')}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm py-2">
            {selectedUser?.isBanned ? t('users.confirmUnban') : t('users.confirmBan')}
          </p>
          <p className="text-sm font-medium">{selectedUser?.email}</p>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>{t('users.cancel')}</Button>
            <Button
              variant={selectedUser?.isBanned ? 'default' : 'destructive'}
              onClick={handleToggleBan}
              disabled={toggleBanMutation.isPending}
            >
              {toggleBanMutation.isPending ? t('users.saving') : t('users.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Elimina Utente */}
      <Dialog open={activeDialog === 'delete'} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('users.deleteUser')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive space-y-1">
              <p className="font-semibold">{t('users.deleteWarningTitle')}</p>
              <p>{t('users.deleteWarningBody')}</p>
            </div>
            <p className="text-sm text-muted-foreground">{t('users.deleteConfirmText')}</p>
            <p className="text-sm font-medium">{selectedUser?.email}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>{t('users.cancel')}</Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? t('users.deleting') : t('users.deleteConfirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Reset Password */}
      <Dialog open={activeDialog === 'reset'} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('users.resetPassword')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
            {!tempPassword ? (
              <p className="text-sm">{t('users.confirmReset')}</p>
            ) : (
              <div className="space-y-2">
                <Label>{t('users.tempPasswordLabel')}</Label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded bg-muted px-3 py-2 font-mono text-sm">
                    {tempPassword}
                  </code>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {copied ? t('users.tempPasswordCopied') : 'Copia'}
                  </Button>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            {!tempPassword ? (
              <>
                <Button variant="outline" onClick={closeDialog}>{t('users.cancel')}</Button>
                <Button onClick={handleResetPassword} disabled={resetPasswordMutation.isPending}>
                  {resetPasswordMutation.isPending ? t('users.saving') : t('users.confirm')}
                </Button>
              </>
            ) : (
              <Button onClick={closeDialog}>Chiudi</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
