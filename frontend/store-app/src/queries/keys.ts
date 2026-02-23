export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

export const userKeys = {
  all: ['users'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
};

export const cartKeys = {
  all: ['cart'] as const,
};

export const bundleKeys = {
  all: ['bundles'] as const,
  lists: () => [...bundleKeys.all, 'list'] as const,
  list: (filters: string) => [...bundleKeys.lists(), { filters }] as const,
  details: () => [...bundleKeys.all, 'detail'] as const,
  detail: (id: string) => [...bundleKeys.details(), id] as const,
};

export const licenseKeyKeys = {
  all: ['licenseKeys'] as const,
  byProduct: (productId: string) => [...licenseKeyKeys.all, productId] as const,
};

export const shopPageKeys = {
  all: ['shopPages'] as const,
  lists: () => [...shopPageKeys.all, 'list'] as const,
  details: () => [...shopPageKeys.all, 'detail'] as const,
  detail: (id: string) => [...shopPageKeys.details(), id] as const,
  builders: () => [...shopPageKeys.all, 'builder'] as const,
  builder: (id: string) => [...shopPageKeys.builders(), id] as const,
};
