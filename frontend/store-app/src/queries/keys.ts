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

export const shopPageKeys = {
  all: ['shopPages'] as const,
  lists: () => [...shopPageKeys.all, 'list'] as const,
  details: () => [...shopPageKeys.all, 'detail'] as const,
  detail: (id: string) => [...shopPageKeys.details(), id] as const,
  builders: () => [...shopPageKeys.all, 'builder'] as const,
  builder: (id: string) => [...shopPageKeys.builders(), id] as const,
};
