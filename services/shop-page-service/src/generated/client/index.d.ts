
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ShopPage
 * 
 */
export type ShopPage = $Result.DefaultSelection<Prisma.$ShopPagePayload>
/**
 * Model ShopPageProduct
 * 
 */
export type ShopPageProduct = $Result.DefaultSelection<Prisma.$ShopPageProductPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PageStatus: {
  NEW_PAGE: 'NEW_PAGE',
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED'
};

export type PageStatus = (typeof PageStatus)[keyof typeof PageStatus]

}

export type PageStatus = $Enums.PageStatus

export const PageStatus: typeof $Enums.PageStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ShopPages
 * const shopPages = await prisma.shopPage.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ShopPages
   * const shopPages = await prisma.shopPage.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.shopPage`: Exposes CRUD operations for the **ShopPage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShopPages
    * const shopPages = await prisma.shopPage.findMany()
    * ```
    */
  get shopPage(): Prisma.ShopPageDelegate<ExtArgs>;

  /**
   * `prisma.shopPageProduct`: Exposes CRUD operations for the **ShopPageProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShopPageProducts
    * const shopPageProducts = await prisma.shopPageProduct.findMany()
    * ```
    */
  get shopPageProduct(): Prisma.ShopPageProductDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ShopPage: 'ShopPage',
    ShopPageProduct: 'ShopPageProduct'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "shopPage" | "shopPageProduct"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ShopPage: {
        payload: Prisma.$ShopPagePayload<ExtArgs>
        fields: Prisma.ShopPageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopPageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopPageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPagePayload>
          }
          findFirst: {
            args: Prisma.ShopPageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopPageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPagePayload>
          }
          findMany: {
            args: Prisma.ShopPageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPagePayload>[]
          }
          create: {
            args: Prisma.ShopPageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPagePayload>
          }
          createMany: {
            args: Prisma.ShopPageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShopPageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPagePayload>[]
          }
          delete: {
            args: Prisma.ShopPageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPagePayload>
          }
          update: {
            args: Prisma.ShopPageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPagePayload>
          }
          deleteMany: {
            args: Prisma.ShopPageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShopPageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ShopPageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPagePayload>
          }
          aggregate: {
            args: Prisma.ShopPageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShopPage>
          }
          groupBy: {
            args: Prisma.ShopPageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShopPageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopPageCountArgs<ExtArgs>
            result: $Utils.Optional<ShopPageCountAggregateOutputType> | number
          }
        }
      }
      ShopPageProduct: {
        payload: Prisma.$ShopPageProductPayload<ExtArgs>
        fields: Prisma.ShopPageProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopPageProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPageProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopPageProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPageProductPayload>
          }
          findFirst: {
            args: Prisma.ShopPageProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPageProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopPageProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPageProductPayload>
          }
          findMany: {
            args: Prisma.ShopPageProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPageProductPayload>[]
          }
          create: {
            args: Prisma.ShopPageProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPageProductPayload>
          }
          createMany: {
            args: Prisma.ShopPageProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShopPageProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPageProductPayload>[]
          }
          delete: {
            args: Prisma.ShopPageProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPageProductPayload>
          }
          update: {
            args: Prisma.ShopPageProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPageProductPayload>
          }
          deleteMany: {
            args: Prisma.ShopPageProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShopPageProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ShopPageProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPageProductPayload>
          }
          aggregate: {
            args: Prisma.ShopPageProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShopPageProduct>
          }
          groupBy: {
            args: Prisma.ShopPageProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShopPageProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopPageProductCountArgs<ExtArgs>
            result: $Utils.Optional<ShopPageProductCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ShopPageCountOutputType
   */

  export type ShopPageCountOutputType = {
    products: number
  }

  export type ShopPageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | ShopPageCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * ShopPageCountOutputType without action
   */
  export type ShopPageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageCountOutputType
     */
    select?: ShopPageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShopPageCountOutputType without action
   */
  export type ShopPageCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopPageProductWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ShopPage
   */

  export type AggregateShopPage = {
    _count: ShopPageCountAggregateOutputType | null
    _min: ShopPageMinAggregateOutputType | null
    _max: ShopPageMaxAggregateOutputType | null
  }

  export type ShopPageMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    description: string | null
    status: $Enums.PageStatus | null
    vendorId: string | null
    htmlKey: string | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopPageMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    description: string | null
    status: $Enums.PageStatus | null
    vendorId: string | null
    htmlKey: string | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShopPageCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    description: number
    status: number
    vendorId: number
    htmlKey: number
    builder: number
    publishedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShopPageMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    status?: true
    vendorId?: true
    htmlKey?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopPageMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    status?: true
    vendorId?: true
    htmlKey?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShopPageCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    status?: true
    vendorId?: true
    htmlKey?: true
    builder?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShopPageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopPage to aggregate.
     */
    where?: ShopPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopPages to fetch.
     */
    orderBy?: ShopPageOrderByWithRelationInput | ShopPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShopPages
    **/
    _count?: true | ShopPageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopPageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopPageMaxAggregateInputType
  }

  export type GetShopPageAggregateType<T extends ShopPageAggregateArgs> = {
        [P in keyof T & keyof AggregateShopPage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShopPage[P]>
      : GetScalarType<T[P], AggregateShopPage[P]>
  }




  export type ShopPageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopPageWhereInput
    orderBy?: ShopPageOrderByWithAggregationInput | ShopPageOrderByWithAggregationInput[]
    by: ShopPageScalarFieldEnum[] | ShopPageScalarFieldEnum
    having?: ShopPageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopPageCountAggregateInputType | true
    _min?: ShopPageMinAggregateInputType
    _max?: ShopPageMaxAggregateInputType
  }

  export type ShopPageGroupByOutputType = {
    id: string
    title: string
    slug: string
    description: string | null
    status: $Enums.PageStatus
    vendorId: string
    htmlKey: string | null
    builder: JsonValue | null
    publishedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ShopPageCountAggregateOutputType | null
    _min: ShopPageMinAggregateOutputType | null
    _max: ShopPageMaxAggregateOutputType | null
  }

  type GetShopPageGroupByPayload<T extends ShopPageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopPageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopPageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopPageGroupByOutputType[P]>
            : GetScalarType<T[P], ShopPageGroupByOutputType[P]>
        }
      >
    >


  export type ShopPageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    status?: boolean
    vendorId?: boolean
    htmlKey?: boolean
    builder?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    products?: boolean | ShopPage$productsArgs<ExtArgs>
    _count?: boolean | ShopPageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shopPage"]>

  export type ShopPageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    status?: boolean
    vendorId?: boolean
    htmlKey?: boolean
    builder?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["shopPage"]>

  export type ShopPageSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    status?: boolean
    vendorId?: boolean
    htmlKey?: boolean
    builder?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShopPageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | ShopPage$productsArgs<ExtArgs>
    _count?: boolean | ShopPageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ShopPageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ShopPagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShopPage"
    objects: {
      products: Prisma.$ShopPageProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      description: string | null
      status: $Enums.PageStatus
      vendorId: string
      htmlKey: string | null
      builder: Prisma.JsonValue | null
      publishedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shopPage"]>
    composites: {}
  }

  type ShopPageGetPayload<S extends boolean | null | undefined | ShopPageDefaultArgs> = $Result.GetResult<Prisma.$ShopPagePayload, S>

  type ShopPageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ShopPageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ShopPageCountAggregateInputType | true
    }

  export interface ShopPageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShopPage'], meta: { name: 'ShopPage' } }
    /**
     * Find zero or one ShopPage that matches the filter.
     * @param {ShopPageFindUniqueArgs} args - Arguments to find a ShopPage
     * @example
     * // Get one ShopPage
     * const shopPage = await prisma.shopPage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopPageFindUniqueArgs>(args: SelectSubset<T, ShopPageFindUniqueArgs<ExtArgs>>): Prisma__ShopPageClient<$Result.GetResult<Prisma.$ShopPagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ShopPage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ShopPageFindUniqueOrThrowArgs} args - Arguments to find a ShopPage
     * @example
     * // Get one ShopPage
     * const shopPage = await prisma.shopPage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopPageFindUniqueOrThrowArgs>(args: SelectSubset<T, ShopPageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShopPageClient<$Result.GetResult<Prisma.$ShopPagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ShopPage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageFindFirstArgs} args - Arguments to find a ShopPage
     * @example
     * // Get one ShopPage
     * const shopPage = await prisma.shopPage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopPageFindFirstArgs>(args?: SelectSubset<T, ShopPageFindFirstArgs<ExtArgs>>): Prisma__ShopPageClient<$Result.GetResult<Prisma.$ShopPagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ShopPage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageFindFirstOrThrowArgs} args - Arguments to find a ShopPage
     * @example
     * // Get one ShopPage
     * const shopPage = await prisma.shopPage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopPageFindFirstOrThrowArgs>(args?: SelectSubset<T, ShopPageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShopPageClient<$Result.GetResult<Prisma.$ShopPagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ShopPages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShopPages
     * const shopPages = await prisma.shopPage.findMany()
     * 
     * // Get first 10 ShopPages
     * const shopPages = await prisma.shopPage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopPageWithIdOnly = await prisma.shopPage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShopPageFindManyArgs>(args?: SelectSubset<T, ShopPageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ShopPage.
     * @param {ShopPageCreateArgs} args - Arguments to create a ShopPage.
     * @example
     * // Create one ShopPage
     * const ShopPage = await prisma.shopPage.create({
     *   data: {
     *     // ... data to create a ShopPage
     *   }
     * })
     * 
     */
    create<T extends ShopPageCreateArgs>(args: SelectSubset<T, ShopPageCreateArgs<ExtArgs>>): Prisma__ShopPageClient<$Result.GetResult<Prisma.$ShopPagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ShopPages.
     * @param {ShopPageCreateManyArgs} args - Arguments to create many ShopPages.
     * @example
     * // Create many ShopPages
     * const shopPage = await prisma.shopPage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShopPageCreateManyArgs>(args?: SelectSubset<T, ShopPageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ShopPages and returns the data saved in the database.
     * @param {ShopPageCreateManyAndReturnArgs} args - Arguments to create many ShopPages.
     * @example
     * // Create many ShopPages
     * const shopPage = await prisma.shopPage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ShopPages and only return the `id`
     * const shopPageWithIdOnly = await prisma.shopPage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShopPageCreateManyAndReturnArgs>(args?: SelectSubset<T, ShopPageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ShopPage.
     * @param {ShopPageDeleteArgs} args - Arguments to delete one ShopPage.
     * @example
     * // Delete one ShopPage
     * const ShopPage = await prisma.shopPage.delete({
     *   where: {
     *     // ... filter to delete one ShopPage
     *   }
     * })
     * 
     */
    delete<T extends ShopPageDeleteArgs>(args: SelectSubset<T, ShopPageDeleteArgs<ExtArgs>>): Prisma__ShopPageClient<$Result.GetResult<Prisma.$ShopPagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ShopPage.
     * @param {ShopPageUpdateArgs} args - Arguments to update one ShopPage.
     * @example
     * // Update one ShopPage
     * const shopPage = await prisma.shopPage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShopPageUpdateArgs>(args: SelectSubset<T, ShopPageUpdateArgs<ExtArgs>>): Prisma__ShopPageClient<$Result.GetResult<Prisma.$ShopPagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ShopPages.
     * @param {ShopPageDeleteManyArgs} args - Arguments to filter ShopPages to delete.
     * @example
     * // Delete a few ShopPages
     * const { count } = await prisma.shopPage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShopPageDeleteManyArgs>(args?: SelectSubset<T, ShopPageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShopPages
     * const shopPage = await prisma.shopPage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShopPageUpdateManyArgs>(args: SelectSubset<T, ShopPageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ShopPage.
     * @param {ShopPageUpsertArgs} args - Arguments to update or create a ShopPage.
     * @example
     * // Update or create a ShopPage
     * const shopPage = await prisma.shopPage.upsert({
     *   create: {
     *     // ... data to create a ShopPage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShopPage we want to update
     *   }
     * })
     */
    upsert<T extends ShopPageUpsertArgs>(args: SelectSubset<T, ShopPageUpsertArgs<ExtArgs>>): Prisma__ShopPageClient<$Result.GetResult<Prisma.$ShopPagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ShopPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageCountArgs} args - Arguments to filter ShopPages to count.
     * @example
     * // Count the number of ShopPages
     * const count = await prisma.shopPage.count({
     *   where: {
     *     // ... the filter for the ShopPages we want to count
     *   }
     * })
    **/
    count<T extends ShopPageCountArgs>(
      args?: Subset<T, ShopPageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopPageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShopPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShopPageAggregateArgs>(args: Subset<T, ShopPageAggregateArgs>): Prisma.PrismaPromise<GetShopPageAggregateType<T>>

    /**
     * Group by ShopPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShopPageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopPageGroupByArgs['orderBy'] }
        : { orderBy?: ShopPageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShopPageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShopPage model
   */
  readonly fields: ShopPageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShopPage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopPageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends ShopPage$productsArgs<ExtArgs> = {}>(args?: Subset<T, ShopPage$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPageProductPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ShopPage model
   */ 
  interface ShopPageFieldRefs {
    readonly id: FieldRef<"ShopPage", 'String'>
    readonly title: FieldRef<"ShopPage", 'String'>
    readonly slug: FieldRef<"ShopPage", 'String'>
    readonly description: FieldRef<"ShopPage", 'String'>
    readonly status: FieldRef<"ShopPage", 'PageStatus'>
    readonly vendorId: FieldRef<"ShopPage", 'String'>
    readonly htmlKey: FieldRef<"ShopPage", 'String'>
    readonly builder: FieldRef<"ShopPage", 'Json'>
    readonly publishedAt: FieldRef<"ShopPage", 'DateTime'>
    readonly createdAt: FieldRef<"ShopPage", 'DateTime'>
    readonly updatedAt: FieldRef<"ShopPage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ShopPage findUnique
   */
  export type ShopPageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPage
     */
    select?: ShopPageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageInclude<ExtArgs> | null
    /**
     * Filter, which ShopPage to fetch.
     */
    where: ShopPageWhereUniqueInput
  }

  /**
   * ShopPage findUniqueOrThrow
   */
  export type ShopPageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPage
     */
    select?: ShopPageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageInclude<ExtArgs> | null
    /**
     * Filter, which ShopPage to fetch.
     */
    where: ShopPageWhereUniqueInput
  }

  /**
   * ShopPage findFirst
   */
  export type ShopPageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPage
     */
    select?: ShopPageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageInclude<ExtArgs> | null
    /**
     * Filter, which ShopPage to fetch.
     */
    where?: ShopPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopPages to fetch.
     */
    orderBy?: ShopPageOrderByWithRelationInput | ShopPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopPages.
     */
    cursor?: ShopPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopPages.
     */
    distinct?: ShopPageScalarFieldEnum | ShopPageScalarFieldEnum[]
  }

  /**
   * ShopPage findFirstOrThrow
   */
  export type ShopPageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPage
     */
    select?: ShopPageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageInclude<ExtArgs> | null
    /**
     * Filter, which ShopPage to fetch.
     */
    where?: ShopPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopPages to fetch.
     */
    orderBy?: ShopPageOrderByWithRelationInput | ShopPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopPages.
     */
    cursor?: ShopPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopPages.
     */
    distinct?: ShopPageScalarFieldEnum | ShopPageScalarFieldEnum[]
  }

  /**
   * ShopPage findMany
   */
  export type ShopPageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPage
     */
    select?: ShopPageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageInclude<ExtArgs> | null
    /**
     * Filter, which ShopPages to fetch.
     */
    where?: ShopPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopPages to fetch.
     */
    orderBy?: ShopPageOrderByWithRelationInput | ShopPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShopPages.
     */
    cursor?: ShopPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopPages.
     */
    skip?: number
    distinct?: ShopPageScalarFieldEnum | ShopPageScalarFieldEnum[]
  }

  /**
   * ShopPage create
   */
  export type ShopPageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPage
     */
    select?: ShopPageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageInclude<ExtArgs> | null
    /**
     * The data needed to create a ShopPage.
     */
    data: XOR<ShopPageCreateInput, ShopPageUncheckedCreateInput>
  }

  /**
   * ShopPage createMany
   */
  export type ShopPageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShopPages.
     */
    data: ShopPageCreateManyInput | ShopPageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShopPage createManyAndReturn
   */
  export type ShopPageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPage
     */
    select?: ShopPageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ShopPages.
     */
    data: ShopPageCreateManyInput | ShopPageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShopPage update
   */
  export type ShopPageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPage
     */
    select?: ShopPageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageInclude<ExtArgs> | null
    /**
     * The data needed to update a ShopPage.
     */
    data: XOR<ShopPageUpdateInput, ShopPageUncheckedUpdateInput>
    /**
     * Choose, which ShopPage to update.
     */
    where: ShopPageWhereUniqueInput
  }

  /**
   * ShopPage updateMany
   */
  export type ShopPageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShopPages.
     */
    data: XOR<ShopPageUpdateManyMutationInput, ShopPageUncheckedUpdateManyInput>
    /**
     * Filter which ShopPages to update
     */
    where?: ShopPageWhereInput
  }

  /**
   * ShopPage upsert
   */
  export type ShopPageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPage
     */
    select?: ShopPageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageInclude<ExtArgs> | null
    /**
     * The filter to search for the ShopPage to update in case it exists.
     */
    where: ShopPageWhereUniqueInput
    /**
     * In case the ShopPage found by the `where` argument doesn't exist, create a new ShopPage with this data.
     */
    create: XOR<ShopPageCreateInput, ShopPageUncheckedCreateInput>
    /**
     * In case the ShopPage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopPageUpdateInput, ShopPageUncheckedUpdateInput>
  }

  /**
   * ShopPage delete
   */
  export type ShopPageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPage
     */
    select?: ShopPageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageInclude<ExtArgs> | null
    /**
     * Filter which ShopPage to delete.
     */
    where: ShopPageWhereUniqueInput
  }

  /**
   * ShopPage deleteMany
   */
  export type ShopPageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopPages to delete
     */
    where?: ShopPageWhereInput
  }

  /**
   * ShopPage.products
   */
  export type ShopPage$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageProduct
     */
    select?: ShopPageProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageProductInclude<ExtArgs> | null
    where?: ShopPageProductWhereInput
    orderBy?: ShopPageProductOrderByWithRelationInput | ShopPageProductOrderByWithRelationInput[]
    cursor?: ShopPageProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShopPageProductScalarFieldEnum | ShopPageProductScalarFieldEnum[]
  }

  /**
   * ShopPage without action
   */
  export type ShopPageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPage
     */
    select?: ShopPageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageInclude<ExtArgs> | null
  }


  /**
   * Model ShopPageProduct
   */

  export type AggregateShopPageProduct = {
    _count: ShopPageProductCountAggregateOutputType | null
    _avg: ShopPageProductAvgAggregateOutputType | null
    _sum: ShopPageProductSumAggregateOutputType | null
    _min: ShopPageProductMinAggregateOutputType | null
    _max: ShopPageProductMaxAggregateOutputType | null
  }

  export type ShopPageProductAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type ShopPageProductSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type ShopPageProductMinAggregateOutputType = {
    id: string | null
    shopPageId: string | null
    productId: string | null
    sortOrder: number | null
    createdAt: Date | null
  }

  export type ShopPageProductMaxAggregateOutputType = {
    id: string | null
    shopPageId: string | null
    productId: string | null
    sortOrder: number | null
    createdAt: Date | null
  }

  export type ShopPageProductCountAggregateOutputType = {
    id: number
    shopPageId: number
    productId: number
    sortOrder: number
    createdAt: number
    _all: number
  }


  export type ShopPageProductAvgAggregateInputType = {
    sortOrder?: true
  }

  export type ShopPageProductSumAggregateInputType = {
    sortOrder?: true
  }

  export type ShopPageProductMinAggregateInputType = {
    id?: true
    shopPageId?: true
    productId?: true
    sortOrder?: true
    createdAt?: true
  }

  export type ShopPageProductMaxAggregateInputType = {
    id?: true
    shopPageId?: true
    productId?: true
    sortOrder?: true
    createdAt?: true
  }

  export type ShopPageProductCountAggregateInputType = {
    id?: true
    shopPageId?: true
    productId?: true
    sortOrder?: true
    createdAt?: true
    _all?: true
  }

  export type ShopPageProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopPageProduct to aggregate.
     */
    where?: ShopPageProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopPageProducts to fetch.
     */
    orderBy?: ShopPageProductOrderByWithRelationInput | ShopPageProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopPageProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopPageProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopPageProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShopPageProducts
    **/
    _count?: true | ShopPageProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShopPageProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShopPageProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopPageProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopPageProductMaxAggregateInputType
  }

  export type GetShopPageProductAggregateType<T extends ShopPageProductAggregateArgs> = {
        [P in keyof T & keyof AggregateShopPageProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShopPageProduct[P]>
      : GetScalarType<T[P], AggregateShopPageProduct[P]>
  }




  export type ShopPageProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopPageProductWhereInput
    orderBy?: ShopPageProductOrderByWithAggregationInput | ShopPageProductOrderByWithAggregationInput[]
    by: ShopPageProductScalarFieldEnum[] | ShopPageProductScalarFieldEnum
    having?: ShopPageProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopPageProductCountAggregateInputType | true
    _avg?: ShopPageProductAvgAggregateInputType
    _sum?: ShopPageProductSumAggregateInputType
    _min?: ShopPageProductMinAggregateInputType
    _max?: ShopPageProductMaxAggregateInputType
  }

  export type ShopPageProductGroupByOutputType = {
    id: string
    shopPageId: string
    productId: string
    sortOrder: number
    createdAt: Date
    _count: ShopPageProductCountAggregateOutputType | null
    _avg: ShopPageProductAvgAggregateOutputType | null
    _sum: ShopPageProductSumAggregateOutputType | null
    _min: ShopPageProductMinAggregateOutputType | null
    _max: ShopPageProductMaxAggregateOutputType | null
  }

  type GetShopPageProductGroupByPayload<T extends ShopPageProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopPageProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopPageProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopPageProductGroupByOutputType[P]>
            : GetScalarType<T[P], ShopPageProductGroupByOutputType[P]>
        }
      >
    >


  export type ShopPageProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopPageId?: boolean
    productId?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    shopPage?: boolean | ShopPageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shopPageProduct"]>

  export type ShopPageProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shopPageId?: boolean
    productId?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    shopPage?: boolean | ShopPageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shopPageProduct"]>

  export type ShopPageProductSelectScalar = {
    id?: boolean
    shopPageId?: boolean
    productId?: boolean
    sortOrder?: boolean
    createdAt?: boolean
  }

  export type ShopPageProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shopPage?: boolean | ShopPageDefaultArgs<ExtArgs>
  }
  export type ShopPageProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shopPage?: boolean | ShopPageDefaultArgs<ExtArgs>
  }

  export type $ShopPageProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShopPageProduct"
    objects: {
      shopPage: Prisma.$ShopPagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shopPageId: string
      productId: string
      sortOrder: number
      createdAt: Date
    }, ExtArgs["result"]["shopPageProduct"]>
    composites: {}
  }

  type ShopPageProductGetPayload<S extends boolean | null | undefined | ShopPageProductDefaultArgs> = $Result.GetResult<Prisma.$ShopPageProductPayload, S>

  type ShopPageProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ShopPageProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ShopPageProductCountAggregateInputType | true
    }

  export interface ShopPageProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShopPageProduct'], meta: { name: 'ShopPageProduct' } }
    /**
     * Find zero or one ShopPageProduct that matches the filter.
     * @param {ShopPageProductFindUniqueArgs} args - Arguments to find a ShopPageProduct
     * @example
     * // Get one ShopPageProduct
     * const shopPageProduct = await prisma.shopPageProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopPageProductFindUniqueArgs>(args: SelectSubset<T, ShopPageProductFindUniqueArgs<ExtArgs>>): Prisma__ShopPageProductClient<$Result.GetResult<Prisma.$ShopPageProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ShopPageProduct that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ShopPageProductFindUniqueOrThrowArgs} args - Arguments to find a ShopPageProduct
     * @example
     * // Get one ShopPageProduct
     * const shopPageProduct = await prisma.shopPageProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopPageProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ShopPageProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShopPageProductClient<$Result.GetResult<Prisma.$ShopPageProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ShopPageProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageProductFindFirstArgs} args - Arguments to find a ShopPageProduct
     * @example
     * // Get one ShopPageProduct
     * const shopPageProduct = await prisma.shopPageProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopPageProductFindFirstArgs>(args?: SelectSubset<T, ShopPageProductFindFirstArgs<ExtArgs>>): Prisma__ShopPageProductClient<$Result.GetResult<Prisma.$ShopPageProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ShopPageProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageProductFindFirstOrThrowArgs} args - Arguments to find a ShopPageProduct
     * @example
     * // Get one ShopPageProduct
     * const shopPageProduct = await prisma.shopPageProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopPageProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ShopPageProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShopPageProductClient<$Result.GetResult<Prisma.$ShopPageProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ShopPageProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShopPageProducts
     * const shopPageProducts = await prisma.shopPageProduct.findMany()
     * 
     * // Get first 10 ShopPageProducts
     * const shopPageProducts = await prisma.shopPageProduct.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopPageProductWithIdOnly = await prisma.shopPageProduct.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShopPageProductFindManyArgs>(args?: SelectSubset<T, ShopPageProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPageProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ShopPageProduct.
     * @param {ShopPageProductCreateArgs} args - Arguments to create a ShopPageProduct.
     * @example
     * // Create one ShopPageProduct
     * const ShopPageProduct = await prisma.shopPageProduct.create({
     *   data: {
     *     // ... data to create a ShopPageProduct
     *   }
     * })
     * 
     */
    create<T extends ShopPageProductCreateArgs>(args: SelectSubset<T, ShopPageProductCreateArgs<ExtArgs>>): Prisma__ShopPageProductClient<$Result.GetResult<Prisma.$ShopPageProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ShopPageProducts.
     * @param {ShopPageProductCreateManyArgs} args - Arguments to create many ShopPageProducts.
     * @example
     * // Create many ShopPageProducts
     * const shopPageProduct = await prisma.shopPageProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShopPageProductCreateManyArgs>(args?: SelectSubset<T, ShopPageProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ShopPageProducts and returns the data saved in the database.
     * @param {ShopPageProductCreateManyAndReturnArgs} args - Arguments to create many ShopPageProducts.
     * @example
     * // Create many ShopPageProducts
     * const shopPageProduct = await prisma.shopPageProduct.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ShopPageProducts and only return the `id`
     * const shopPageProductWithIdOnly = await prisma.shopPageProduct.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShopPageProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ShopPageProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPageProductPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ShopPageProduct.
     * @param {ShopPageProductDeleteArgs} args - Arguments to delete one ShopPageProduct.
     * @example
     * // Delete one ShopPageProduct
     * const ShopPageProduct = await prisma.shopPageProduct.delete({
     *   where: {
     *     // ... filter to delete one ShopPageProduct
     *   }
     * })
     * 
     */
    delete<T extends ShopPageProductDeleteArgs>(args: SelectSubset<T, ShopPageProductDeleteArgs<ExtArgs>>): Prisma__ShopPageProductClient<$Result.GetResult<Prisma.$ShopPageProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ShopPageProduct.
     * @param {ShopPageProductUpdateArgs} args - Arguments to update one ShopPageProduct.
     * @example
     * // Update one ShopPageProduct
     * const shopPageProduct = await prisma.shopPageProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShopPageProductUpdateArgs>(args: SelectSubset<T, ShopPageProductUpdateArgs<ExtArgs>>): Prisma__ShopPageProductClient<$Result.GetResult<Prisma.$ShopPageProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ShopPageProducts.
     * @param {ShopPageProductDeleteManyArgs} args - Arguments to filter ShopPageProducts to delete.
     * @example
     * // Delete a few ShopPageProducts
     * const { count } = await prisma.shopPageProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShopPageProductDeleteManyArgs>(args?: SelectSubset<T, ShopPageProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShopPageProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShopPageProducts
     * const shopPageProduct = await prisma.shopPageProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShopPageProductUpdateManyArgs>(args: SelectSubset<T, ShopPageProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ShopPageProduct.
     * @param {ShopPageProductUpsertArgs} args - Arguments to update or create a ShopPageProduct.
     * @example
     * // Update or create a ShopPageProduct
     * const shopPageProduct = await prisma.shopPageProduct.upsert({
     *   create: {
     *     // ... data to create a ShopPageProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShopPageProduct we want to update
     *   }
     * })
     */
    upsert<T extends ShopPageProductUpsertArgs>(args: SelectSubset<T, ShopPageProductUpsertArgs<ExtArgs>>): Prisma__ShopPageProductClient<$Result.GetResult<Prisma.$ShopPageProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ShopPageProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageProductCountArgs} args - Arguments to filter ShopPageProducts to count.
     * @example
     * // Count the number of ShopPageProducts
     * const count = await prisma.shopPageProduct.count({
     *   where: {
     *     // ... the filter for the ShopPageProducts we want to count
     *   }
     * })
    **/
    count<T extends ShopPageProductCountArgs>(
      args?: Subset<T, ShopPageProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopPageProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShopPageProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShopPageProductAggregateArgs>(args: Subset<T, ShopPageProductAggregateArgs>): Prisma.PrismaPromise<GetShopPageProductAggregateType<T>>

    /**
     * Group by ShopPageProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopPageProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShopPageProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopPageProductGroupByArgs['orderBy'] }
        : { orderBy?: ShopPageProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShopPageProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopPageProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShopPageProduct model
   */
  readonly fields: ShopPageProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShopPageProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopPageProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shopPage<T extends ShopPageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopPageDefaultArgs<ExtArgs>>): Prisma__ShopPageClient<$Result.GetResult<Prisma.$ShopPagePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ShopPageProduct model
   */ 
  interface ShopPageProductFieldRefs {
    readonly id: FieldRef<"ShopPageProduct", 'String'>
    readonly shopPageId: FieldRef<"ShopPageProduct", 'String'>
    readonly productId: FieldRef<"ShopPageProduct", 'String'>
    readonly sortOrder: FieldRef<"ShopPageProduct", 'Int'>
    readonly createdAt: FieldRef<"ShopPageProduct", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ShopPageProduct findUnique
   */
  export type ShopPageProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageProduct
     */
    select?: ShopPageProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageProductInclude<ExtArgs> | null
    /**
     * Filter, which ShopPageProduct to fetch.
     */
    where: ShopPageProductWhereUniqueInput
  }

  /**
   * ShopPageProduct findUniqueOrThrow
   */
  export type ShopPageProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageProduct
     */
    select?: ShopPageProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageProductInclude<ExtArgs> | null
    /**
     * Filter, which ShopPageProduct to fetch.
     */
    where: ShopPageProductWhereUniqueInput
  }

  /**
   * ShopPageProduct findFirst
   */
  export type ShopPageProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageProduct
     */
    select?: ShopPageProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageProductInclude<ExtArgs> | null
    /**
     * Filter, which ShopPageProduct to fetch.
     */
    where?: ShopPageProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopPageProducts to fetch.
     */
    orderBy?: ShopPageProductOrderByWithRelationInput | ShopPageProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopPageProducts.
     */
    cursor?: ShopPageProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopPageProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopPageProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopPageProducts.
     */
    distinct?: ShopPageProductScalarFieldEnum | ShopPageProductScalarFieldEnum[]
  }

  /**
   * ShopPageProduct findFirstOrThrow
   */
  export type ShopPageProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageProduct
     */
    select?: ShopPageProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageProductInclude<ExtArgs> | null
    /**
     * Filter, which ShopPageProduct to fetch.
     */
    where?: ShopPageProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopPageProducts to fetch.
     */
    orderBy?: ShopPageProductOrderByWithRelationInput | ShopPageProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShopPageProducts.
     */
    cursor?: ShopPageProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopPageProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopPageProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShopPageProducts.
     */
    distinct?: ShopPageProductScalarFieldEnum | ShopPageProductScalarFieldEnum[]
  }

  /**
   * ShopPageProduct findMany
   */
  export type ShopPageProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageProduct
     */
    select?: ShopPageProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageProductInclude<ExtArgs> | null
    /**
     * Filter, which ShopPageProducts to fetch.
     */
    where?: ShopPageProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShopPageProducts to fetch.
     */
    orderBy?: ShopPageProductOrderByWithRelationInput | ShopPageProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShopPageProducts.
     */
    cursor?: ShopPageProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShopPageProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShopPageProducts.
     */
    skip?: number
    distinct?: ShopPageProductScalarFieldEnum | ShopPageProductScalarFieldEnum[]
  }

  /**
   * ShopPageProduct create
   */
  export type ShopPageProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageProduct
     */
    select?: ShopPageProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageProductInclude<ExtArgs> | null
    /**
     * The data needed to create a ShopPageProduct.
     */
    data: XOR<ShopPageProductCreateInput, ShopPageProductUncheckedCreateInput>
  }

  /**
   * ShopPageProduct createMany
   */
  export type ShopPageProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShopPageProducts.
     */
    data: ShopPageProductCreateManyInput | ShopPageProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShopPageProduct createManyAndReturn
   */
  export type ShopPageProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageProduct
     */
    select?: ShopPageProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ShopPageProducts.
     */
    data: ShopPageProductCreateManyInput | ShopPageProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShopPageProduct update
   */
  export type ShopPageProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageProduct
     */
    select?: ShopPageProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageProductInclude<ExtArgs> | null
    /**
     * The data needed to update a ShopPageProduct.
     */
    data: XOR<ShopPageProductUpdateInput, ShopPageProductUncheckedUpdateInput>
    /**
     * Choose, which ShopPageProduct to update.
     */
    where: ShopPageProductWhereUniqueInput
  }

  /**
   * ShopPageProduct updateMany
   */
  export type ShopPageProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShopPageProducts.
     */
    data: XOR<ShopPageProductUpdateManyMutationInput, ShopPageProductUncheckedUpdateManyInput>
    /**
     * Filter which ShopPageProducts to update
     */
    where?: ShopPageProductWhereInput
  }

  /**
   * ShopPageProduct upsert
   */
  export type ShopPageProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageProduct
     */
    select?: ShopPageProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageProductInclude<ExtArgs> | null
    /**
     * The filter to search for the ShopPageProduct to update in case it exists.
     */
    where: ShopPageProductWhereUniqueInput
    /**
     * In case the ShopPageProduct found by the `where` argument doesn't exist, create a new ShopPageProduct with this data.
     */
    create: XOR<ShopPageProductCreateInput, ShopPageProductUncheckedCreateInput>
    /**
     * In case the ShopPageProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopPageProductUpdateInput, ShopPageProductUncheckedUpdateInput>
  }

  /**
   * ShopPageProduct delete
   */
  export type ShopPageProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageProduct
     */
    select?: ShopPageProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageProductInclude<ExtArgs> | null
    /**
     * Filter which ShopPageProduct to delete.
     */
    where: ShopPageProductWhereUniqueInput
  }

  /**
   * ShopPageProduct deleteMany
   */
  export type ShopPageProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShopPageProducts to delete
     */
    where?: ShopPageProductWhereInput
  }

  /**
   * ShopPageProduct without action
   */
  export type ShopPageProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopPageProduct
     */
    select?: ShopPageProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopPageProductInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ShopPageScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    description: 'description',
    status: 'status',
    vendorId: 'vendorId',
    htmlKey: 'htmlKey',
    builder: 'builder',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShopPageScalarFieldEnum = (typeof ShopPageScalarFieldEnum)[keyof typeof ShopPageScalarFieldEnum]


  export const ShopPageProductScalarFieldEnum: {
    id: 'id',
    shopPageId: 'shopPageId',
    productId: 'productId',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt'
  };

  export type ShopPageProductScalarFieldEnum = (typeof ShopPageProductScalarFieldEnum)[keyof typeof ShopPageProductScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'PageStatus'
   */
  export type EnumPageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PageStatus'>
    


  /**
   * Reference to a field of type 'PageStatus[]'
   */
  export type ListEnumPageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PageStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ShopPageWhereInput = {
    AND?: ShopPageWhereInput | ShopPageWhereInput[]
    OR?: ShopPageWhereInput[]
    NOT?: ShopPageWhereInput | ShopPageWhereInput[]
    id?: StringFilter<"ShopPage"> | string
    title?: StringFilter<"ShopPage"> | string
    slug?: StringFilter<"ShopPage"> | string
    description?: StringNullableFilter<"ShopPage"> | string | null
    status?: EnumPageStatusFilter<"ShopPage"> | $Enums.PageStatus
    vendorId?: StringFilter<"ShopPage"> | string
    htmlKey?: StringNullableFilter<"ShopPage"> | string | null
    builder?: JsonNullableFilter<"ShopPage">
    publishedAt?: DateTimeNullableFilter<"ShopPage"> | Date | string | null
    createdAt?: DateTimeFilter<"ShopPage"> | Date | string
    updatedAt?: DateTimeFilter<"ShopPage"> | Date | string
    products?: ShopPageProductListRelationFilter
  }

  export type ShopPageOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    vendorId?: SortOrder
    htmlKey?: SortOrderInput | SortOrder
    builder?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    products?: ShopPageProductOrderByRelationAggregateInput
  }

  export type ShopPageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ShopPageWhereInput | ShopPageWhereInput[]
    OR?: ShopPageWhereInput[]
    NOT?: ShopPageWhereInput | ShopPageWhereInput[]
    title?: StringFilter<"ShopPage"> | string
    description?: StringNullableFilter<"ShopPage"> | string | null
    status?: EnumPageStatusFilter<"ShopPage"> | $Enums.PageStatus
    vendorId?: StringFilter<"ShopPage"> | string
    htmlKey?: StringNullableFilter<"ShopPage"> | string | null
    builder?: JsonNullableFilter<"ShopPage">
    publishedAt?: DateTimeNullableFilter<"ShopPage"> | Date | string | null
    createdAt?: DateTimeFilter<"ShopPage"> | Date | string
    updatedAt?: DateTimeFilter<"ShopPage"> | Date | string
    products?: ShopPageProductListRelationFilter
  }, "id" | "slug">

  export type ShopPageOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    vendorId?: SortOrder
    htmlKey?: SortOrderInput | SortOrder
    builder?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShopPageCountOrderByAggregateInput
    _max?: ShopPageMaxOrderByAggregateInput
    _min?: ShopPageMinOrderByAggregateInput
  }

  export type ShopPageScalarWhereWithAggregatesInput = {
    AND?: ShopPageScalarWhereWithAggregatesInput | ShopPageScalarWhereWithAggregatesInput[]
    OR?: ShopPageScalarWhereWithAggregatesInput[]
    NOT?: ShopPageScalarWhereWithAggregatesInput | ShopPageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ShopPage"> | string
    title?: StringWithAggregatesFilter<"ShopPage"> | string
    slug?: StringWithAggregatesFilter<"ShopPage"> | string
    description?: StringNullableWithAggregatesFilter<"ShopPage"> | string | null
    status?: EnumPageStatusWithAggregatesFilter<"ShopPage"> | $Enums.PageStatus
    vendorId?: StringWithAggregatesFilter<"ShopPage"> | string
    htmlKey?: StringNullableWithAggregatesFilter<"ShopPage"> | string | null
    builder?: JsonNullableWithAggregatesFilter<"ShopPage">
    publishedAt?: DateTimeNullableWithAggregatesFilter<"ShopPage"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ShopPage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ShopPage"> | Date | string
  }

  export type ShopPageProductWhereInput = {
    AND?: ShopPageProductWhereInput | ShopPageProductWhereInput[]
    OR?: ShopPageProductWhereInput[]
    NOT?: ShopPageProductWhereInput | ShopPageProductWhereInput[]
    id?: StringFilter<"ShopPageProduct"> | string
    shopPageId?: StringFilter<"ShopPageProduct"> | string
    productId?: StringFilter<"ShopPageProduct"> | string
    sortOrder?: IntFilter<"ShopPageProduct"> | number
    createdAt?: DateTimeFilter<"ShopPageProduct"> | Date | string
    shopPage?: XOR<ShopPageRelationFilter, ShopPageWhereInput>
  }

  export type ShopPageProductOrderByWithRelationInput = {
    id?: SortOrder
    shopPageId?: SortOrder
    productId?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    shopPage?: ShopPageOrderByWithRelationInput
  }

  export type ShopPageProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shopPageId_productId?: ShopPageProductShopPageIdProductIdCompoundUniqueInput
    AND?: ShopPageProductWhereInput | ShopPageProductWhereInput[]
    OR?: ShopPageProductWhereInput[]
    NOT?: ShopPageProductWhereInput | ShopPageProductWhereInput[]
    shopPageId?: StringFilter<"ShopPageProduct"> | string
    productId?: StringFilter<"ShopPageProduct"> | string
    sortOrder?: IntFilter<"ShopPageProduct"> | number
    createdAt?: DateTimeFilter<"ShopPageProduct"> | Date | string
    shopPage?: XOR<ShopPageRelationFilter, ShopPageWhereInput>
  }, "id" | "shopPageId_productId">

  export type ShopPageProductOrderByWithAggregationInput = {
    id?: SortOrder
    shopPageId?: SortOrder
    productId?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    _count?: ShopPageProductCountOrderByAggregateInput
    _avg?: ShopPageProductAvgOrderByAggregateInput
    _max?: ShopPageProductMaxOrderByAggregateInput
    _min?: ShopPageProductMinOrderByAggregateInput
    _sum?: ShopPageProductSumOrderByAggregateInput
  }

  export type ShopPageProductScalarWhereWithAggregatesInput = {
    AND?: ShopPageProductScalarWhereWithAggregatesInput | ShopPageProductScalarWhereWithAggregatesInput[]
    OR?: ShopPageProductScalarWhereWithAggregatesInput[]
    NOT?: ShopPageProductScalarWhereWithAggregatesInput | ShopPageProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ShopPageProduct"> | string
    shopPageId?: StringWithAggregatesFilter<"ShopPageProduct"> | string
    productId?: StringWithAggregatesFilter<"ShopPageProduct"> | string
    sortOrder?: IntWithAggregatesFilter<"ShopPageProduct"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ShopPageProduct"> | Date | string
  }

  export type ShopPageCreateInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    status?: $Enums.PageStatus
    vendorId: string
    htmlKey?: string | null
    builder?: NullableJsonNullValueInput | InputJsonValue
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ShopPageProductCreateNestedManyWithoutShopPageInput
  }

  export type ShopPageUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    status?: $Enums.PageStatus
    vendorId: string
    htmlKey?: string | null
    builder?: NullableJsonNullValueInput | InputJsonValue
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ShopPageProductUncheckedCreateNestedManyWithoutShopPageInput
  }

  export type ShopPageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPageStatusFieldUpdateOperationsInput | $Enums.PageStatus
    vendorId?: StringFieldUpdateOperationsInput | string
    htmlKey?: NullableStringFieldUpdateOperationsInput | string | null
    builder?: NullableJsonNullValueInput | InputJsonValue
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ShopPageProductUpdateManyWithoutShopPageNestedInput
  }

  export type ShopPageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPageStatusFieldUpdateOperationsInput | $Enums.PageStatus
    vendorId?: StringFieldUpdateOperationsInput | string
    htmlKey?: NullableStringFieldUpdateOperationsInput | string | null
    builder?: NullableJsonNullValueInput | InputJsonValue
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ShopPageProductUncheckedUpdateManyWithoutShopPageNestedInput
  }

  export type ShopPageCreateManyInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    status?: $Enums.PageStatus
    vendorId: string
    htmlKey?: string | null
    builder?: NullableJsonNullValueInput | InputJsonValue
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopPageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPageStatusFieldUpdateOperationsInput | $Enums.PageStatus
    vendorId?: StringFieldUpdateOperationsInput | string
    htmlKey?: NullableStringFieldUpdateOperationsInput | string | null
    builder?: NullableJsonNullValueInput | InputJsonValue
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopPageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPageStatusFieldUpdateOperationsInput | $Enums.PageStatus
    vendorId?: StringFieldUpdateOperationsInput | string
    htmlKey?: NullableStringFieldUpdateOperationsInput | string | null
    builder?: NullableJsonNullValueInput | InputJsonValue
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopPageProductCreateInput = {
    id?: string
    productId: string
    sortOrder?: number
    createdAt?: Date | string
    shopPage: ShopPageCreateNestedOneWithoutProductsInput
  }

  export type ShopPageProductUncheckedCreateInput = {
    id?: string
    shopPageId: string
    productId: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type ShopPageProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shopPage?: ShopPageUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ShopPageProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopPageId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopPageProductCreateManyInput = {
    id?: string
    shopPageId: string
    productId: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type ShopPageProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopPageProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shopPageId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumPageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PageStatus | EnumPageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PageStatus[] | ListEnumPageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PageStatus[] | ListEnumPageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPageStatusFilter<$PrismaModel> | $Enums.PageStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ShopPageProductListRelationFilter = {
    every?: ShopPageProductWhereInput
    some?: ShopPageProductWhereInput
    none?: ShopPageProductWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ShopPageProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShopPageCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    status?: SortOrder
    vendorId?: SortOrder
    htmlKey?: SortOrder
    builder?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopPageMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    status?: SortOrder
    vendorId?: SortOrder
    htmlKey?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShopPageMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    status?: SortOrder
    vendorId?: SortOrder
    htmlKey?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumPageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PageStatus | EnumPageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PageStatus[] | ListEnumPageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PageStatus[] | ListEnumPageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPageStatusWithAggregatesFilter<$PrismaModel> | $Enums.PageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPageStatusFilter<$PrismaModel>
    _max?: NestedEnumPageStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ShopPageRelationFilter = {
    is?: ShopPageWhereInput
    isNot?: ShopPageWhereInput
  }

  export type ShopPageProductShopPageIdProductIdCompoundUniqueInput = {
    shopPageId: string
    productId: string
  }

  export type ShopPageProductCountOrderByAggregateInput = {
    id?: SortOrder
    shopPageId?: SortOrder
    productId?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ShopPageProductAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type ShopPageProductMaxOrderByAggregateInput = {
    id?: SortOrder
    shopPageId?: SortOrder
    productId?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ShopPageProductMinOrderByAggregateInput = {
    id?: SortOrder
    shopPageId?: SortOrder
    productId?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ShopPageProductSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ShopPageProductCreateNestedManyWithoutShopPageInput = {
    create?: XOR<ShopPageProductCreateWithoutShopPageInput, ShopPageProductUncheckedCreateWithoutShopPageInput> | ShopPageProductCreateWithoutShopPageInput[] | ShopPageProductUncheckedCreateWithoutShopPageInput[]
    connectOrCreate?: ShopPageProductCreateOrConnectWithoutShopPageInput | ShopPageProductCreateOrConnectWithoutShopPageInput[]
    createMany?: ShopPageProductCreateManyShopPageInputEnvelope
    connect?: ShopPageProductWhereUniqueInput | ShopPageProductWhereUniqueInput[]
  }

  export type ShopPageProductUncheckedCreateNestedManyWithoutShopPageInput = {
    create?: XOR<ShopPageProductCreateWithoutShopPageInput, ShopPageProductUncheckedCreateWithoutShopPageInput> | ShopPageProductCreateWithoutShopPageInput[] | ShopPageProductUncheckedCreateWithoutShopPageInput[]
    connectOrCreate?: ShopPageProductCreateOrConnectWithoutShopPageInput | ShopPageProductCreateOrConnectWithoutShopPageInput[]
    createMany?: ShopPageProductCreateManyShopPageInputEnvelope
    connect?: ShopPageProductWhereUniqueInput | ShopPageProductWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumPageStatusFieldUpdateOperationsInput = {
    set?: $Enums.PageStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ShopPageProductUpdateManyWithoutShopPageNestedInput = {
    create?: XOR<ShopPageProductCreateWithoutShopPageInput, ShopPageProductUncheckedCreateWithoutShopPageInput> | ShopPageProductCreateWithoutShopPageInput[] | ShopPageProductUncheckedCreateWithoutShopPageInput[]
    connectOrCreate?: ShopPageProductCreateOrConnectWithoutShopPageInput | ShopPageProductCreateOrConnectWithoutShopPageInput[]
    upsert?: ShopPageProductUpsertWithWhereUniqueWithoutShopPageInput | ShopPageProductUpsertWithWhereUniqueWithoutShopPageInput[]
    createMany?: ShopPageProductCreateManyShopPageInputEnvelope
    set?: ShopPageProductWhereUniqueInput | ShopPageProductWhereUniqueInput[]
    disconnect?: ShopPageProductWhereUniqueInput | ShopPageProductWhereUniqueInput[]
    delete?: ShopPageProductWhereUniqueInput | ShopPageProductWhereUniqueInput[]
    connect?: ShopPageProductWhereUniqueInput | ShopPageProductWhereUniqueInput[]
    update?: ShopPageProductUpdateWithWhereUniqueWithoutShopPageInput | ShopPageProductUpdateWithWhereUniqueWithoutShopPageInput[]
    updateMany?: ShopPageProductUpdateManyWithWhereWithoutShopPageInput | ShopPageProductUpdateManyWithWhereWithoutShopPageInput[]
    deleteMany?: ShopPageProductScalarWhereInput | ShopPageProductScalarWhereInput[]
  }

  export type ShopPageProductUncheckedUpdateManyWithoutShopPageNestedInput = {
    create?: XOR<ShopPageProductCreateWithoutShopPageInput, ShopPageProductUncheckedCreateWithoutShopPageInput> | ShopPageProductCreateWithoutShopPageInput[] | ShopPageProductUncheckedCreateWithoutShopPageInput[]
    connectOrCreate?: ShopPageProductCreateOrConnectWithoutShopPageInput | ShopPageProductCreateOrConnectWithoutShopPageInput[]
    upsert?: ShopPageProductUpsertWithWhereUniqueWithoutShopPageInput | ShopPageProductUpsertWithWhereUniqueWithoutShopPageInput[]
    createMany?: ShopPageProductCreateManyShopPageInputEnvelope
    set?: ShopPageProductWhereUniqueInput | ShopPageProductWhereUniqueInput[]
    disconnect?: ShopPageProductWhereUniqueInput | ShopPageProductWhereUniqueInput[]
    delete?: ShopPageProductWhereUniqueInput | ShopPageProductWhereUniqueInput[]
    connect?: ShopPageProductWhereUniqueInput | ShopPageProductWhereUniqueInput[]
    update?: ShopPageProductUpdateWithWhereUniqueWithoutShopPageInput | ShopPageProductUpdateWithWhereUniqueWithoutShopPageInput[]
    updateMany?: ShopPageProductUpdateManyWithWhereWithoutShopPageInput | ShopPageProductUpdateManyWithWhereWithoutShopPageInput[]
    deleteMany?: ShopPageProductScalarWhereInput | ShopPageProductScalarWhereInput[]
  }

  export type ShopPageCreateNestedOneWithoutProductsInput = {
    create?: XOR<ShopPageCreateWithoutProductsInput, ShopPageUncheckedCreateWithoutProductsInput>
    connectOrCreate?: ShopPageCreateOrConnectWithoutProductsInput
    connect?: ShopPageWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ShopPageUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<ShopPageCreateWithoutProductsInput, ShopPageUncheckedCreateWithoutProductsInput>
    connectOrCreate?: ShopPageCreateOrConnectWithoutProductsInput
    upsert?: ShopPageUpsertWithoutProductsInput
    connect?: ShopPageWhereUniqueInput
    update?: XOR<XOR<ShopPageUpdateToOneWithWhereWithoutProductsInput, ShopPageUpdateWithoutProductsInput>, ShopPageUncheckedUpdateWithoutProductsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumPageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PageStatus | EnumPageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PageStatus[] | ListEnumPageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PageStatus[] | ListEnumPageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPageStatusFilter<$PrismaModel> | $Enums.PageStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PageStatus | EnumPageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PageStatus[] | ListEnumPageStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PageStatus[] | ListEnumPageStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPageStatusWithAggregatesFilter<$PrismaModel> | $Enums.PageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPageStatusFilter<$PrismaModel>
    _max?: NestedEnumPageStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ShopPageProductCreateWithoutShopPageInput = {
    id?: string
    productId: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type ShopPageProductUncheckedCreateWithoutShopPageInput = {
    id?: string
    productId: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type ShopPageProductCreateOrConnectWithoutShopPageInput = {
    where: ShopPageProductWhereUniqueInput
    create: XOR<ShopPageProductCreateWithoutShopPageInput, ShopPageProductUncheckedCreateWithoutShopPageInput>
  }

  export type ShopPageProductCreateManyShopPageInputEnvelope = {
    data: ShopPageProductCreateManyShopPageInput | ShopPageProductCreateManyShopPageInput[]
    skipDuplicates?: boolean
  }

  export type ShopPageProductUpsertWithWhereUniqueWithoutShopPageInput = {
    where: ShopPageProductWhereUniqueInput
    update: XOR<ShopPageProductUpdateWithoutShopPageInput, ShopPageProductUncheckedUpdateWithoutShopPageInput>
    create: XOR<ShopPageProductCreateWithoutShopPageInput, ShopPageProductUncheckedCreateWithoutShopPageInput>
  }

  export type ShopPageProductUpdateWithWhereUniqueWithoutShopPageInput = {
    where: ShopPageProductWhereUniqueInput
    data: XOR<ShopPageProductUpdateWithoutShopPageInput, ShopPageProductUncheckedUpdateWithoutShopPageInput>
  }

  export type ShopPageProductUpdateManyWithWhereWithoutShopPageInput = {
    where: ShopPageProductScalarWhereInput
    data: XOR<ShopPageProductUpdateManyMutationInput, ShopPageProductUncheckedUpdateManyWithoutShopPageInput>
  }

  export type ShopPageProductScalarWhereInput = {
    AND?: ShopPageProductScalarWhereInput | ShopPageProductScalarWhereInput[]
    OR?: ShopPageProductScalarWhereInput[]
    NOT?: ShopPageProductScalarWhereInput | ShopPageProductScalarWhereInput[]
    id?: StringFilter<"ShopPageProduct"> | string
    shopPageId?: StringFilter<"ShopPageProduct"> | string
    productId?: StringFilter<"ShopPageProduct"> | string
    sortOrder?: IntFilter<"ShopPageProduct"> | number
    createdAt?: DateTimeFilter<"ShopPageProduct"> | Date | string
  }

  export type ShopPageCreateWithoutProductsInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    status?: $Enums.PageStatus
    vendorId: string
    htmlKey?: string | null
    builder?: NullableJsonNullValueInput | InputJsonValue
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopPageUncheckedCreateWithoutProductsInput = {
    id?: string
    title: string
    slug: string
    description?: string | null
    status?: $Enums.PageStatus
    vendorId: string
    htmlKey?: string | null
    builder?: NullableJsonNullValueInput | InputJsonValue
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShopPageCreateOrConnectWithoutProductsInput = {
    where: ShopPageWhereUniqueInput
    create: XOR<ShopPageCreateWithoutProductsInput, ShopPageUncheckedCreateWithoutProductsInput>
  }

  export type ShopPageUpsertWithoutProductsInput = {
    update: XOR<ShopPageUpdateWithoutProductsInput, ShopPageUncheckedUpdateWithoutProductsInput>
    create: XOR<ShopPageCreateWithoutProductsInput, ShopPageUncheckedCreateWithoutProductsInput>
    where?: ShopPageWhereInput
  }

  export type ShopPageUpdateToOneWithWhereWithoutProductsInput = {
    where?: ShopPageWhereInput
    data: XOR<ShopPageUpdateWithoutProductsInput, ShopPageUncheckedUpdateWithoutProductsInput>
  }

  export type ShopPageUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPageStatusFieldUpdateOperationsInput | $Enums.PageStatus
    vendorId?: StringFieldUpdateOperationsInput | string
    htmlKey?: NullableStringFieldUpdateOperationsInput | string | null
    builder?: NullableJsonNullValueInput | InputJsonValue
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopPageUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPageStatusFieldUpdateOperationsInput | $Enums.PageStatus
    vendorId?: StringFieldUpdateOperationsInput | string
    htmlKey?: NullableStringFieldUpdateOperationsInput | string | null
    builder?: NullableJsonNullValueInput | InputJsonValue
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopPageProductCreateManyShopPageInput = {
    id?: string
    productId: string
    sortOrder?: number
    createdAt?: Date | string
  }

  export type ShopPageProductUpdateWithoutShopPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopPageProductUncheckedUpdateWithoutShopPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopPageProductUncheckedUpdateManyWithoutShopPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ShopPageCountOutputTypeDefaultArgs instead
     */
    export type ShopPageCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ShopPageCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ShopPageDefaultArgs instead
     */
    export type ShopPageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ShopPageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ShopPageProductDefaultArgs instead
     */
    export type ShopPageProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ShopPageProductDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}