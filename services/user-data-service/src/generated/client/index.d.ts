
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
 * Model VendorProfile
 * 
 */
export type VendorProfile = $Result.DefaultSelection<Prisma.$VendorProfilePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProfileStatusLocal: {
  PENDING: 'PENDING',
  COMPLETE: 'COMPLETE'
};

export type ProfileStatusLocal = (typeof ProfileStatusLocal)[keyof typeof ProfileStatusLocal]


export const IdentityStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  VERIFIED: 'VERIFIED',
  FAILED: 'FAILED'
};

export type IdentityStatus = (typeof IdentityStatus)[keyof typeof IdentityStatus]

}

export type ProfileStatusLocal = $Enums.ProfileStatusLocal

export const ProfileStatusLocal: typeof $Enums.ProfileStatusLocal

export type IdentityStatus = $Enums.IdentityStatus

export const IdentityStatus: typeof $Enums.IdentityStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more VendorProfiles
 * const vendorProfiles = await prisma.vendorProfile.findMany()
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
   * // Fetch zero or more VendorProfiles
   * const vendorProfiles = await prisma.vendorProfile.findMany()
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
   * `prisma.vendorProfile`: Exposes CRUD operations for the **VendorProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VendorProfiles
    * const vendorProfiles = await prisma.vendorProfile.findMany()
    * ```
    */
  get vendorProfile(): Prisma.VendorProfileDelegate<ExtArgs>;
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
    VendorProfile: 'VendorProfile'
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
      modelProps: "vendorProfile"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      VendorProfile: {
        payload: Prisma.$VendorProfilePayload<ExtArgs>
        fields: Prisma.VendorProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendorProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendorProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>
          }
          findFirst: {
            args: Prisma.VendorProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendorProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>
          }
          findMany: {
            args: Prisma.VendorProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>[]
          }
          create: {
            args: Prisma.VendorProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>
          }
          createMany: {
            args: Prisma.VendorProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendorProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>[]
          }
          delete: {
            args: Prisma.VendorProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>
          }
          update: {
            args: Prisma.VendorProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>
          }
          deleteMany: {
            args: Prisma.VendorProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendorProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VendorProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorProfilePayload>
          }
          aggregate: {
            args: Prisma.VendorProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendorProfile>
          }
          groupBy: {
            args: Prisma.VendorProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendorProfileCountArgs<ExtArgs>
            result: $Utils.Optional<VendorProfileCountAggregateOutputType> | number
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
   * Models
   */

  /**
   * Model VendorProfile
   */

  export type AggregateVendorProfile = {
    _count: VendorProfileCountAggregateOutputType | null
    _min: VendorProfileMinAggregateOutputType | null
    _max: VendorProfileMaxAggregateOutputType | null
  }

  export type VendorProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    status: $Enums.ProfileStatusLocal | null
    firstName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    gender: string | null
    fiscalCode: string | null
    businessName: string | null
    vatNumber: string | null
    contactEmail: string | null
    phoneNumber: string | null
    identityStatus: $Enums.IdentityStatus | null
    stripeVerificationSessionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VendorProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    status: $Enums.ProfileStatusLocal | null
    firstName: string | null
    lastName: string | null
    dateOfBirth: Date | null
    gender: string | null
    fiscalCode: string | null
    businessName: string | null
    vatNumber: string | null
    contactEmail: string | null
    phoneNumber: string | null
    identityStatus: $Enums.IdentityStatus | null
    stripeVerificationSessionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VendorProfileCountAggregateOutputType = {
    id: number
    userId: number
    status: number
    firstName: number
    lastName: number
    dateOfBirth: number
    gender: number
    fiscalCode: number
    businessName: number
    vatNumber: number
    contactEmail: number
    phoneNumber: number
    address: number
    identityStatus: number
    stripeVerificationSessionId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VendorProfileMinAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    firstName?: true
    lastName?: true
    dateOfBirth?: true
    gender?: true
    fiscalCode?: true
    businessName?: true
    vatNumber?: true
    contactEmail?: true
    phoneNumber?: true
    identityStatus?: true
    stripeVerificationSessionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VendorProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    firstName?: true
    lastName?: true
    dateOfBirth?: true
    gender?: true
    fiscalCode?: true
    businessName?: true
    vatNumber?: true
    contactEmail?: true
    phoneNumber?: true
    identityStatus?: true
    stripeVerificationSessionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VendorProfileCountAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    firstName?: true
    lastName?: true
    dateOfBirth?: true
    gender?: true
    fiscalCode?: true
    businessName?: true
    vatNumber?: true
    contactEmail?: true
    phoneNumber?: true
    address?: true
    identityStatus?: true
    stripeVerificationSessionId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VendorProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendorProfile to aggregate.
     */
    where?: VendorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorProfiles to fetch.
     */
    orderBy?: VendorProfileOrderByWithRelationInput | VendorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VendorProfiles
    **/
    _count?: true | VendorProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorProfileMaxAggregateInputType
  }

  export type GetVendorProfileAggregateType<T extends VendorProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateVendorProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendorProfile[P]>
      : GetScalarType<T[P], AggregateVendorProfile[P]>
  }




  export type VendorProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorProfileWhereInput
    orderBy?: VendorProfileOrderByWithAggregationInput | VendorProfileOrderByWithAggregationInput[]
    by: VendorProfileScalarFieldEnum[] | VendorProfileScalarFieldEnum
    having?: VendorProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorProfileCountAggregateInputType | true
    _min?: VendorProfileMinAggregateInputType
    _max?: VendorProfileMaxAggregateInputType
  }

  export type VendorProfileGroupByOutputType = {
    id: string
    userId: string
    status: $Enums.ProfileStatusLocal
    firstName: string
    lastName: string
    dateOfBirth: Date
    gender: string | null
    fiscalCode: string
    businessName: string
    vatNumber: string | null
    contactEmail: string
    phoneNumber: string
    address: JsonValue
    identityStatus: $Enums.IdentityStatus
    stripeVerificationSessionId: string | null
    createdAt: Date
    updatedAt: Date
    _count: VendorProfileCountAggregateOutputType | null
    _min: VendorProfileMinAggregateOutputType | null
    _max: VendorProfileMaxAggregateOutputType | null
  }

  type GetVendorProfileGroupByPayload<T extends VendorProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorProfileGroupByOutputType[P]>
            : GetScalarType<T[P], VendorProfileGroupByOutputType[P]>
        }
      >
    >


  export type VendorProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    firstName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    fiscalCode?: boolean
    businessName?: boolean
    vatNumber?: boolean
    contactEmail?: boolean
    phoneNumber?: boolean
    address?: boolean
    identityStatus?: boolean
    stripeVerificationSessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vendorProfile"]>

  export type VendorProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    firstName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    fiscalCode?: boolean
    businessName?: boolean
    vatNumber?: boolean
    contactEmail?: boolean
    phoneNumber?: boolean
    address?: boolean
    identityStatus?: boolean
    stripeVerificationSessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vendorProfile"]>

  export type VendorProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    status?: boolean
    firstName?: boolean
    lastName?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    fiscalCode?: boolean
    businessName?: boolean
    vatNumber?: boolean
    contactEmail?: boolean
    phoneNumber?: boolean
    address?: boolean
    identityStatus?: boolean
    stripeVerificationSessionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $VendorProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VendorProfile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      status: $Enums.ProfileStatusLocal
      firstName: string
      lastName: string
      dateOfBirth: Date
      gender: string | null
      fiscalCode: string
      businessName: string
      vatNumber: string | null
      contactEmail: string
      phoneNumber: string
      address: Prisma.JsonValue
      identityStatus: $Enums.IdentityStatus
      stripeVerificationSessionId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vendorProfile"]>
    composites: {}
  }

  type VendorProfileGetPayload<S extends boolean | null | undefined | VendorProfileDefaultArgs> = $Result.GetResult<Prisma.$VendorProfilePayload, S>

  type VendorProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VendorProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VendorProfileCountAggregateInputType | true
    }

  export interface VendorProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VendorProfile'], meta: { name: 'VendorProfile' } }
    /**
     * Find zero or one VendorProfile that matches the filter.
     * @param {VendorProfileFindUniqueArgs} args - Arguments to find a VendorProfile
     * @example
     * // Get one VendorProfile
     * const vendorProfile = await prisma.vendorProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorProfileFindUniqueArgs>(args: SelectSubset<T, VendorProfileFindUniqueArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VendorProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VendorProfileFindUniqueOrThrowArgs} args - Arguments to find a VendorProfile
     * @example
     * // Get one VendorProfile
     * const vendorProfile = await prisma.vendorProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, VendorProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VendorProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileFindFirstArgs} args - Arguments to find a VendorProfile
     * @example
     * // Get one VendorProfile
     * const vendorProfile = await prisma.vendorProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorProfileFindFirstArgs>(args?: SelectSubset<T, VendorProfileFindFirstArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VendorProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileFindFirstOrThrowArgs} args - Arguments to find a VendorProfile
     * @example
     * // Get one VendorProfile
     * const vendorProfile = await prisma.vendorProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, VendorProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VendorProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VendorProfiles
     * const vendorProfiles = await prisma.vendorProfile.findMany()
     * 
     * // Get first 10 VendorProfiles
     * const vendorProfiles = await prisma.vendorProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendorProfileWithIdOnly = await prisma.vendorProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendorProfileFindManyArgs>(args?: SelectSubset<T, VendorProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VendorProfile.
     * @param {VendorProfileCreateArgs} args - Arguments to create a VendorProfile.
     * @example
     * // Create one VendorProfile
     * const VendorProfile = await prisma.vendorProfile.create({
     *   data: {
     *     // ... data to create a VendorProfile
     *   }
     * })
     * 
     */
    create<T extends VendorProfileCreateArgs>(args: SelectSubset<T, VendorProfileCreateArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VendorProfiles.
     * @param {VendorProfileCreateManyArgs} args - Arguments to create many VendorProfiles.
     * @example
     * // Create many VendorProfiles
     * const vendorProfile = await prisma.vendorProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendorProfileCreateManyArgs>(args?: SelectSubset<T, VendorProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VendorProfiles and returns the data saved in the database.
     * @param {VendorProfileCreateManyAndReturnArgs} args - Arguments to create many VendorProfiles.
     * @example
     * // Create many VendorProfiles
     * const vendorProfile = await prisma.vendorProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VendorProfiles and only return the `id`
     * const vendorProfileWithIdOnly = await prisma.vendorProfile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendorProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, VendorProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VendorProfile.
     * @param {VendorProfileDeleteArgs} args - Arguments to delete one VendorProfile.
     * @example
     * // Delete one VendorProfile
     * const VendorProfile = await prisma.vendorProfile.delete({
     *   where: {
     *     // ... filter to delete one VendorProfile
     *   }
     * })
     * 
     */
    delete<T extends VendorProfileDeleteArgs>(args: SelectSubset<T, VendorProfileDeleteArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VendorProfile.
     * @param {VendorProfileUpdateArgs} args - Arguments to update one VendorProfile.
     * @example
     * // Update one VendorProfile
     * const vendorProfile = await prisma.vendorProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendorProfileUpdateArgs>(args: SelectSubset<T, VendorProfileUpdateArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VendorProfiles.
     * @param {VendorProfileDeleteManyArgs} args - Arguments to filter VendorProfiles to delete.
     * @example
     * // Delete a few VendorProfiles
     * const { count } = await prisma.vendorProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendorProfileDeleteManyArgs>(args?: SelectSubset<T, VendorProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VendorProfiles
     * const vendorProfile = await prisma.vendorProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendorProfileUpdateManyArgs>(args: SelectSubset<T, VendorProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VendorProfile.
     * @param {VendorProfileUpsertArgs} args - Arguments to update or create a VendorProfile.
     * @example
     * // Update or create a VendorProfile
     * const vendorProfile = await prisma.vendorProfile.upsert({
     *   create: {
     *     // ... data to create a VendorProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VendorProfile we want to update
     *   }
     * })
     */
    upsert<T extends VendorProfileUpsertArgs>(args: SelectSubset<T, VendorProfileUpsertArgs<ExtArgs>>): Prisma__VendorProfileClient<$Result.GetResult<Prisma.$VendorProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VendorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileCountArgs} args - Arguments to filter VendorProfiles to count.
     * @example
     * // Count the number of VendorProfiles
     * const count = await prisma.vendorProfile.count({
     *   where: {
     *     // ... the filter for the VendorProfiles we want to count
     *   }
     * })
    **/
    count<T extends VendorProfileCountArgs>(
      args?: Subset<T, VendorProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VendorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VendorProfileAggregateArgs>(args: Subset<T, VendorProfileAggregateArgs>): Prisma.PrismaPromise<GetVendorProfileAggregateType<T>>

    /**
     * Group by VendorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorProfileGroupByArgs} args - Group by arguments.
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
      T extends VendorProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendorProfileGroupByArgs['orderBy'] }
        : { orderBy?: VendorProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VendorProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VendorProfile model
   */
  readonly fields: VendorProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VendorProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendorProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the VendorProfile model
   */ 
  interface VendorProfileFieldRefs {
    readonly id: FieldRef<"VendorProfile", 'String'>
    readonly userId: FieldRef<"VendorProfile", 'String'>
    readonly status: FieldRef<"VendorProfile", 'ProfileStatusLocal'>
    readonly firstName: FieldRef<"VendorProfile", 'String'>
    readonly lastName: FieldRef<"VendorProfile", 'String'>
    readonly dateOfBirth: FieldRef<"VendorProfile", 'DateTime'>
    readonly gender: FieldRef<"VendorProfile", 'String'>
    readonly fiscalCode: FieldRef<"VendorProfile", 'String'>
    readonly businessName: FieldRef<"VendorProfile", 'String'>
    readonly vatNumber: FieldRef<"VendorProfile", 'String'>
    readonly contactEmail: FieldRef<"VendorProfile", 'String'>
    readonly phoneNumber: FieldRef<"VendorProfile", 'String'>
    readonly address: FieldRef<"VendorProfile", 'Json'>
    readonly identityStatus: FieldRef<"VendorProfile", 'IdentityStatus'>
    readonly stripeVerificationSessionId: FieldRef<"VendorProfile", 'String'>
    readonly createdAt: FieldRef<"VendorProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"VendorProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VendorProfile findUnique
   */
  export type VendorProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Filter, which VendorProfile to fetch.
     */
    where: VendorProfileWhereUniqueInput
  }

  /**
   * VendorProfile findUniqueOrThrow
   */
  export type VendorProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Filter, which VendorProfile to fetch.
     */
    where: VendorProfileWhereUniqueInput
  }

  /**
   * VendorProfile findFirst
   */
  export type VendorProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Filter, which VendorProfile to fetch.
     */
    where?: VendorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorProfiles to fetch.
     */
    orderBy?: VendorProfileOrderByWithRelationInput | VendorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendorProfiles.
     */
    cursor?: VendorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorProfiles.
     */
    distinct?: VendorProfileScalarFieldEnum | VendorProfileScalarFieldEnum[]
  }

  /**
   * VendorProfile findFirstOrThrow
   */
  export type VendorProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Filter, which VendorProfile to fetch.
     */
    where?: VendorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorProfiles to fetch.
     */
    orderBy?: VendorProfileOrderByWithRelationInput | VendorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendorProfiles.
     */
    cursor?: VendorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorProfiles.
     */
    distinct?: VendorProfileScalarFieldEnum | VendorProfileScalarFieldEnum[]
  }

  /**
   * VendorProfile findMany
   */
  export type VendorProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Filter, which VendorProfiles to fetch.
     */
    where?: VendorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorProfiles to fetch.
     */
    orderBy?: VendorProfileOrderByWithRelationInput | VendorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VendorProfiles.
     */
    cursor?: VendorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorProfiles.
     */
    skip?: number
    distinct?: VendorProfileScalarFieldEnum | VendorProfileScalarFieldEnum[]
  }

  /**
   * VendorProfile create
   */
  export type VendorProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * The data needed to create a VendorProfile.
     */
    data: XOR<VendorProfileCreateInput, VendorProfileUncheckedCreateInput>
  }

  /**
   * VendorProfile createMany
   */
  export type VendorProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VendorProfiles.
     */
    data: VendorProfileCreateManyInput | VendorProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VendorProfile createManyAndReturn
   */
  export type VendorProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VendorProfiles.
     */
    data: VendorProfileCreateManyInput | VendorProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VendorProfile update
   */
  export type VendorProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * The data needed to update a VendorProfile.
     */
    data: XOR<VendorProfileUpdateInput, VendorProfileUncheckedUpdateInput>
    /**
     * Choose, which VendorProfile to update.
     */
    where: VendorProfileWhereUniqueInput
  }

  /**
   * VendorProfile updateMany
   */
  export type VendorProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VendorProfiles.
     */
    data: XOR<VendorProfileUpdateManyMutationInput, VendorProfileUncheckedUpdateManyInput>
    /**
     * Filter which VendorProfiles to update
     */
    where?: VendorProfileWhereInput
  }

  /**
   * VendorProfile upsert
   */
  export type VendorProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * The filter to search for the VendorProfile to update in case it exists.
     */
    where: VendorProfileWhereUniqueInput
    /**
     * In case the VendorProfile found by the `where` argument doesn't exist, create a new VendorProfile with this data.
     */
    create: XOR<VendorProfileCreateInput, VendorProfileUncheckedCreateInput>
    /**
     * In case the VendorProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendorProfileUpdateInput, VendorProfileUncheckedUpdateInput>
  }

  /**
   * VendorProfile delete
   */
  export type VendorProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
    /**
     * Filter which VendorProfile to delete.
     */
    where: VendorProfileWhereUniqueInput
  }

  /**
   * VendorProfile deleteMany
   */
  export type VendorProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendorProfiles to delete
     */
    where?: VendorProfileWhereInput
  }

  /**
   * VendorProfile without action
   */
  export type VendorProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorProfile
     */
    select?: VendorProfileSelect<ExtArgs> | null
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


  export const VendorProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    status: 'status',
    firstName: 'firstName',
    lastName: 'lastName',
    dateOfBirth: 'dateOfBirth',
    gender: 'gender',
    fiscalCode: 'fiscalCode',
    businessName: 'businessName',
    vatNumber: 'vatNumber',
    contactEmail: 'contactEmail',
    phoneNumber: 'phoneNumber',
    address: 'address',
    identityStatus: 'identityStatus',
    stripeVerificationSessionId: 'stripeVerificationSessionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VendorProfileScalarFieldEnum = (typeof VendorProfileScalarFieldEnum)[keyof typeof VendorProfileScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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
   * Reference to a field of type 'ProfileStatusLocal'
   */
  export type EnumProfileStatusLocalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProfileStatusLocal'>
    


  /**
   * Reference to a field of type 'ProfileStatusLocal[]'
   */
  export type ListEnumProfileStatusLocalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProfileStatusLocal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'IdentityStatus'
   */
  export type EnumIdentityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IdentityStatus'>
    


  /**
   * Reference to a field of type 'IdentityStatus[]'
   */
  export type ListEnumIdentityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IdentityStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type VendorProfileWhereInput = {
    AND?: VendorProfileWhereInput | VendorProfileWhereInput[]
    OR?: VendorProfileWhereInput[]
    NOT?: VendorProfileWhereInput | VendorProfileWhereInput[]
    id?: StringFilter<"VendorProfile"> | string
    userId?: StringFilter<"VendorProfile"> | string
    status?: EnumProfileStatusLocalFilter<"VendorProfile"> | $Enums.ProfileStatusLocal
    firstName?: StringFilter<"VendorProfile"> | string
    lastName?: StringFilter<"VendorProfile"> | string
    dateOfBirth?: DateTimeFilter<"VendorProfile"> | Date | string
    gender?: StringNullableFilter<"VendorProfile"> | string | null
    fiscalCode?: StringFilter<"VendorProfile"> | string
    businessName?: StringFilter<"VendorProfile"> | string
    vatNumber?: StringNullableFilter<"VendorProfile"> | string | null
    contactEmail?: StringFilter<"VendorProfile"> | string
    phoneNumber?: StringFilter<"VendorProfile"> | string
    address?: JsonFilter<"VendorProfile">
    identityStatus?: EnumIdentityStatusFilter<"VendorProfile"> | $Enums.IdentityStatus
    stripeVerificationSessionId?: StringNullableFilter<"VendorProfile"> | string | null
    createdAt?: DateTimeFilter<"VendorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"VendorProfile"> | Date | string
  }

  export type VendorProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrderInput | SortOrder
    fiscalCode?: SortOrder
    businessName?: SortOrder
    vatNumber?: SortOrderInput | SortOrder
    contactEmail?: SortOrder
    phoneNumber?: SortOrder
    address?: SortOrder
    identityStatus?: SortOrder
    stripeVerificationSessionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VendorProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    fiscalCode?: string
    AND?: VendorProfileWhereInput | VendorProfileWhereInput[]
    OR?: VendorProfileWhereInput[]
    NOT?: VendorProfileWhereInput | VendorProfileWhereInput[]
    status?: EnumProfileStatusLocalFilter<"VendorProfile"> | $Enums.ProfileStatusLocal
    firstName?: StringFilter<"VendorProfile"> | string
    lastName?: StringFilter<"VendorProfile"> | string
    dateOfBirth?: DateTimeFilter<"VendorProfile"> | Date | string
    gender?: StringNullableFilter<"VendorProfile"> | string | null
    businessName?: StringFilter<"VendorProfile"> | string
    vatNumber?: StringNullableFilter<"VendorProfile"> | string | null
    contactEmail?: StringFilter<"VendorProfile"> | string
    phoneNumber?: StringFilter<"VendorProfile"> | string
    address?: JsonFilter<"VendorProfile">
    identityStatus?: EnumIdentityStatusFilter<"VendorProfile"> | $Enums.IdentityStatus
    stripeVerificationSessionId?: StringNullableFilter<"VendorProfile"> | string | null
    createdAt?: DateTimeFilter<"VendorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"VendorProfile"> | Date | string
  }, "id" | "userId" | "fiscalCode">

  export type VendorProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrderInput | SortOrder
    fiscalCode?: SortOrder
    businessName?: SortOrder
    vatNumber?: SortOrderInput | SortOrder
    contactEmail?: SortOrder
    phoneNumber?: SortOrder
    address?: SortOrder
    identityStatus?: SortOrder
    stripeVerificationSessionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VendorProfileCountOrderByAggregateInput
    _max?: VendorProfileMaxOrderByAggregateInput
    _min?: VendorProfileMinOrderByAggregateInput
  }

  export type VendorProfileScalarWhereWithAggregatesInput = {
    AND?: VendorProfileScalarWhereWithAggregatesInput | VendorProfileScalarWhereWithAggregatesInput[]
    OR?: VendorProfileScalarWhereWithAggregatesInput[]
    NOT?: VendorProfileScalarWhereWithAggregatesInput | VendorProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VendorProfile"> | string
    userId?: StringWithAggregatesFilter<"VendorProfile"> | string
    status?: EnumProfileStatusLocalWithAggregatesFilter<"VendorProfile"> | $Enums.ProfileStatusLocal
    firstName?: StringWithAggregatesFilter<"VendorProfile"> | string
    lastName?: StringWithAggregatesFilter<"VendorProfile"> | string
    dateOfBirth?: DateTimeWithAggregatesFilter<"VendorProfile"> | Date | string
    gender?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    fiscalCode?: StringWithAggregatesFilter<"VendorProfile"> | string
    businessName?: StringWithAggregatesFilter<"VendorProfile"> | string
    vatNumber?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    contactEmail?: StringWithAggregatesFilter<"VendorProfile"> | string
    phoneNumber?: StringWithAggregatesFilter<"VendorProfile"> | string
    address?: JsonWithAggregatesFilter<"VendorProfile">
    identityStatus?: EnumIdentityStatusWithAggregatesFilter<"VendorProfile"> | $Enums.IdentityStatus
    stripeVerificationSessionId?: StringNullableWithAggregatesFilter<"VendorProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"VendorProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VendorProfile"> | Date | string
  }

  export type VendorProfileCreateInput = {
    id?: string
    userId: string
    status?: $Enums.ProfileStatusLocal
    firstName: string
    lastName: string
    dateOfBirth: Date | string
    gender?: string | null
    fiscalCode: string
    businessName: string
    vatNumber?: string | null
    contactEmail: string
    phoneNumber: string
    address: JsonNullValueInput | InputJsonValue
    identityStatus?: $Enums.IdentityStatus
    stripeVerificationSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VendorProfileUncheckedCreateInput = {
    id?: string
    userId: string
    status?: $Enums.ProfileStatusLocal
    firstName: string
    lastName: string
    dateOfBirth: Date | string
    gender?: string | null
    fiscalCode: string
    businessName: string
    vatNumber?: string | null
    contactEmail: string
    phoneNumber: string
    address: JsonNullValueInput | InputJsonValue
    identityStatus?: $Enums.IdentityStatus
    stripeVerificationSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VendorProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumProfileStatusLocalFieldUpdateOperationsInput | $Enums.ProfileStatusLocal
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    fiscalCode?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    address?: JsonNullValueInput | InputJsonValue
    identityStatus?: EnumIdentityStatusFieldUpdateOperationsInput | $Enums.IdentityStatus
    stripeVerificationSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumProfileStatusLocalFieldUpdateOperationsInput | $Enums.ProfileStatusLocal
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    fiscalCode?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    address?: JsonNullValueInput | InputJsonValue
    identityStatus?: EnumIdentityStatusFieldUpdateOperationsInput | $Enums.IdentityStatus
    stripeVerificationSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorProfileCreateManyInput = {
    id?: string
    userId: string
    status?: $Enums.ProfileStatusLocal
    firstName: string
    lastName: string
    dateOfBirth: Date | string
    gender?: string | null
    fiscalCode: string
    businessName: string
    vatNumber?: string | null
    contactEmail: string
    phoneNumber: string
    address: JsonNullValueInput | InputJsonValue
    identityStatus?: $Enums.IdentityStatus
    stripeVerificationSessionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VendorProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumProfileStatusLocalFieldUpdateOperationsInput | $Enums.ProfileStatusLocal
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    fiscalCode?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    address?: JsonNullValueInput | InputJsonValue
    identityStatus?: EnumIdentityStatusFieldUpdateOperationsInput | $Enums.IdentityStatus
    stripeVerificationSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumProfileStatusLocalFieldUpdateOperationsInput | $Enums.ProfileStatusLocal
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    fiscalCode?: StringFieldUpdateOperationsInput | string
    businessName?: StringFieldUpdateOperationsInput | string
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    address?: JsonNullValueInput | InputJsonValue
    identityStatus?: EnumIdentityStatusFieldUpdateOperationsInput | $Enums.IdentityStatus
    stripeVerificationSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumProfileStatusLocalFilter<$PrismaModel = never> = {
    equals?: $Enums.ProfileStatusLocal | EnumProfileStatusLocalFieldRefInput<$PrismaModel>
    in?: $Enums.ProfileStatusLocal[] | ListEnumProfileStatusLocalFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProfileStatusLocal[] | ListEnumProfileStatusLocalFieldRefInput<$PrismaModel>
    not?: NestedEnumProfileStatusLocalFilter<$PrismaModel> | $Enums.ProfileStatusLocal
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
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
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

  export type EnumIdentityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.IdentityStatus | EnumIdentityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.IdentityStatus[] | ListEnumIdentityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.IdentityStatus[] | ListEnumIdentityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumIdentityStatusFilter<$PrismaModel> | $Enums.IdentityStatus
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VendorProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    fiscalCode?: SortOrder
    businessName?: SortOrder
    vatNumber?: SortOrder
    contactEmail?: SortOrder
    phoneNumber?: SortOrder
    address?: SortOrder
    identityStatus?: SortOrder
    stripeVerificationSessionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VendorProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    fiscalCode?: SortOrder
    businessName?: SortOrder
    vatNumber?: SortOrder
    contactEmail?: SortOrder
    phoneNumber?: SortOrder
    identityStatus?: SortOrder
    stripeVerificationSessionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VendorProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    fiscalCode?: SortOrder
    businessName?: SortOrder
    vatNumber?: SortOrder
    contactEmail?: SortOrder
    phoneNumber?: SortOrder
    identityStatus?: SortOrder
    stripeVerificationSessionId?: SortOrder
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

  export type EnumProfileStatusLocalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProfileStatusLocal | EnumProfileStatusLocalFieldRefInput<$PrismaModel>
    in?: $Enums.ProfileStatusLocal[] | ListEnumProfileStatusLocalFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProfileStatusLocal[] | ListEnumProfileStatusLocalFieldRefInput<$PrismaModel>
    not?: NestedEnumProfileStatusLocalWithAggregatesFilter<$PrismaModel> | $Enums.ProfileStatusLocal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProfileStatusLocalFilter<$PrismaModel>
    _max?: NestedEnumProfileStatusLocalFilter<$PrismaModel>
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
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumIdentityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IdentityStatus | EnumIdentityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.IdentityStatus[] | ListEnumIdentityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.IdentityStatus[] | ListEnumIdentityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumIdentityStatusWithAggregatesFilter<$PrismaModel> | $Enums.IdentityStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIdentityStatusFilter<$PrismaModel>
    _max?: NestedEnumIdentityStatusFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumProfileStatusLocalFieldUpdateOperationsInput = {
    set?: $Enums.ProfileStatusLocal
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumIdentityStatusFieldUpdateOperationsInput = {
    set?: $Enums.IdentityStatus
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

  export type NestedEnumProfileStatusLocalFilter<$PrismaModel = never> = {
    equals?: $Enums.ProfileStatusLocal | EnumProfileStatusLocalFieldRefInput<$PrismaModel>
    in?: $Enums.ProfileStatusLocal[] | ListEnumProfileStatusLocalFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProfileStatusLocal[] | ListEnumProfileStatusLocalFieldRefInput<$PrismaModel>
    not?: NestedEnumProfileStatusLocalFilter<$PrismaModel> | $Enums.ProfileStatusLocal
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

  export type NestedEnumIdentityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.IdentityStatus | EnumIdentityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.IdentityStatus[] | ListEnumIdentityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.IdentityStatus[] | ListEnumIdentityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumIdentityStatusFilter<$PrismaModel> | $Enums.IdentityStatus
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

  export type NestedEnumProfileStatusLocalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProfileStatusLocal | EnumProfileStatusLocalFieldRefInput<$PrismaModel>
    in?: $Enums.ProfileStatusLocal[] | ListEnumProfileStatusLocalFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProfileStatusLocal[] | ListEnumProfileStatusLocalFieldRefInput<$PrismaModel>
    not?: NestedEnumProfileStatusLocalWithAggregatesFilter<$PrismaModel> | $Enums.ProfileStatusLocal
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProfileStatusLocalFilter<$PrismaModel>
    _max?: NestedEnumProfileStatusLocalFilter<$PrismaModel>
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
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
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

  export type NestedEnumIdentityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IdentityStatus | EnumIdentityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.IdentityStatus[] | ListEnumIdentityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.IdentityStatus[] | ListEnumIdentityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumIdentityStatusWithAggregatesFilter<$PrismaModel> | $Enums.IdentityStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIdentityStatusFilter<$PrismaModel>
    _max?: NestedEnumIdentityStatusFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use VendorProfileDefaultArgs instead
     */
    export type VendorProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VendorProfileDefaultArgs<ExtArgs>

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