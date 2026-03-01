import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
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
import { AdminUser } from '@/services/adminUsers.service';
import {
  useAdminUsersQuery,
  useChangeRoleMutation,
  useResetPasswordMutation,
  useToggleBanMutation,
} from '@/queries/useAdminUsersQuery';

type DialogType = 'role' | 'ban' | 'reset' | null;

const ROLE_COLORS: Record<string, string> = {
  ADMIN: 'bg-purple-100 text-purple-800',
  VENDOR: 'bg-blue-100 text-blue-800',
  CUSTOMER: 'bg-green-100 text-green-800',
  SUPPORT: 'bg-orange-100 text-orange-800',
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

  const changeRoleMutation = useChangeRoleMutation();
  const toggleBanMutation = useToggleBanMutation();
  const resetPasswordMutation = useResetPasswordMutation();

  const [activeDialog, setActiveDialog] = useState<DialogType>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [tempPassword, setTempPassword] = useState<string>('');
  const [copied, setCopied] = useState(false);

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

  function copyToClipboard() {
    navigator.clipboard.writeText(tempPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (isLoading) return <p className="p-6 text-muted-foreground">{t('users.loading')}</p>;
  if (isError) return <p className="p-6 text-destructive">{t('users.errorLoad')}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('users.title')}</h1>

      <div className="rounded-lg border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left px-4 py-3 font-medium">{t('users.email')}</th>
              <th className="text-left px-4 py-3 font-medium">{t('users.role')}</th>
              <th className="text-left px-4 py-3 font-medium">{t('users.status')}</th>
              <th className="text-left px-4 py-3 font-medium">{t('users.lastLogin')}</th>
              <th className="text-left px-4 py-3 font-medium">{t('users.createdAt')}</th>
              <th className="text-left px-4 py-3 font-medium">{t('users.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium">{user.email}</td>
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
