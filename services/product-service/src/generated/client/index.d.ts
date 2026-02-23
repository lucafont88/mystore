
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
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model DigitalFile
 * 
 */
export type DigitalFile = $Result.DefaultSelection<Prisma.$DigitalFilePayload>
/**
 * Model DigitalLicense
 * 
 */
export type DigitalLicense = $Result.DefaultSelection<Prisma.$DigitalLicensePayload>
/**
 * Model LicenseKey
 * 
 */
export type LicenseKey = $Result.DefaultSelection<Prisma.$LicenseKeyPayload>
/**
 * Model DigitalAccess
 * 
 */
export type DigitalAccess = $Result.DefaultSelection<Prisma.$DigitalAccessPayload>
/**
 * Model Bundle
 * 
 */
export type Bundle = $Result.DefaultSelection<Prisma.$BundlePayload>
/**
 * Model BundleItem
 * 
 */
export type BundleItem = $Result.DefaultSelection<Prisma.$BundleItemPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProductType: {
  PHYSICAL: 'PHYSICAL',
  DIGITAL_FILE: 'DIGITAL_FILE',
  DIGITAL_LICENSE: 'DIGITAL_LICENSE',
  DIGITAL_ACCESS: 'DIGITAL_ACCESS'
};

export type ProductType = (typeof ProductType)[keyof typeof ProductType]

}

export type ProductType = $Enums.ProductType

export const ProductType: typeof $Enums.ProductType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categories
 * const categories = await prisma.category.findMany()
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
   * // Fetch zero or more Categories
   * const categories = await prisma.category.findMany()
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
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.digitalFile`: Exposes CRUD operations for the **DigitalFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DigitalFiles
    * const digitalFiles = await prisma.digitalFile.findMany()
    * ```
    */
  get digitalFile(): Prisma.DigitalFileDelegate<ExtArgs>;

  /**
   * `prisma.digitalLicense`: Exposes CRUD operations for the **DigitalLicense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DigitalLicenses
    * const digitalLicenses = await prisma.digitalLicense.findMany()
    * ```
    */
  get digitalLicense(): Prisma.DigitalLicenseDelegate<ExtArgs>;

  /**
   * `prisma.licenseKey`: Exposes CRUD operations for the **LicenseKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LicenseKeys
    * const licenseKeys = await prisma.licenseKey.findMany()
    * ```
    */
  get licenseKey(): Prisma.LicenseKeyDelegate<ExtArgs>;

  /**
   * `prisma.digitalAccess`: Exposes CRUD operations for the **DigitalAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DigitalAccesses
    * const digitalAccesses = await prisma.digitalAccess.findMany()
    * ```
    */
  get digitalAccess(): Prisma.DigitalAccessDelegate<ExtArgs>;

  /**
   * `prisma.bundle`: Exposes CRUD operations for the **Bundle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bundles
    * const bundles = await prisma.bundle.findMany()
    * ```
    */
  get bundle(): Prisma.BundleDelegate<ExtArgs>;

  /**
   * `prisma.bundleItem`: Exposes CRUD operations for the **BundleItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BundleItems
    * const bundleItems = await prisma.bundleItem.findMany()
    * ```
    */
  get bundleItem(): Prisma.BundleItemDelegate<ExtArgs>;
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
    Category: 'Category',
    Product: 'Product',
    DigitalFile: 'DigitalFile',
    DigitalLicense: 'DigitalLicense',
    LicenseKey: 'LicenseKey',
    DigitalAccess: 'DigitalAccess',
    Bundle: 'Bundle',
    BundleItem: 'BundleItem'
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
      modelProps: "category" | "product" | "digitalFile" | "digitalLicense" | "licenseKey" | "digitalAccess" | "bundle" | "bundleItem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      DigitalFile: {
        payload: Prisma.$DigitalFilePayload<ExtArgs>
        fields: Prisma.DigitalFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DigitalFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DigitalFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalFilePayload>
          }
          findFirst: {
            args: Prisma.DigitalFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DigitalFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalFilePayload>
          }
          findMany: {
            args: Prisma.DigitalFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalFilePayload>[]
          }
          create: {
            args: Prisma.DigitalFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalFilePayload>
          }
          createMany: {
            args: Prisma.DigitalFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DigitalFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalFilePayload>[]
          }
          delete: {
            args: Prisma.DigitalFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalFilePayload>
          }
          update: {
            args: Prisma.DigitalFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalFilePayload>
          }
          deleteMany: {
            args: Prisma.DigitalFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DigitalFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DigitalFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalFilePayload>
          }
          aggregate: {
            args: Prisma.DigitalFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDigitalFile>
          }
          groupBy: {
            args: Prisma.DigitalFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<DigitalFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.DigitalFileCountArgs<ExtArgs>
            result: $Utils.Optional<DigitalFileCountAggregateOutputType> | number
          }
        }
      }
      DigitalLicense: {
        payload: Prisma.$DigitalLicensePayload<ExtArgs>
        fields: Prisma.DigitalLicenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DigitalLicenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalLicensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DigitalLicenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalLicensePayload>
          }
          findFirst: {
            args: Prisma.DigitalLicenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalLicensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DigitalLicenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalLicensePayload>
          }
          findMany: {
            args: Prisma.DigitalLicenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalLicensePayload>[]
          }
          create: {
            args: Prisma.DigitalLicenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalLicensePayload>
          }
          createMany: {
            args: Prisma.DigitalLicenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DigitalLicenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalLicensePayload>[]
          }
          delete: {
            args: Prisma.DigitalLicenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalLicensePayload>
          }
          update: {
            args: Prisma.DigitalLicenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalLicensePayload>
          }
          deleteMany: {
            args: Prisma.DigitalLicenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DigitalLicenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DigitalLicenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalLicensePayload>
          }
          aggregate: {
            args: Prisma.DigitalLicenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDigitalLicense>
          }
          groupBy: {
            args: Prisma.DigitalLicenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<DigitalLicenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.DigitalLicenseCountArgs<ExtArgs>
            result: $Utils.Optional<DigitalLicenseCountAggregateOutputType> | number
          }
        }
      }
      LicenseKey: {
        payload: Prisma.$LicenseKeyPayload<ExtArgs>
        fields: Prisma.LicenseKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LicenseKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicenseKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LicenseKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicenseKeyPayload>
          }
          findFirst: {
            args: Prisma.LicenseKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicenseKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LicenseKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicenseKeyPayload>
          }
          findMany: {
            args: Prisma.LicenseKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicenseKeyPayload>[]
          }
          create: {
            args: Prisma.LicenseKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicenseKeyPayload>
          }
          createMany: {
            args: Prisma.LicenseKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LicenseKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicenseKeyPayload>[]
          }
          delete: {
            args: Prisma.LicenseKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicenseKeyPayload>
          }
          update: {
            args: Prisma.LicenseKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicenseKeyPayload>
          }
          deleteMany: {
            args: Prisma.LicenseKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LicenseKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LicenseKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LicenseKeyPayload>
          }
          aggregate: {
            args: Prisma.LicenseKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLicenseKey>
          }
          groupBy: {
            args: Prisma.LicenseKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<LicenseKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.LicenseKeyCountArgs<ExtArgs>
            result: $Utils.Optional<LicenseKeyCountAggregateOutputType> | number
          }
        }
      }
      DigitalAccess: {
        payload: Prisma.$DigitalAccessPayload<ExtArgs>
        fields: Prisma.DigitalAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DigitalAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DigitalAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalAccessPayload>
          }
          findFirst: {
            args: Prisma.DigitalAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DigitalAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalAccessPayload>
          }
          findMany: {
            args: Prisma.DigitalAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalAccessPayload>[]
          }
          create: {
            args: Prisma.DigitalAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalAccessPayload>
          }
          createMany: {
            args: Prisma.DigitalAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DigitalAccessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalAccessPayload>[]
          }
          delete: {
            args: Prisma.DigitalAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalAccessPayload>
          }
          update: {
            args: Prisma.DigitalAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalAccessPayload>
          }
          deleteMany: {
            args: Prisma.DigitalAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DigitalAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DigitalAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalAccessPayload>
          }
          aggregate: {
            args: Prisma.DigitalAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDigitalAccess>
          }
          groupBy: {
            args: Prisma.DigitalAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<DigitalAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.DigitalAccessCountArgs<ExtArgs>
            result: $Utils.Optional<DigitalAccessCountAggregateOutputType> | number
          }
        }
      }
      Bundle: {
        payload: Prisma.$BundlePayload<ExtArgs>
        fields: Prisma.BundleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BundleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BundleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundlePayload>
          }
          findFirst: {
            args: Prisma.BundleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BundleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundlePayload>
          }
          findMany: {
            args: Prisma.BundleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundlePayload>[]
          }
          create: {
            args: Prisma.BundleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundlePayload>
          }
          createMany: {
            args: Prisma.BundleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BundleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundlePayload>[]
          }
          delete: {
            args: Prisma.BundleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundlePayload>
          }
          update: {
            args: Prisma.BundleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundlePayload>
          }
          deleteMany: {
            args: Prisma.BundleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BundleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BundleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundlePayload>
          }
          aggregate: {
            args: Prisma.BundleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBundle>
          }
          groupBy: {
            args: Prisma.BundleGroupByArgs<ExtArgs>
            result: $Utils.Optional<BundleGroupByOutputType>[]
          }
          count: {
            args: Prisma.BundleCountArgs<ExtArgs>
            result: $Utils.Optional<BundleCountAggregateOutputType> | number
          }
        }
      }
      BundleItem: {
        payload: Prisma.$BundleItemPayload<ExtArgs>
        fields: Prisma.BundleItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BundleItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundleItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BundleItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundleItemPayload>
          }
          findFirst: {
            args: Prisma.BundleItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundleItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BundleItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundleItemPayload>
          }
          findMany: {
            args: Prisma.BundleItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundleItemPayload>[]
          }
          create: {
            args: Prisma.BundleItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundleItemPayload>
          }
          createMany: {
            args: Prisma.BundleItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BundleItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundleItemPayload>[]
          }
          delete: {
            args: Prisma.BundleItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundleItemPayload>
          }
          update: {
            args: Prisma.BundleItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundleItemPayload>
          }
          deleteMany: {
            args: Prisma.BundleItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BundleItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BundleItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BundleItemPayload>
          }
          aggregate: {
            args: Prisma.BundleItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBundleItem>
          }
          groupBy: {
            args: Prisma.BundleItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<BundleItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.BundleItemCountArgs<ExtArgs>
            result: $Utils.Optional<BundleItemCountAggregateOutputType> | number
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
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    children: number
    products: number
    bundles: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | CategoryCountOutputTypeCountChildrenArgs
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
    bundles?: boolean | CategoryCountOutputTypeCountBundlesArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountBundlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BundleWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    bundleItems: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bundleItems?: boolean | ProductCountOutputTypeCountBundleItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountBundleItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BundleItemWhereInput
  }


  /**
   * Count Type DigitalLicenseCountOutputType
   */

  export type DigitalLicenseCountOutputType = {
    keys: number
  }

  export type DigitalLicenseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    keys?: boolean | DigitalLicenseCountOutputTypeCountKeysArgs
  }

  // Custom InputTypes
  /**
   * DigitalLicenseCountOutputType without action
   */
  export type DigitalLicenseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicenseCountOutputType
     */
    select?: DigitalLicenseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DigitalLicenseCountOutputType without action
   */
  export type DigitalLicenseCountOutputTypeCountKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LicenseKeyWhereInput
  }


  /**
   * Count Type BundleCountOutputType
   */

  export type BundleCountOutputType = {
    items: number
  }

  export type BundleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | BundleCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * BundleCountOutputType without action
   */
  export type BundleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleCountOutputType
     */
    select?: BundleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BundleCountOutputType without action
   */
  export type BundleCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BundleItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    parentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    parentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    parentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    parentId: string | null
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    bundles?: boolean | Category$bundlesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | Category$parentArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    bundles?: boolean | Category$bundlesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Category$parentArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      parent: Prisma.$CategoryPayload<ExtArgs> | null
      children: Prisma.$CategoryPayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
      bundles: Prisma.$BundlePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      parentId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Category$parentArgs<ExtArgs> = {}>(args?: Subset<T, Category$parentArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    children<T extends Category$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Category$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany"> | Null>
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany"> | Null>
    bundles<T extends Category$bundlesArgs<ExtArgs> = {}>(args?: Subset<T, Category$bundlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly parentId: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.parent
   */
  export type Category$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Category.children
   */
  export type Category$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category.bundles
   */
  export type Category$bundlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bundle
     */
    select?: BundleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleInclude<ExtArgs> | null
    where?: BundleWhereInput
    orderBy?: BundleOrderByWithRelationInput | BundleOrderByWithRelationInput[]
    cursor?: BundleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BundleScalarFieldEnum | BundleScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: Decimal | null
    stockQuantity: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: Decimal | null
    stockQuantity: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    price: Decimal | null
    sku: string | null
    stockQuantity: number | null
    vendorId: string | null
    categoryId: string | null
    isFeatured: boolean | null
    productType: $Enums.ProductType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    price: Decimal | null
    sku: string | null
    stockQuantity: number | null
    vendorId: string | null
    categoryId: string | null
    isFeatured: boolean | null
    productType: $Enums.ProductType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    price: number
    sku: number
    stockQuantity: number
    vendorId: number
    categoryId: number
    images: number
    isFeatured: number
    productType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
    stockQuantity?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
    stockQuantity?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    sku?: true
    stockQuantity?: true
    vendorId?: true
    categoryId?: true
    isFeatured?: true
    productType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    sku?: true
    stockQuantity?: true
    vendorId?: true
    categoryId?: true
    isFeatured?: true
    productType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    sku?: true
    stockQuantity?: true
    vendorId?: true
    categoryId?: true
    images?: true
    isFeatured?: true
    productType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    price: Decimal
    sku: string
    stockQuantity: number
    vendorId: string
    categoryId: string
    images: string[]
    isFeatured: boolean
    productType: $Enums.ProductType
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    sku?: boolean
    stockQuantity?: boolean
    vendorId?: boolean
    categoryId?: boolean
    images?: boolean
    isFeatured?: boolean
    productType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    digitalFile?: boolean | Product$digitalFileArgs<ExtArgs>
    digitalLicense?: boolean | Product$digitalLicenseArgs<ExtArgs>
    digitalAccess?: boolean | Product$digitalAccessArgs<ExtArgs>
    bundleItems?: boolean | Product$bundleItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    sku?: boolean
    stockQuantity?: boolean
    vendorId?: boolean
    categoryId?: boolean
    images?: boolean
    isFeatured?: boolean
    productType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    sku?: boolean
    stockQuantity?: boolean
    vendorId?: boolean
    categoryId?: boolean
    images?: boolean
    isFeatured?: boolean
    productType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    digitalFile?: boolean | Product$digitalFileArgs<ExtArgs>
    digitalLicense?: boolean | Product$digitalLicenseArgs<ExtArgs>
    digitalAccess?: boolean | Product$digitalAccessArgs<ExtArgs>
    bundleItems?: boolean | Product$bundleItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      digitalFile: Prisma.$DigitalFilePayload<ExtArgs> | null
      digitalLicense: Prisma.$DigitalLicensePayload<ExtArgs> | null
      digitalAccess: Prisma.$DigitalAccessPayload<ExtArgs> | null
      bundleItems: Prisma.$BundleItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      price: Prisma.Decimal
      sku: string
      stockQuantity: number
      vendorId: string
      categoryId: string
      images: string[]
      isFeatured: boolean
      productType: $Enums.ProductType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    digitalFile<T extends Product$digitalFileArgs<ExtArgs> = {}>(args?: Subset<T, Product$digitalFileArgs<ExtArgs>>): Prisma__DigitalFileClient<$Result.GetResult<Prisma.$DigitalFilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    digitalLicense<T extends Product$digitalLicenseArgs<ExtArgs> = {}>(args?: Subset<T, Product$digitalLicenseArgs<ExtArgs>>): Prisma__DigitalLicenseClient<$Result.GetResult<Prisma.$DigitalLicensePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    digitalAccess<T extends Product$digitalAccessArgs<ExtArgs> = {}>(args?: Subset<T, Product$digitalAccessArgs<ExtArgs>>): Prisma__DigitalAccessClient<$Result.GetResult<Prisma.$DigitalAccessPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    bundleItems<T extends Product$bundleItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$bundleItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Decimal'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly stockQuantity: FieldRef<"Product", 'Int'>
    readonly vendorId: FieldRef<"Product", 'String'>
    readonly categoryId: FieldRef<"Product", 'String'>
    readonly images: FieldRef<"Product", 'String[]'>
    readonly isFeatured: FieldRef<"Product", 'Boolean'>
    readonly productType: FieldRef<"Product", 'ProductType'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product.digitalFile
   */
  export type Product$digitalFileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalFile
     */
    select?: DigitalFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalFileInclude<ExtArgs> | null
    where?: DigitalFileWhereInput
  }

  /**
   * Product.digitalLicense
   */
  export type Product$digitalLicenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicense
     */
    select?: DigitalLicenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalLicenseInclude<ExtArgs> | null
    where?: DigitalLicenseWhereInput
  }

  /**
   * Product.digitalAccess
   */
  export type Product$digitalAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalAccess
     */
    select?: DigitalAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalAccessInclude<ExtArgs> | null
    where?: DigitalAccessWhereInput
  }

  /**
   * Product.bundleItems
   */
  export type Product$bundleItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemInclude<ExtArgs> | null
    where?: BundleItemWhereInput
    orderBy?: BundleItemOrderByWithRelationInput | BundleItemOrderByWithRelationInput[]
    cursor?: BundleItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BundleItemScalarFieldEnum | BundleItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model DigitalFile
   */

  export type AggregateDigitalFile = {
    _count: DigitalFileCountAggregateOutputType | null
    _avg: DigitalFileAvgAggregateOutputType | null
    _sum: DigitalFileSumAggregateOutputType | null
    _min: DigitalFileMinAggregateOutputType | null
    _max: DigitalFileMaxAggregateOutputType | null
  }

  export type DigitalFileAvgAggregateOutputType = {
    fileSize: number | null
    maxDownloads: number | null
  }

  export type DigitalFileSumAggregateOutputType = {
    fileSize: number | null
    maxDownloads: number | null
  }

  export type DigitalFileMinAggregateOutputType = {
    id: string | null
    productId: string | null
    fileKey: string | null
    fileName: string | null
    fileSize: number | null
    mimeType: string | null
    maxDownloads: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DigitalFileMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    fileKey: string | null
    fileName: string | null
    fileSize: number | null
    mimeType: string | null
    maxDownloads: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DigitalFileCountAggregateOutputType = {
    id: number
    productId: number
    fileKey: number
    fileName: number
    fileSize: number
    mimeType: number
    maxDownloads: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DigitalFileAvgAggregateInputType = {
    fileSize?: true
    maxDownloads?: true
  }

  export type DigitalFileSumAggregateInputType = {
    fileSize?: true
    maxDownloads?: true
  }

  export type DigitalFileMinAggregateInputType = {
    id?: true
    productId?: true
    fileKey?: true
    fileName?: true
    fileSize?: true
    mimeType?: true
    maxDownloads?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DigitalFileMaxAggregateInputType = {
    id?: true
    productId?: true
    fileKey?: true
    fileName?: true
    fileSize?: true
    mimeType?: true
    maxDownloads?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DigitalFileCountAggregateInputType = {
    id?: true
    productId?: true
    fileKey?: true
    fileName?: true
    fileSize?: true
    mimeType?: true
    maxDownloads?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DigitalFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DigitalFile to aggregate.
     */
    where?: DigitalFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalFiles to fetch.
     */
    orderBy?: DigitalFileOrderByWithRelationInput | DigitalFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DigitalFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DigitalFiles
    **/
    _count?: true | DigitalFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DigitalFileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DigitalFileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DigitalFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DigitalFileMaxAggregateInputType
  }

  export type GetDigitalFileAggregateType<T extends DigitalFileAggregateArgs> = {
        [P in keyof T & keyof AggregateDigitalFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDigitalFile[P]>
      : GetScalarType<T[P], AggregateDigitalFile[P]>
  }




  export type DigitalFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DigitalFileWhereInput
    orderBy?: DigitalFileOrderByWithAggregationInput | DigitalFileOrderByWithAggregationInput[]
    by: DigitalFileScalarFieldEnum[] | DigitalFileScalarFieldEnum
    having?: DigitalFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DigitalFileCountAggregateInputType | true
    _avg?: DigitalFileAvgAggregateInputType
    _sum?: DigitalFileSumAggregateInputType
    _min?: DigitalFileMinAggregateInputType
    _max?: DigitalFileMaxAggregateInputType
  }

  export type DigitalFileGroupByOutputType = {
    id: string
    productId: string
    fileKey: string
    fileName: string
    fileSize: number
    mimeType: string
    maxDownloads: number
    createdAt: Date
    updatedAt: Date
    _count: DigitalFileCountAggregateOutputType | null
    _avg: DigitalFileAvgAggregateOutputType | null
    _sum: DigitalFileSumAggregateOutputType | null
    _min: DigitalFileMinAggregateOutputType | null
    _max: DigitalFileMaxAggregateOutputType | null
  }

  type GetDigitalFileGroupByPayload<T extends DigitalFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DigitalFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DigitalFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DigitalFileGroupByOutputType[P]>
            : GetScalarType<T[P], DigitalFileGroupByOutputType[P]>
        }
      >
    >


  export type DigitalFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    fileKey?: boolean
    fileName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    maxDownloads?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["digitalFile"]>

  export type DigitalFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    fileKey?: boolean
    fileName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    maxDownloads?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["digitalFile"]>

  export type DigitalFileSelectScalar = {
    id?: boolean
    productId?: boolean
    fileKey?: boolean
    fileName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    maxDownloads?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DigitalFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type DigitalFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $DigitalFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DigitalFile"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      fileKey: string
      fileName: string
      fileSize: number
      mimeType: string
      maxDownloads: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["digitalFile"]>
    composites: {}
  }

  type DigitalFileGetPayload<S extends boolean | null | undefined | DigitalFileDefaultArgs> = $Result.GetResult<Prisma.$DigitalFilePayload, S>

  type DigitalFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DigitalFileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DigitalFileCountAggregateInputType | true
    }

  export interface DigitalFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DigitalFile'], meta: { name: 'DigitalFile' } }
    /**
     * Find zero or one DigitalFile that matches the filter.
     * @param {DigitalFileFindUniqueArgs} args - Arguments to find a DigitalFile
     * @example
     * // Get one DigitalFile
     * const digitalFile = await prisma.digitalFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DigitalFileFindUniqueArgs>(args: SelectSubset<T, DigitalFileFindUniqueArgs<ExtArgs>>): Prisma__DigitalFileClient<$Result.GetResult<Prisma.$DigitalFilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DigitalFile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DigitalFileFindUniqueOrThrowArgs} args - Arguments to find a DigitalFile
     * @example
     * // Get one DigitalFile
     * const digitalFile = await prisma.digitalFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DigitalFileFindUniqueOrThrowArgs>(args: SelectSubset<T, DigitalFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DigitalFileClient<$Result.GetResult<Prisma.$DigitalFilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DigitalFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalFileFindFirstArgs} args - Arguments to find a DigitalFile
     * @example
     * // Get one DigitalFile
     * const digitalFile = await prisma.digitalFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DigitalFileFindFirstArgs>(args?: SelectSubset<T, DigitalFileFindFirstArgs<ExtArgs>>): Prisma__DigitalFileClient<$Result.GetResult<Prisma.$DigitalFilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DigitalFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalFileFindFirstOrThrowArgs} args - Arguments to find a DigitalFile
     * @example
     * // Get one DigitalFile
     * const digitalFile = await prisma.digitalFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DigitalFileFindFirstOrThrowArgs>(args?: SelectSubset<T, DigitalFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__DigitalFileClient<$Result.GetResult<Prisma.$DigitalFilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DigitalFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DigitalFiles
     * const digitalFiles = await prisma.digitalFile.findMany()
     * 
     * // Get first 10 DigitalFiles
     * const digitalFiles = await prisma.digitalFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const digitalFileWithIdOnly = await prisma.digitalFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DigitalFileFindManyArgs>(args?: SelectSubset<T, DigitalFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DigitalFilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DigitalFile.
     * @param {DigitalFileCreateArgs} args - Arguments to create a DigitalFile.
     * @example
     * // Create one DigitalFile
     * const DigitalFile = await prisma.digitalFile.create({
     *   data: {
     *     // ... data to create a DigitalFile
     *   }
     * })
     * 
     */
    create<T extends DigitalFileCreateArgs>(args: SelectSubset<T, DigitalFileCreateArgs<ExtArgs>>): Prisma__DigitalFileClient<$Result.GetResult<Prisma.$DigitalFilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DigitalFiles.
     * @param {DigitalFileCreateManyArgs} args - Arguments to create many DigitalFiles.
     * @example
     * // Create many DigitalFiles
     * const digitalFile = await prisma.digitalFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DigitalFileCreateManyArgs>(args?: SelectSubset<T, DigitalFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DigitalFiles and returns the data saved in the database.
     * @param {DigitalFileCreateManyAndReturnArgs} args - Arguments to create many DigitalFiles.
     * @example
     * // Create many DigitalFiles
     * const digitalFile = await prisma.digitalFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DigitalFiles and only return the `id`
     * const digitalFileWithIdOnly = await prisma.digitalFile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DigitalFileCreateManyAndReturnArgs>(args?: SelectSubset<T, DigitalFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DigitalFilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DigitalFile.
     * @param {DigitalFileDeleteArgs} args - Arguments to delete one DigitalFile.
     * @example
     * // Delete one DigitalFile
     * const DigitalFile = await prisma.digitalFile.delete({
     *   where: {
     *     // ... filter to delete one DigitalFile
     *   }
     * })
     * 
     */
    delete<T extends DigitalFileDeleteArgs>(args: SelectSubset<T, DigitalFileDeleteArgs<ExtArgs>>): Prisma__DigitalFileClient<$Result.GetResult<Prisma.$DigitalFilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DigitalFile.
     * @param {DigitalFileUpdateArgs} args - Arguments to update one DigitalFile.
     * @example
     * // Update one DigitalFile
     * const digitalFile = await prisma.digitalFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DigitalFileUpdateArgs>(args: SelectSubset<T, DigitalFileUpdateArgs<ExtArgs>>): Prisma__DigitalFileClient<$Result.GetResult<Prisma.$DigitalFilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DigitalFiles.
     * @param {DigitalFileDeleteManyArgs} args - Arguments to filter DigitalFiles to delete.
     * @example
     * // Delete a few DigitalFiles
     * const { count } = await prisma.digitalFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DigitalFileDeleteManyArgs>(args?: SelectSubset<T, DigitalFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DigitalFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DigitalFiles
     * const digitalFile = await prisma.digitalFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DigitalFileUpdateManyArgs>(args: SelectSubset<T, DigitalFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DigitalFile.
     * @param {DigitalFileUpsertArgs} args - Arguments to update or create a DigitalFile.
     * @example
     * // Update or create a DigitalFile
     * const digitalFile = await prisma.digitalFile.upsert({
     *   create: {
     *     // ... data to create a DigitalFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DigitalFile we want to update
     *   }
     * })
     */
    upsert<T extends DigitalFileUpsertArgs>(args: SelectSubset<T, DigitalFileUpsertArgs<ExtArgs>>): Prisma__DigitalFileClient<$Result.GetResult<Prisma.$DigitalFilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DigitalFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalFileCountArgs} args - Arguments to filter DigitalFiles to count.
     * @example
     * // Count the number of DigitalFiles
     * const count = await prisma.digitalFile.count({
     *   where: {
     *     // ... the filter for the DigitalFiles we want to count
     *   }
     * })
    **/
    count<T extends DigitalFileCountArgs>(
      args?: Subset<T, DigitalFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DigitalFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DigitalFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DigitalFileAggregateArgs>(args: Subset<T, DigitalFileAggregateArgs>): Prisma.PrismaPromise<GetDigitalFileAggregateType<T>>

    /**
     * Group by DigitalFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalFileGroupByArgs} args - Group by arguments.
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
      T extends DigitalFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DigitalFileGroupByArgs['orderBy'] }
        : { orderBy?: DigitalFileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DigitalFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDigitalFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DigitalFile model
   */
  readonly fields: DigitalFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DigitalFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DigitalFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the DigitalFile model
   */ 
  interface DigitalFileFieldRefs {
    readonly id: FieldRef<"DigitalFile", 'String'>
    readonly productId: FieldRef<"DigitalFile", 'String'>
    readonly fileKey: FieldRef<"DigitalFile", 'String'>
    readonly fileName: FieldRef<"DigitalFile", 'String'>
    readonly fileSize: FieldRef<"DigitalFile", 'Int'>
    readonly mimeType: FieldRef<"DigitalFile", 'String'>
    readonly maxDownloads: FieldRef<"DigitalFile", 'Int'>
    readonly createdAt: FieldRef<"DigitalFile", 'DateTime'>
    readonly updatedAt: FieldRef<"DigitalFile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DigitalFile findUnique
   */
  export type DigitalFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalFile
     */
    select?: DigitalFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalFileInclude<ExtArgs> | null
    /**
     * Filter, which DigitalFile to fetch.
     */
    where: DigitalFileWhereUniqueInput
  }

  /**
   * DigitalFile findUniqueOrThrow
   */
  export type DigitalFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalFile
     */
    select?: DigitalFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalFileInclude<ExtArgs> | null
    /**
     * Filter, which DigitalFile to fetch.
     */
    where: DigitalFileWhereUniqueInput
  }

  /**
   * DigitalFile findFirst
   */
  export type DigitalFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalFile
     */
    select?: DigitalFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalFileInclude<ExtArgs> | null
    /**
     * Filter, which DigitalFile to fetch.
     */
    where?: DigitalFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalFiles to fetch.
     */
    orderBy?: DigitalFileOrderByWithRelationInput | DigitalFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DigitalFiles.
     */
    cursor?: DigitalFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DigitalFiles.
     */
    distinct?: DigitalFileScalarFieldEnum | DigitalFileScalarFieldEnum[]
  }

  /**
   * DigitalFile findFirstOrThrow
   */
  export type DigitalFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalFile
     */
    select?: DigitalFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalFileInclude<ExtArgs> | null
    /**
     * Filter, which DigitalFile to fetch.
     */
    where?: DigitalFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalFiles to fetch.
     */
    orderBy?: DigitalFileOrderByWithRelationInput | DigitalFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DigitalFiles.
     */
    cursor?: DigitalFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DigitalFiles.
     */
    distinct?: DigitalFileScalarFieldEnum | DigitalFileScalarFieldEnum[]
  }

  /**
   * DigitalFile findMany
   */
  export type DigitalFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalFile
     */
    select?: DigitalFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalFileInclude<ExtArgs> | null
    /**
     * Filter, which DigitalFiles to fetch.
     */
    where?: DigitalFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalFiles to fetch.
     */
    orderBy?: DigitalFileOrderByWithRelationInput | DigitalFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DigitalFiles.
     */
    cursor?: DigitalFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalFiles.
     */
    skip?: number
    distinct?: DigitalFileScalarFieldEnum | DigitalFileScalarFieldEnum[]
  }

  /**
   * DigitalFile create
   */
  export type DigitalFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalFile
     */
    select?: DigitalFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalFileInclude<ExtArgs> | null
    /**
     * The data needed to create a DigitalFile.
     */
    data: XOR<DigitalFileCreateInput, DigitalFileUncheckedCreateInput>
  }

  /**
   * DigitalFile createMany
   */
  export type DigitalFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DigitalFiles.
     */
    data: DigitalFileCreateManyInput | DigitalFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DigitalFile createManyAndReturn
   */
  export type DigitalFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalFile
     */
    select?: DigitalFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DigitalFiles.
     */
    data: DigitalFileCreateManyInput | DigitalFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DigitalFile update
   */
  export type DigitalFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalFile
     */
    select?: DigitalFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalFileInclude<ExtArgs> | null
    /**
     * The data needed to update a DigitalFile.
     */
    data: XOR<DigitalFileUpdateInput, DigitalFileUncheckedUpdateInput>
    /**
     * Choose, which DigitalFile to update.
     */
    where: DigitalFileWhereUniqueInput
  }

  /**
   * DigitalFile updateMany
   */
  export type DigitalFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DigitalFiles.
     */
    data: XOR<DigitalFileUpdateManyMutationInput, DigitalFileUncheckedUpdateManyInput>
    /**
     * Filter which DigitalFiles to update
     */
    where?: DigitalFileWhereInput
  }

  /**
   * DigitalFile upsert
   */
  export type DigitalFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalFile
     */
    select?: DigitalFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalFileInclude<ExtArgs> | null
    /**
     * The filter to search for the DigitalFile to update in case it exists.
     */
    where: DigitalFileWhereUniqueInput
    /**
     * In case the DigitalFile found by the `where` argument doesn't exist, create a new DigitalFile with this data.
     */
    create: XOR<DigitalFileCreateInput, DigitalFileUncheckedCreateInput>
    /**
     * In case the DigitalFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DigitalFileUpdateInput, DigitalFileUncheckedUpdateInput>
  }

  /**
   * DigitalFile delete
   */
  export type DigitalFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalFile
     */
    select?: DigitalFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalFileInclude<ExtArgs> | null
    /**
     * Filter which DigitalFile to delete.
     */
    where: DigitalFileWhereUniqueInput
  }

  /**
   * DigitalFile deleteMany
   */
  export type DigitalFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DigitalFiles to delete
     */
    where?: DigitalFileWhereInput
  }

  /**
   * DigitalFile without action
   */
  export type DigitalFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalFile
     */
    select?: DigitalFileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalFileInclude<ExtArgs> | null
  }


  /**
   * Model DigitalLicense
   */

  export type AggregateDigitalLicense = {
    _count: DigitalLicenseCountAggregateOutputType | null
    _min: DigitalLicenseMinAggregateOutputType | null
    _max: DigitalLicenseMaxAggregateOutputType | null
  }

  export type DigitalLicenseMinAggregateOutputType = {
    id: string | null
    productId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DigitalLicenseMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DigitalLicenseCountAggregateOutputType = {
    id: number
    productId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DigitalLicenseMinAggregateInputType = {
    id?: true
    productId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DigitalLicenseMaxAggregateInputType = {
    id?: true
    productId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DigitalLicenseCountAggregateInputType = {
    id?: true
    productId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DigitalLicenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DigitalLicense to aggregate.
     */
    where?: DigitalLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalLicenses to fetch.
     */
    orderBy?: DigitalLicenseOrderByWithRelationInput | DigitalLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DigitalLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalLicenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DigitalLicenses
    **/
    _count?: true | DigitalLicenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DigitalLicenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DigitalLicenseMaxAggregateInputType
  }

  export type GetDigitalLicenseAggregateType<T extends DigitalLicenseAggregateArgs> = {
        [P in keyof T & keyof AggregateDigitalLicense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDigitalLicense[P]>
      : GetScalarType<T[P], AggregateDigitalLicense[P]>
  }




  export type DigitalLicenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DigitalLicenseWhereInput
    orderBy?: DigitalLicenseOrderByWithAggregationInput | DigitalLicenseOrderByWithAggregationInput[]
    by: DigitalLicenseScalarFieldEnum[] | DigitalLicenseScalarFieldEnum
    having?: DigitalLicenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DigitalLicenseCountAggregateInputType | true
    _min?: DigitalLicenseMinAggregateInputType
    _max?: DigitalLicenseMaxAggregateInputType
  }

  export type DigitalLicenseGroupByOutputType = {
    id: string
    productId: string
    createdAt: Date
    updatedAt: Date
    _count: DigitalLicenseCountAggregateOutputType | null
    _min: DigitalLicenseMinAggregateOutputType | null
    _max: DigitalLicenseMaxAggregateOutputType | null
  }

  type GetDigitalLicenseGroupByPayload<T extends DigitalLicenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DigitalLicenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DigitalLicenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DigitalLicenseGroupByOutputType[P]>
            : GetScalarType<T[P], DigitalLicenseGroupByOutputType[P]>
        }
      >
    >


  export type DigitalLicenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    keys?: boolean | DigitalLicense$keysArgs<ExtArgs>
    _count?: boolean | DigitalLicenseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["digitalLicense"]>

  export type DigitalLicenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["digitalLicense"]>

  export type DigitalLicenseSelectScalar = {
    id?: boolean
    productId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DigitalLicenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    keys?: boolean | DigitalLicense$keysArgs<ExtArgs>
    _count?: boolean | DigitalLicenseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DigitalLicenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $DigitalLicensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DigitalLicense"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      keys: Prisma.$LicenseKeyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["digitalLicense"]>
    composites: {}
  }

  type DigitalLicenseGetPayload<S extends boolean | null | undefined | DigitalLicenseDefaultArgs> = $Result.GetResult<Prisma.$DigitalLicensePayload, S>

  type DigitalLicenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DigitalLicenseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DigitalLicenseCountAggregateInputType | true
    }

  export interface DigitalLicenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DigitalLicense'], meta: { name: 'DigitalLicense' } }
    /**
     * Find zero or one DigitalLicense that matches the filter.
     * @param {DigitalLicenseFindUniqueArgs} args - Arguments to find a DigitalLicense
     * @example
     * // Get one DigitalLicense
     * const digitalLicense = await prisma.digitalLicense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DigitalLicenseFindUniqueArgs>(args: SelectSubset<T, DigitalLicenseFindUniqueArgs<ExtArgs>>): Prisma__DigitalLicenseClient<$Result.GetResult<Prisma.$DigitalLicensePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DigitalLicense that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DigitalLicenseFindUniqueOrThrowArgs} args - Arguments to find a DigitalLicense
     * @example
     * // Get one DigitalLicense
     * const digitalLicense = await prisma.digitalLicense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DigitalLicenseFindUniqueOrThrowArgs>(args: SelectSubset<T, DigitalLicenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DigitalLicenseClient<$Result.GetResult<Prisma.$DigitalLicensePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DigitalLicense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalLicenseFindFirstArgs} args - Arguments to find a DigitalLicense
     * @example
     * // Get one DigitalLicense
     * const digitalLicense = await prisma.digitalLicense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DigitalLicenseFindFirstArgs>(args?: SelectSubset<T, DigitalLicenseFindFirstArgs<ExtArgs>>): Prisma__DigitalLicenseClient<$Result.GetResult<Prisma.$DigitalLicensePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DigitalLicense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalLicenseFindFirstOrThrowArgs} args - Arguments to find a DigitalLicense
     * @example
     * // Get one DigitalLicense
     * const digitalLicense = await prisma.digitalLicense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DigitalLicenseFindFirstOrThrowArgs>(args?: SelectSubset<T, DigitalLicenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__DigitalLicenseClient<$Result.GetResult<Prisma.$DigitalLicensePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DigitalLicenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalLicenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DigitalLicenses
     * const digitalLicenses = await prisma.digitalLicense.findMany()
     * 
     * // Get first 10 DigitalLicenses
     * const digitalLicenses = await prisma.digitalLicense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const digitalLicenseWithIdOnly = await prisma.digitalLicense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DigitalLicenseFindManyArgs>(args?: SelectSubset<T, DigitalLicenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DigitalLicensePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DigitalLicense.
     * @param {DigitalLicenseCreateArgs} args - Arguments to create a DigitalLicense.
     * @example
     * // Create one DigitalLicense
     * const DigitalLicense = await prisma.digitalLicense.create({
     *   data: {
     *     // ... data to create a DigitalLicense
     *   }
     * })
     * 
     */
    create<T extends DigitalLicenseCreateArgs>(args: SelectSubset<T, DigitalLicenseCreateArgs<ExtArgs>>): Prisma__DigitalLicenseClient<$Result.GetResult<Prisma.$DigitalLicensePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DigitalLicenses.
     * @param {DigitalLicenseCreateManyArgs} args - Arguments to create many DigitalLicenses.
     * @example
     * // Create many DigitalLicenses
     * const digitalLicense = await prisma.digitalLicense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DigitalLicenseCreateManyArgs>(args?: SelectSubset<T, DigitalLicenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DigitalLicenses and returns the data saved in the database.
     * @param {DigitalLicenseCreateManyAndReturnArgs} args - Arguments to create many DigitalLicenses.
     * @example
     * // Create many DigitalLicenses
     * const digitalLicense = await prisma.digitalLicense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DigitalLicenses and only return the `id`
     * const digitalLicenseWithIdOnly = await prisma.digitalLicense.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DigitalLicenseCreateManyAndReturnArgs>(args?: SelectSubset<T, DigitalLicenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DigitalLicensePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DigitalLicense.
     * @param {DigitalLicenseDeleteArgs} args - Arguments to delete one DigitalLicense.
     * @example
     * // Delete one DigitalLicense
     * const DigitalLicense = await prisma.digitalLicense.delete({
     *   where: {
     *     // ... filter to delete one DigitalLicense
     *   }
     * })
     * 
     */
    delete<T extends DigitalLicenseDeleteArgs>(args: SelectSubset<T, DigitalLicenseDeleteArgs<ExtArgs>>): Prisma__DigitalLicenseClient<$Result.GetResult<Prisma.$DigitalLicensePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DigitalLicense.
     * @param {DigitalLicenseUpdateArgs} args - Arguments to update one DigitalLicense.
     * @example
     * // Update one DigitalLicense
     * const digitalLicense = await prisma.digitalLicense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DigitalLicenseUpdateArgs>(args: SelectSubset<T, DigitalLicenseUpdateArgs<ExtArgs>>): Prisma__DigitalLicenseClient<$Result.GetResult<Prisma.$DigitalLicensePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DigitalLicenses.
     * @param {DigitalLicenseDeleteManyArgs} args - Arguments to filter DigitalLicenses to delete.
     * @example
     * // Delete a few DigitalLicenses
     * const { count } = await prisma.digitalLicense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DigitalLicenseDeleteManyArgs>(args?: SelectSubset<T, DigitalLicenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DigitalLicenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalLicenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DigitalLicenses
     * const digitalLicense = await prisma.digitalLicense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DigitalLicenseUpdateManyArgs>(args: SelectSubset<T, DigitalLicenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DigitalLicense.
     * @param {DigitalLicenseUpsertArgs} args - Arguments to update or create a DigitalLicense.
     * @example
     * // Update or create a DigitalLicense
     * const digitalLicense = await prisma.digitalLicense.upsert({
     *   create: {
     *     // ... data to create a DigitalLicense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DigitalLicense we want to update
     *   }
     * })
     */
    upsert<T extends DigitalLicenseUpsertArgs>(args: SelectSubset<T, DigitalLicenseUpsertArgs<ExtArgs>>): Prisma__DigitalLicenseClient<$Result.GetResult<Prisma.$DigitalLicensePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DigitalLicenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalLicenseCountArgs} args - Arguments to filter DigitalLicenses to count.
     * @example
     * // Count the number of DigitalLicenses
     * const count = await prisma.digitalLicense.count({
     *   where: {
     *     // ... the filter for the DigitalLicenses we want to count
     *   }
     * })
    **/
    count<T extends DigitalLicenseCountArgs>(
      args?: Subset<T, DigitalLicenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DigitalLicenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DigitalLicense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalLicenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DigitalLicenseAggregateArgs>(args: Subset<T, DigitalLicenseAggregateArgs>): Prisma.PrismaPromise<GetDigitalLicenseAggregateType<T>>

    /**
     * Group by DigitalLicense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalLicenseGroupByArgs} args - Group by arguments.
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
      T extends DigitalLicenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DigitalLicenseGroupByArgs['orderBy'] }
        : { orderBy?: DigitalLicenseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DigitalLicenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDigitalLicenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DigitalLicense model
   */
  readonly fields: DigitalLicenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DigitalLicense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DigitalLicenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    keys<T extends DigitalLicense$keysArgs<ExtArgs> = {}>(args?: Subset<T, DigitalLicense$keysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LicenseKeyPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the DigitalLicense model
   */ 
  interface DigitalLicenseFieldRefs {
    readonly id: FieldRef<"DigitalLicense", 'String'>
    readonly productId: FieldRef<"DigitalLicense", 'String'>
    readonly createdAt: FieldRef<"DigitalLicense", 'DateTime'>
    readonly updatedAt: FieldRef<"DigitalLicense", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DigitalLicense findUnique
   */
  export type DigitalLicenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicense
     */
    select?: DigitalLicenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which DigitalLicense to fetch.
     */
    where: DigitalLicenseWhereUniqueInput
  }

  /**
   * DigitalLicense findUniqueOrThrow
   */
  export type DigitalLicenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicense
     */
    select?: DigitalLicenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which DigitalLicense to fetch.
     */
    where: DigitalLicenseWhereUniqueInput
  }

  /**
   * DigitalLicense findFirst
   */
  export type DigitalLicenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicense
     */
    select?: DigitalLicenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which DigitalLicense to fetch.
     */
    where?: DigitalLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalLicenses to fetch.
     */
    orderBy?: DigitalLicenseOrderByWithRelationInput | DigitalLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DigitalLicenses.
     */
    cursor?: DigitalLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalLicenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DigitalLicenses.
     */
    distinct?: DigitalLicenseScalarFieldEnum | DigitalLicenseScalarFieldEnum[]
  }

  /**
   * DigitalLicense findFirstOrThrow
   */
  export type DigitalLicenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicense
     */
    select?: DigitalLicenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which DigitalLicense to fetch.
     */
    where?: DigitalLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalLicenses to fetch.
     */
    orderBy?: DigitalLicenseOrderByWithRelationInput | DigitalLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DigitalLicenses.
     */
    cursor?: DigitalLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalLicenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DigitalLicenses.
     */
    distinct?: DigitalLicenseScalarFieldEnum | DigitalLicenseScalarFieldEnum[]
  }

  /**
   * DigitalLicense findMany
   */
  export type DigitalLicenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicense
     */
    select?: DigitalLicenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalLicenseInclude<ExtArgs> | null
    /**
     * Filter, which DigitalLicenses to fetch.
     */
    where?: DigitalLicenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalLicenses to fetch.
     */
    orderBy?: DigitalLicenseOrderByWithRelationInput | DigitalLicenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DigitalLicenses.
     */
    cursor?: DigitalLicenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalLicenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalLicenses.
     */
    skip?: number
    distinct?: DigitalLicenseScalarFieldEnum | DigitalLicenseScalarFieldEnum[]
  }

  /**
   * DigitalLicense create
   */
  export type DigitalLicenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicense
     */
    select?: DigitalLicenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalLicenseInclude<ExtArgs> | null
    /**
     * The data needed to create a DigitalLicense.
     */
    data: XOR<DigitalLicenseCreateInput, DigitalLicenseUncheckedCreateInput>
  }

  /**
   * DigitalLicense createMany
   */
  export type DigitalLicenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DigitalLicenses.
     */
    data: DigitalLicenseCreateManyInput | DigitalLicenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DigitalLicense createManyAndReturn
   */
  export type DigitalLicenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicense
     */
    select?: DigitalLicenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DigitalLicenses.
     */
    data: DigitalLicenseCreateManyInput | DigitalLicenseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalLicenseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DigitalLicense update
   */
  export type DigitalLicenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicense
     */
    select?: DigitalLicenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalLicenseInclude<ExtArgs> | null
    /**
     * The data needed to update a DigitalLicense.
     */
    data: XOR<DigitalLicenseUpdateInput, DigitalLicenseUncheckedUpdateInput>
    /**
     * Choose, which DigitalLicense to update.
     */
    where: DigitalLicenseWhereUniqueInput
  }

  /**
   * DigitalLicense updateMany
   */
  export type DigitalLicenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DigitalLicenses.
     */
    data: XOR<DigitalLicenseUpdateManyMutationInput, DigitalLicenseUncheckedUpdateManyInput>
    /**
     * Filter which DigitalLicenses to update
     */
    where?: DigitalLicenseWhereInput
  }

  /**
   * DigitalLicense upsert
   */
  export type DigitalLicenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicense
     */
    select?: DigitalLicenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalLicenseInclude<ExtArgs> | null
    /**
     * The filter to search for the DigitalLicense to update in case it exists.
     */
    where: DigitalLicenseWhereUniqueInput
    /**
     * In case the DigitalLicense found by the `where` argument doesn't exist, create a new DigitalLicense with this data.
     */
    create: XOR<DigitalLicenseCreateInput, DigitalLicenseUncheckedCreateInput>
    /**
     * In case the DigitalLicense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DigitalLicenseUpdateInput, DigitalLicenseUncheckedUpdateInput>
  }

  /**
   * DigitalLicense delete
   */
  export type DigitalLicenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicense
     */
    select?: DigitalLicenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalLicenseInclude<ExtArgs> | null
    /**
     * Filter which DigitalLicense to delete.
     */
    where: DigitalLicenseWhereUniqueInput
  }

  /**
   * DigitalLicense deleteMany
   */
  export type DigitalLicenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DigitalLicenses to delete
     */
    where?: DigitalLicenseWhereInput
  }

  /**
   * DigitalLicense.keys
   */
  export type DigitalLicense$keysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseKey
     */
    select?: LicenseKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LicenseKeyInclude<ExtArgs> | null
    where?: LicenseKeyWhereInput
    orderBy?: LicenseKeyOrderByWithRelationInput | LicenseKeyOrderByWithRelationInput[]
    cursor?: LicenseKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LicenseKeyScalarFieldEnum | LicenseKeyScalarFieldEnum[]
  }

  /**
   * DigitalLicense without action
   */
  export type DigitalLicenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalLicense
     */
    select?: DigitalLicenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalLicenseInclude<ExtArgs> | null
  }


  /**
   * Model LicenseKey
   */

  export type AggregateLicenseKey = {
    _count: LicenseKeyCountAggregateOutputType | null
    _min: LicenseKeyMinAggregateOutputType | null
    _max: LicenseKeyMaxAggregateOutputType | null
  }

  export type LicenseKeyMinAggregateOutputType = {
    id: string | null
    digitalLicenseId: string | null
    key: string | null
    isRedeemed: boolean | null
    redeemedAt: Date | null
    redeemedBy: string | null
    createdAt: Date | null
  }

  export type LicenseKeyMaxAggregateOutputType = {
    id: string | null
    digitalLicenseId: string | null
    key: string | null
    isRedeemed: boolean | null
    redeemedAt: Date | null
    redeemedBy: string | null
    createdAt: Date | null
  }

  export type LicenseKeyCountAggregateOutputType = {
    id: number
    digitalLicenseId: number
    key: number
    isRedeemed: number
    redeemedAt: number
    redeemedBy: number
    createdAt: number
    _all: number
  }


  export type LicenseKeyMinAggregateInputType = {
    id?: true
    digitalLicenseId?: true
    key?: true
    isRedeemed?: true
    redeemedAt?: true
    redeemedBy?: true
    createdAt?: true
  }

  export type LicenseKeyMaxAggregateInputType = {
    id?: true
    digitalLicenseId?: true
    key?: true
    isRedeemed?: true
    redeemedAt?: true
    redeemedBy?: true
    createdAt?: true
  }

  export type LicenseKeyCountAggregateInputType = {
    id?: true
    digitalLicenseId?: true
    key?: true
    isRedeemed?: true
    redeemedAt?: true
    redeemedBy?: true
    createdAt?: true
    _all?: true
  }

  export type LicenseKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LicenseKey to aggregate.
     */
    where?: LicenseKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LicenseKeys to fetch.
     */
    orderBy?: LicenseKeyOrderByWithRelationInput | LicenseKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LicenseKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LicenseKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LicenseKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LicenseKeys
    **/
    _count?: true | LicenseKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LicenseKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LicenseKeyMaxAggregateInputType
  }

  export type GetLicenseKeyAggregateType<T extends LicenseKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateLicenseKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLicenseKey[P]>
      : GetScalarType<T[P], AggregateLicenseKey[P]>
  }




  export type LicenseKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LicenseKeyWhereInput
    orderBy?: LicenseKeyOrderByWithAggregationInput | LicenseKeyOrderByWithAggregationInput[]
    by: LicenseKeyScalarFieldEnum[] | LicenseKeyScalarFieldEnum
    having?: LicenseKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LicenseKeyCountAggregateInputType | true
    _min?: LicenseKeyMinAggregateInputType
    _max?: LicenseKeyMaxAggregateInputType
  }

  export type LicenseKeyGroupByOutputType = {
    id: string
    digitalLicenseId: string
    key: string
    isRedeemed: boolean
    redeemedAt: Date | null
    redeemedBy: string | null
    createdAt: Date
    _count: LicenseKeyCountAggregateOutputType | null
    _min: LicenseKeyMinAggregateOutputType | null
    _max: LicenseKeyMaxAggregateOutputType | null
  }

  type GetLicenseKeyGroupByPayload<T extends LicenseKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LicenseKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LicenseKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LicenseKeyGroupByOutputType[P]>
            : GetScalarType<T[P], LicenseKeyGroupByOutputType[P]>
        }
      >
    >


  export type LicenseKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    digitalLicenseId?: boolean
    key?: boolean
    isRedeemed?: boolean
    redeemedAt?: boolean
    redeemedBy?: boolean
    createdAt?: boolean
    digitalLicense?: boolean | DigitalLicenseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["licenseKey"]>

  export type LicenseKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    digitalLicenseId?: boolean
    key?: boolean
    isRedeemed?: boolean
    redeemedAt?: boolean
    redeemedBy?: boolean
    createdAt?: boolean
    digitalLicense?: boolean | DigitalLicenseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["licenseKey"]>

  export type LicenseKeySelectScalar = {
    id?: boolean
    digitalLicenseId?: boolean
    key?: boolean
    isRedeemed?: boolean
    redeemedAt?: boolean
    redeemedBy?: boolean
    createdAt?: boolean
  }

  export type LicenseKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    digitalLicense?: boolean | DigitalLicenseDefaultArgs<ExtArgs>
  }
  export type LicenseKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    digitalLicense?: boolean | DigitalLicenseDefaultArgs<ExtArgs>
  }

  export type $LicenseKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LicenseKey"
    objects: {
      digitalLicense: Prisma.$DigitalLicensePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      digitalLicenseId: string
      key: string
      isRedeemed: boolean
      redeemedAt: Date | null
      redeemedBy: string | null
      createdAt: Date
    }, ExtArgs["result"]["licenseKey"]>
    composites: {}
  }

  type LicenseKeyGetPayload<S extends boolean | null | undefined | LicenseKeyDefaultArgs> = $Result.GetResult<Prisma.$LicenseKeyPayload, S>

  type LicenseKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LicenseKeyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LicenseKeyCountAggregateInputType | true
    }

  export interface LicenseKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LicenseKey'], meta: { name: 'LicenseKey' } }
    /**
     * Find zero or one LicenseKey that matches the filter.
     * @param {LicenseKeyFindUniqueArgs} args - Arguments to find a LicenseKey
     * @example
     * // Get one LicenseKey
     * const licenseKey = await prisma.licenseKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LicenseKeyFindUniqueArgs>(args: SelectSubset<T, LicenseKeyFindUniqueArgs<ExtArgs>>): Prisma__LicenseKeyClient<$Result.GetResult<Prisma.$LicenseKeyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LicenseKey that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LicenseKeyFindUniqueOrThrowArgs} args - Arguments to find a LicenseKey
     * @example
     * // Get one LicenseKey
     * const licenseKey = await prisma.licenseKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LicenseKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, LicenseKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LicenseKeyClient<$Result.GetResult<Prisma.$LicenseKeyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LicenseKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseKeyFindFirstArgs} args - Arguments to find a LicenseKey
     * @example
     * // Get one LicenseKey
     * const licenseKey = await prisma.licenseKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LicenseKeyFindFirstArgs>(args?: SelectSubset<T, LicenseKeyFindFirstArgs<ExtArgs>>): Prisma__LicenseKeyClient<$Result.GetResult<Prisma.$LicenseKeyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LicenseKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseKeyFindFirstOrThrowArgs} args - Arguments to find a LicenseKey
     * @example
     * // Get one LicenseKey
     * const licenseKey = await prisma.licenseKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LicenseKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, LicenseKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__LicenseKeyClient<$Result.GetResult<Prisma.$LicenseKeyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LicenseKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LicenseKeys
     * const licenseKeys = await prisma.licenseKey.findMany()
     * 
     * // Get first 10 LicenseKeys
     * const licenseKeys = await prisma.licenseKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const licenseKeyWithIdOnly = await prisma.licenseKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LicenseKeyFindManyArgs>(args?: SelectSubset<T, LicenseKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LicenseKeyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LicenseKey.
     * @param {LicenseKeyCreateArgs} args - Arguments to create a LicenseKey.
     * @example
     * // Create one LicenseKey
     * const LicenseKey = await prisma.licenseKey.create({
     *   data: {
     *     // ... data to create a LicenseKey
     *   }
     * })
     * 
     */
    create<T extends LicenseKeyCreateArgs>(args: SelectSubset<T, LicenseKeyCreateArgs<ExtArgs>>): Prisma__LicenseKeyClient<$Result.GetResult<Prisma.$LicenseKeyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LicenseKeys.
     * @param {LicenseKeyCreateManyArgs} args - Arguments to create many LicenseKeys.
     * @example
     * // Create many LicenseKeys
     * const licenseKey = await prisma.licenseKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LicenseKeyCreateManyArgs>(args?: SelectSubset<T, LicenseKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LicenseKeys and returns the data saved in the database.
     * @param {LicenseKeyCreateManyAndReturnArgs} args - Arguments to create many LicenseKeys.
     * @example
     * // Create many LicenseKeys
     * const licenseKey = await prisma.licenseKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LicenseKeys and only return the `id`
     * const licenseKeyWithIdOnly = await prisma.licenseKey.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LicenseKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, LicenseKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LicenseKeyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LicenseKey.
     * @param {LicenseKeyDeleteArgs} args - Arguments to delete one LicenseKey.
     * @example
     * // Delete one LicenseKey
     * const LicenseKey = await prisma.licenseKey.delete({
     *   where: {
     *     // ... filter to delete one LicenseKey
     *   }
     * })
     * 
     */
    delete<T extends LicenseKeyDeleteArgs>(args: SelectSubset<T, LicenseKeyDeleteArgs<ExtArgs>>): Prisma__LicenseKeyClient<$Result.GetResult<Prisma.$LicenseKeyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LicenseKey.
     * @param {LicenseKeyUpdateArgs} args - Arguments to update one LicenseKey.
     * @example
     * // Update one LicenseKey
     * const licenseKey = await prisma.licenseKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LicenseKeyUpdateArgs>(args: SelectSubset<T, LicenseKeyUpdateArgs<ExtArgs>>): Prisma__LicenseKeyClient<$Result.GetResult<Prisma.$LicenseKeyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LicenseKeys.
     * @param {LicenseKeyDeleteManyArgs} args - Arguments to filter LicenseKeys to delete.
     * @example
     * // Delete a few LicenseKeys
     * const { count } = await prisma.licenseKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LicenseKeyDeleteManyArgs>(args?: SelectSubset<T, LicenseKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LicenseKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LicenseKeys
     * const licenseKey = await prisma.licenseKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LicenseKeyUpdateManyArgs>(args: SelectSubset<T, LicenseKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LicenseKey.
     * @param {LicenseKeyUpsertArgs} args - Arguments to update or create a LicenseKey.
     * @example
     * // Update or create a LicenseKey
     * const licenseKey = await prisma.licenseKey.upsert({
     *   create: {
     *     // ... data to create a LicenseKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LicenseKey we want to update
     *   }
     * })
     */
    upsert<T extends LicenseKeyUpsertArgs>(args: SelectSubset<T, LicenseKeyUpsertArgs<ExtArgs>>): Prisma__LicenseKeyClient<$Result.GetResult<Prisma.$LicenseKeyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LicenseKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseKeyCountArgs} args - Arguments to filter LicenseKeys to count.
     * @example
     * // Count the number of LicenseKeys
     * const count = await prisma.licenseKey.count({
     *   where: {
     *     // ... the filter for the LicenseKeys we want to count
     *   }
     * })
    **/
    count<T extends LicenseKeyCountArgs>(
      args?: Subset<T, LicenseKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LicenseKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LicenseKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LicenseKeyAggregateArgs>(args: Subset<T, LicenseKeyAggregateArgs>): Prisma.PrismaPromise<GetLicenseKeyAggregateType<T>>

    /**
     * Group by LicenseKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LicenseKeyGroupByArgs} args - Group by arguments.
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
      T extends LicenseKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LicenseKeyGroupByArgs['orderBy'] }
        : { orderBy?: LicenseKeyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LicenseKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLicenseKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LicenseKey model
   */
  readonly fields: LicenseKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LicenseKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LicenseKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    digitalLicense<T extends DigitalLicenseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DigitalLicenseDefaultArgs<ExtArgs>>): Prisma__DigitalLicenseClient<$Result.GetResult<Prisma.$DigitalLicensePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the LicenseKey model
   */ 
  interface LicenseKeyFieldRefs {
    readonly id: FieldRef<"LicenseKey", 'String'>
    readonly digitalLicenseId: FieldRef<"LicenseKey", 'String'>
    readonly key: FieldRef<"LicenseKey", 'String'>
    readonly isRedeemed: FieldRef<"LicenseKey", 'Boolean'>
    readonly redeemedAt: FieldRef<"LicenseKey", 'DateTime'>
    readonly redeemedBy: FieldRef<"LicenseKey", 'String'>
    readonly createdAt: FieldRef<"LicenseKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LicenseKey findUnique
   */
  export type LicenseKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseKey
     */
    select?: LicenseKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LicenseKeyInclude<ExtArgs> | null
    /**
     * Filter, which LicenseKey to fetch.
     */
    where: LicenseKeyWhereUniqueInput
  }

  /**
   * LicenseKey findUniqueOrThrow
   */
  export type LicenseKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseKey
     */
    select?: LicenseKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LicenseKeyInclude<ExtArgs> | null
    /**
     * Filter, which LicenseKey to fetch.
     */
    where: LicenseKeyWhereUniqueInput
  }

  /**
   * LicenseKey findFirst
   */
  export type LicenseKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseKey
     */
    select?: LicenseKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LicenseKeyInclude<ExtArgs> | null
    /**
     * Filter, which LicenseKey to fetch.
     */
    where?: LicenseKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LicenseKeys to fetch.
     */
    orderBy?: LicenseKeyOrderByWithRelationInput | LicenseKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LicenseKeys.
     */
    cursor?: LicenseKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LicenseKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LicenseKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LicenseKeys.
     */
    distinct?: LicenseKeyScalarFieldEnum | LicenseKeyScalarFieldEnum[]
  }

  /**
   * LicenseKey findFirstOrThrow
   */
  export type LicenseKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseKey
     */
    select?: LicenseKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LicenseKeyInclude<ExtArgs> | null
    /**
     * Filter, which LicenseKey to fetch.
     */
    where?: LicenseKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LicenseKeys to fetch.
     */
    orderBy?: LicenseKeyOrderByWithRelationInput | LicenseKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LicenseKeys.
     */
    cursor?: LicenseKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LicenseKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LicenseKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LicenseKeys.
     */
    distinct?: LicenseKeyScalarFieldEnum | LicenseKeyScalarFieldEnum[]
  }

  /**
   * LicenseKey findMany
   */
  export type LicenseKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseKey
     */
    select?: LicenseKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LicenseKeyInclude<ExtArgs> | null
    /**
     * Filter, which LicenseKeys to fetch.
     */
    where?: LicenseKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LicenseKeys to fetch.
     */
    orderBy?: LicenseKeyOrderByWithRelationInput | LicenseKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LicenseKeys.
     */
    cursor?: LicenseKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LicenseKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LicenseKeys.
     */
    skip?: number
    distinct?: LicenseKeyScalarFieldEnum | LicenseKeyScalarFieldEnum[]
  }

  /**
   * LicenseKey create
   */
  export type LicenseKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseKey
     */
    select?: LicenseKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LicenseKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a LicenseKey.
     */
    data: XOR<LicenseKeyCreateInput, LicenseKeyUncheckedCreateInput>
  }

  /**
   * LicenseKey createMany
   */
  export type LicenseKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LicenseKeys.
     */
    data: LicenseKeyCreateManyInput | LicenseKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LicenseKey createManyAndReturn
   */
  export type LicenseKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseKey
     */
    select?: LicenseKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LicenseKeys.
     */
    data: LicenseKeyCreateManyInput | LicenseKeyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LicenseKeyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LicenseKey update
   */
  export type LicenseKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseKey
     */
    select?: LicenseKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LicenseKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a LicenseKey.
     */
    data: XOR<LicenseKeyUpdateInput, LicenseKeyUncheckedUpdateInput>
    /**
     * Choose, which LicenseKey to update.
     */
    where: LicenseKeyWhereUniqueInput
  }

  /**
   * LicenseKey updateMany
   */
  export type LicenseKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LicenseKeys.
     */
    data: XOR<LicenseKeyUpdateManyMutationInput, LicenseKeyUncheckedUpdateManyInput>
    /**
     * Filter which LicenseKeys to update
     */
    where?: LicenseKeyWhereInput
  }

  /**
   * LicenseKey upsert
   */
  export type LicenseKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseKey
     */
    select?: LicenseKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LicenseKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the LicenseKey to update in case it exists.
     */
    where: LicenseKeyWhereUniqueInput
    /**
     * In case the LicenseKey found by the `where` argument doesn't exist, create a new LicenseKey with this data.
     */
    create: XOR<LicenseKeyCreateInput, LicenseKeyUncheckedCreateInput>
    /**
     * In case the LicenseKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LicenseKeyUpdateInput, LicenseKeyUncheckedUpdateInput>
  }

  /**
   * LicenseKey delete
   */
  export type LicenseKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseKey
     */
    select?: LicenseKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LicenseKeyInclude<ExtArgs> | null
    /**
     * Filter which LicenseKey to delete.
     */
    where: LicenseKeyWhereUniqueInput
  }

  /**
   * LicenseKey deleteMany
   */
  export type LicenseKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LicenseKeys to delete
     */
    where?: LicenseKeyWhereInput
  }

  /**
   * LicenseKey without action
   */
  export type LicenseKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LicenseKey
     */
    select?: LicenseKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LicenseKeyInclude<ExtArgs> | null
  }


  /**
   * Model DigitalAccess
   */

  export type AggregateDigitalAccess = {
    _count: DigitalAccessCountAggregateOutputType | null
    _avg: DigitalAccessAvgAggregateOutputType | null
    _sum: DigitalAccessSumAggregateOutputType | null
    _min: DigitalAccessMinAggregateOutputType | null
    _max: DigitalAccessMaxAggregateOutputType | null
  }

  export type DigitalAccessAvgAggregateOutputType = {
    accessDurationDays: number | null
  }

  export type DigitalAccessSumAggregateOutputType = {
    accessDurationDays: number | null
  }

  export type DigitalAccessMinAggregateOutputType = {
    id: string | null
    productId: string | null
    accessDurationDays: number | null
    accessUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DigitalAccessMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    accessDurationDays: number | null
    accessUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DigitalAccessCountAggregateOutputType = {
    id: number
    productId: number
    accessDurationDays: number
    accessUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DigitalAccessAvgAggregateInputType = {
    accessDurationDays?: true
  }

  export type DigitalAccessSumAggregateInputType = {
    accessDurationDays?: true
  }

  export type DigitalAccessMinAggregateInputType = {
    id?: true
    productId?: true
    accessDurationDays?: true
    accessUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DigitalAccessMaxAggregateInputType = {
    id?: true
    productId?: true
    accessDurationDays?: true
    accessUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DigitalAccessCountAggregateInputType = {
    id?: true
    productId?: true
    accessDurationDays?: true
    accessUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DigitalAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DigitalAccess to aggregate.
     */
    where?: DigitalAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalAccesses to fetch.
     */
    orderBy?: DigitalAccessOrderByWithRelationInput | DigitalAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DigitalAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DigitalAccesses
    **/
    _count?: true | DigitalAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DigitalAccessAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DigitalAccessSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DigitalAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DigitalAccessMaxAggregateInputType
  }

  export type GetDigitalAccessAggregateType<T extends DigitalAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateDigitalAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDigitalAccess[P]>
      : GetScalarType<T[P], AggregateDigitalAccess[P]>
  }




  export type DigitalAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DigitalAccessWhereInput
    orderBy?: DigitalAccessOrderByWithAggregationInput | DigitalAccessOrderByWithAggregationInput[]
    by: DigitalAccessScalarFieldEnum[] | DigitalAccessScalarFieldEnum
    having?: DigitalAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DigitalAccessCountAggregateInputType | true
    _avg?: DigitalAccessAvgAggregateInputType
    _sum?: DigitalAccessSumAggregateInputType
    _min?: DigitalAccessMinAggregateInputType
    _max?: DigitalAccessMaxAggregateInputType
  }

  export type DigitalAccessGroupByOutputType = {
    id: string
    productId: string
    accessDurationDays: number
    accessUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: DigitalAccessCountAggregateOutputType | null
    _avg: DigitalAccessAvgAggregateOutputType | null
    _sum: DigitalAccessSumAggregateOutputType | null
    _min: DigitalAccessMinAggregateOutputType | null
    _max: DigitalAccessMaxAggregateOutputType | null
  }

  type GetDigitalAccessGroupByPayload<T extends DigitalAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DigitalAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DigitalAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DigitalAccessGroupByOutputType[P]>
            : GetScalarType<T[P], DigitalAccessGroupByOutputType[P]>
        }
      >
    >


  export type DigitalAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    accessDurationDays?: boolean
    accessUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["digitalAccess"]>

  export type DigitalAccessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    accessDurationDays?: boolean
    accessUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["digitalAccess"]>

  export type DigitalAccessSelectScalar = {
    id?: boolean
    productId?: boolean
    accessDurationDays?: boolean
    accessUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DigitalAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type DigitalAccessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $DigitalAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DigitalAccess"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      accessDurationDays: number
      accessUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["digitalAccess"]>
    composites: {}
  }

  type DigitalAccessGetPayload<S extends boolean | null | undefined | DigitalAccessDefaultArgs> = $Result.GetResult<Prisma.$DigitalAccessPayload, S>

  type DigitalAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DigitalAccessFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DigitalAccessCountAggregateInputType | true
    }

  export interface DigitalAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DigitalAccess'], meta: { name: 'DigitalAccess' } }
    /**
     * Find zero or one DigitalAccess that matches the filter.
     * @param {DigitalAccessFindUniqueArgs} args - Arguments to find a DigitalAccess
     * @example
     * // Get one DigitalAccess
     * const digitalAccess = await prisma.digitalAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DigitalAccessFindUniqueArgs>(args: SelectSubset<T, DigitalAccessFindUniqueArgs<ExtArgs>>): Prisma__DigitalAccessClient<$Result.GetResult<Prisma.$DigitalAccessPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DigitalAccess that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DigitalAccessFindUniqueOrThrowArgs} args - Arguments to find a DigitalAccess
     * @example
     * // Get one DigitalAccess
     * const digitalAccess = await prisma.digitalAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DigitalAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, DigitalAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DigitalAccessClient<$Result.GetResult<Prisma.$DigitalAccessPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DigitalAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalAccessFindFirstArgs} args - Arguments to find a DigitalAccess
     * @example
     * // Get one DigitalAccess
     * const digitalAccess = await prisma.digitalAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DigitalAccessFindFirstArgs>(args?: SelectSubset<T, DigitalAccessFindFirstArgs<ExtArgs>>): Prisma__DigitalAccessClient<$Result.GetResult<Prisma.$DigitalAccessPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DigitalAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalAccessFindFirstOrThrowArgs} args - Arguments to find a DigitalAccess
     * @example
     * // Get one DigitalAccess
     * const digitalAccess = await prisma.digitalAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DigitalAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, DigitalAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__DigitalAccessClient<$Result.GetResult<Prisma.$DigitalAccessPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DigitalAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DigitalAccesses
     * const digitalAccesses = await prisma.digitalAccess.findMany()
     * 
     * // Get first 10 DigitalAccesses
     * const digitalAccesses = await prisma.digitalAccess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const digitalAccessWithIdOnly = await prisma.digitalAccess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DigitalAccessFindManyArgs>(args?: SelectSubset<T, DigitalAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DigitalAccessPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DigitalAccess.
     * @param {DigitalAccessCreateArgs} args - Arguments to create a DigitalAccess.
     * @example
     * // Create one DigitalAccess
     * const DigitalAccess = await prisma.digitalAccess.create({
     *   data: {
     *     // ... data to create a DigitalAccess
     *   }
     * })
     * 
     */
    create<T extends DigitalAccessCreateArgs>(args: SelectSubset<T, DigitalAccessCreateArgs<ExtArgs>>): Prisma__DigitalAccessClient<$Result.GetResult<Prisma.$DigitalAccessPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DigitalAccesses.
     * @param {DigitalAccessCreateManyArgs} args - Arguments to create many DigitalAccesses.
     * @example
     * // Create many DigitalAccesses
     * const digitalAccess = await prisma.digitalAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DigitalAccessCreateManyArgs>(args?: SelectSubset<T, DigitalAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DigitalAccesses and returns the data saved in the database.
     * @param {DigitalAccessCreateManyAndReturnArgs} args - Arguments to create many DigitalAccesses.
     * @example
     * // Create many DigitalAccesses
     * const digitalAccess = await prisma.digitalAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DigitalAccesses and only return the `id`
     * const digitalAccessWithIdOnly = await prisma.digitalAccess.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DigitalAccessCreateManyAndReturnArgs>(args?: SelectSubset<T, DigitalAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DigitalAccessPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DigitalAccess.
     * @param {DigitalAccessDeleteArgs} args - Arguments to delete one DigitalAccess.
     * @example
     * // Delete one DigitalAccess
     * const DigitalAccess = await prisma.digitalAccess.delete({
     *   where: {
     *     // ... filter to delete one DigitalAccess
     *   }
     * })
     * 
     */
    delete<T extends DigitalAccessDeleteArgs>(args: SelectSubset<T, DigitalAccessDeleteArgs<ExtArgs>>): Prisma__DigitalAccessClient<$Result.GetResult<Prisma.$DigitalAccessPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DigitalAccess.
     * @param {DigitalAccessUpdateArgs} args - Arguments to update one DigitalAccess.
     * @example
     * // Update one DigitalAccess
     * const digitalAccess = await prisma.digitalAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DigitalAccessUpdateArgs>(args: SelectSubset<T, DigitalAccessUpdateArgs<ExtArgs>>): Prisma__DigitalAccessClient<$Result.GetResult<Prisma.$DigitalAccessPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DigitalAccesses.
     * @param {DigitalAccessDeleteManyArgs} args - Arguments to filter DigitalAccesses to delete.
     * @example
     * // Delete a few DigitalAccesses
     * const { count } = await prisma.digitalAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DigitalAccessDeleteManyArgs>(args?: SelectSubset<T, DigitalAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DigitalAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DigitalAccesses
     * const digitalAccess = await prisma.digitalAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DigitalAccessUpdateManyArgs>(args: SelectSubset<T, DigitalAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DigitalAccess.
     * @param {DigitalAccessUpsertArgs} args - Arguments to update or create a DigitalAccess.
     * @example
     * // Update or create a DigitalAccess
     * const digitalAccess = await prisma.digitalAccess.upsert({
     *   create: {
     *     // ... data to create a DigitalAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DigitalAccess we want to update
     *   }
     * })
     */
    upsert<T extends DigitalAccessUpsertArgs>(args: SelectSubset<T, DigitalAccessUpsertArgs<ExtArgs>>): Prisma__DigitalAccessClient<$Result.GetResult<Prisma.$DigitalAccessPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DigitalAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalAccessCountArgs} args - Arguments to filter DigitalAccesses to count.
     * @example
     * // Count the number of DigitalAccesses
     * const count = await prisma.digitalAccess.count({
     *   where: {
     *     // ... the filter for the DigitalAccesses we want to count
     *   }
     * })
    **/
    count<T extends DigitalAccessCountArgs>(
      args?: Subset<T, DigitalAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DigitalAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DigitalAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DigitalAccessAggregateArgs>(args: Subset<T, DigitalAccessAggregateArgs>): Prisma.PrismaPromise<GetDigitalAccessAggregateType<T>>

    /**
     * Group by DigitalAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalAccessGroupByArgs} args - Group by arguments.
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
      T extends DigitalAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DigitalAccessGroupByArgs['orderBy'] }
        : { orderBy?: DigitalAccessGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DigitalAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDigitalAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DigitalAccess model
   */
  readonly fields: DigitalAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DigitalAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DigitalAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the DigitalAccess model
   */ 
  interface DigitalAccessFieldRefs {
    readonly id: FieldRef<"DigitalAccess", 'String'>
    readonly productId: FieldRef<"DigitalAccess", 'String'>
    readonly accessDurationDays: FieldRef<"DigitalAccess", 'Int'>
    readonly accessUrl: FieldRef<"DigitalAccess", 'String'>
    readonly createdAt: FieldRef<"DigitalAccess", 'DateTime'>
    readonly updatedAt: FieldRef<"DigitalAccess", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DigitalAccess findUnique
   */
  export type DigitalAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalAccess
     */
    select?: DigitalAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalAccessInclude<ExtArgs> | null
    /**
     * Filter, which DigitalAccess to fetch.
     */
    where: DigitalAccessWhereUniqueInput
  }

  /**
   * DigitalAccess findUniqueOrThrow
   */
  export type DigitalAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalAccess
     */
    select?: DigitalAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalAccessInclude<ExtArgs> | null
    /**
     * Filter, which DigitalAccess to fetch.
     */
    where: DigitalAccessWhereUniqueInput
  }

  /**
   * DigitalAccess findFirst
   */
  export type DigitalAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalAccess
     */
    select?: DigitalAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalAccessInclude<ExtArgs> | null
    /**
     * Filter, which DigitalAccess to fetch.
     */
    where?: DigitalAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalAccesses to fetch.
     */
    orderBy?: DigitalAccessOrderByWithRelationInput | DigitalAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DigitalAccesses.
     */
    cursor?: DigitalAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DigitalAccesses.
     */
    distinct?: DigitalAccessScalarFieldEnum | DigitalAccessScalarFieldEnum[]
  }

  /**
   * DigitalAccess findFirstOrThrow
   */
  export type DigitalAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalAccess
     */
    select?: DigitalAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalAccessInclude<ExtArgs> | null
    /**
     * Filter, which DigitalAccess to fetch.
     */
    where?: DigitalAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalAccesses to fetch.
     */
    orderBy?: DigitalAccessOrderByWithRelationInput | DigitalAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DigitalAccesses.
     */
    cursor?: DigitalAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DigitalAccesses.
     */
    distinct?: DigitalAccessScalarFieldEnum | DigitalAccessScalarFieldEnum[]
  }

  /**
   * DigitalAccess findMany
   */
  export type DigitalAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalAccess
     */
    select?: DigitalAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalAccessInclude<ExtArgs> | null
    /**
     * Filter, which DigitalAccesses to fetch.
     */
    where?: DigitalAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalAccesses to fetch.
     */
    orderBy?: DigitalAccessOrderByWithRelationInput | DigitalAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DigitalAccesses.
     */
    cursor?: DigitalAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalAccesses.
     */
    skip?: number
    distinct?: DigitalAccessScalarFieldEnum | DigitalAccessScalarFieldEnum[]
  }

  /**
   * DigitalAccess create
   */
  export type DigitalAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalAccess
     */
    select?: DigitalAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a DigitalAccess.
     */
    data: XOR<DigitalAccessCreateInput, DigitalAccessUncheckedCreateInput>
  }

  /**
   * DigitalAccess createMany
   */
  export type DigitalAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DigitalAccesses.
     */
    data: DigitalAccessCreateManyInput | DigitalAccessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DigitalAccess createManyAndReturn
   */
  export type DigitalAccessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalAccess
     */
    select?: DigitalAccessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DigitalAccesses.
     */
    data: DigitalAccessCreateManyInput | DigitalAccessCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalAccessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DigitalAccess update
   */
  export type DigitalAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalAccess
     */
    select?: DigitalAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a DigitalAccess.
     */
    data: XOR<DigitalAccessUpdateInput, DigitalAccessUncheckedUpdateInput>
    /**
     * Choose, which DigitalAccess to update.
     */
    where: DigitalAccessWhereUniqueInput
  }

  /**
   * DigitalAccess updateMany
   */
  export type DigitalAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DigitalAccesses.
     */
    data: XOR<DigitalAccessUpdateManyMutationInput, DigitalAccessUncheckedUpdateManyInput>
    /**
     * Filter which DigitalAccesses to update
     */
    where?: DigitalAccessWhereInput
  }

  /**
   * DigitalAccess upsert
   */
  export type DigitalAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalAccess
     */
    select?: DigitalAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the DigitalAccess to update in case it exists.
     */
    where: DigitalAccessWhereUniqueInput
    /**
     * In case the DigitalAccess found by the `where` argument doesn't exist, create a new DigitalAccess with this data.
     */
    create: XOR<DigitalAccessCreateInput, DigitalAccessUncheckedCreateInput>
    /**
     * In case the DigitalAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DigitalAccessUpdateInput, DigitalAccessUncheckedUpdateInput>
  }

  /**
   * DigitalAccess delete
   */
  export type DigitalAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalAccess
     */
    select?: DigitalAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalAccessInclude<ExtArgs> | null
    /**
     * Filter which DigitalAccess to delete.
     */
    where: DigitalAccessWhereUniqueInput
  }

  /**
   * DigitalAccess deleteMany
   */
  export type DigitalAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DigitalAccesses to delete
     */
    where?: DigitalAccessWhereInput
  }

  /**
   * DigitalAccess without action
   */
  export type DigitalAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalAccess
     */
    select?: DigitalAccessSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalAccessInclude<ExtArgs> | null
  }


  /**
   * Model Bundle
   */

  export type AggregateBundle = {
    _count: BundleCountAggregateOutputType | null
    _avg: BundleAvgAggregateOutputType | null
    _sum: BundleSumAggregateOutputType | null
    _min: BundleMinAggregateOutputType | null
    _max: BundleMaxAggregateOutputType | null
  }

  export type BundleAvgAggregateOutputType = {
    price: Decimal | null
  }

  export type BundleSumAggregateOutputType = {
    price: Decimal | null
  }

  export type BundleMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    price: Decimal | null
    vendorId: string | null
    categoryId: string | null
    isFeatured: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BundleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    price: Decimal | null
    vendorId: string | null
    categoryId: string | null
    isFeatured: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BundleCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    price: number
    vendorId: number
    categoryId: number
    images: number
    isFeatured: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BundleAvgAggregateInputType = {
    price?: true
  }

  export type BundleSumAggregateInputType = {
    price?: true
  }

  export type BundleMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    vendorId?: true
    categoryId?: true
    isFeatured?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BundleMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    vendorId?: true
    categoryId?: true
    isFeatured?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BundleCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    vendorId?: true
    categoryId?: true
    images?: true
    isFeatured?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BundleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bundle to aggregate.
     */
    where?: BundleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bundles to fetch.
     */
    orderBy?: BundleOrderByWithRelationInput | BundleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BundleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bundles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bundles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bundles
    **/
    _count?: true | BundleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BundleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BundleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BundleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BundleMaxAggregateInputType
  }

  export type GetBundleAggregateType<T extends BundleAggregateArgs> = {
        [P in keyof T & keyof AggregateBundle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBundle[P]>
      : GetScalarType<T[P], AggregateBundle[P]>
  }




  export type BundleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BundleWhereInput
    orderBy?: BundleOrderByWithAggregationInput | BundleOrderByWithAggregationInput[]
    by: BundleScalarFieldEnum[] | BundleScalarFieldEnum
    having?: BundleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BundleCountAggregateInputType | true
    _avg?: BundleAvgAggregateInputType
    _sum?: BundleSumAggregateInputType
    _min?: BundleMinAggregateInputType
    _max?: BundleMaxAggregateInputType
  }

  export type BundleGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    price: Decimal
    vendorId: string
    categoryId: string
    images: string[]
    isFeatured: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: BundleCountAggregateOutputType | null
    _avg: BundleAvgAggregateOutputType | null
    _sum: BundleSumAggregateOutputType | null
    _min: BundleMinAggregateOutputType | null
    _max: BundleMaxAggregateOutputType | null
  }

  type GetBundleGroupByPayload<T extends BundleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BundleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BundleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BundleGroupByOutputType[P]>
            : GetScalarType<T[P], BundleGroupByOutputType[P]>
        }
      >
    >


  export type BundleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    vendorId?: boolean
    categoryId?: boolean
    images?: boolean
    isFeatured?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    items?: boolean | Bundle$itemsArgs<ExtArgs>
    _count?: boolean | BundleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bundle"]>

  export type BundleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    vendorId?: boolean
    categoryId?: boolean
    images?: boolean
    isFeatured?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bundle"]>

  export type BundleSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    vendorId?: boolean
    categoryId?: boolean
    images?: boolean
    isFeatured?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BundleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    items?: boolean | Bundle$itemsArgs<ExtArgs>
    _count?: boolean | BundleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BundleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $BundlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bundle"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      items: Prisma.$BundleItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      price: Prisma.Decimal
      vendorId: string
      categoryId: string
      images: string[]
      isFeatured: boolean
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bundle"]>
    composites: {}
  }

  type BundleGetPayload<S extends boolean | null | undefined | BundleDefaultArgs> = $Result.GetResult<Prisma.$BundlePayload, S>

  type BundleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BundleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BundleCountAggregateInputType | true
    }

  export interface BundleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bundle'], meta: { name: 'Bundle' } }
    /**
     * Find zero or one Bundle that matches the filter.
     * @param {BundleFindUniqueArgs} args - Arguments to find a Bundle
     * @example
     * // Get one Bundle
     * const bundle = await prisma.bundle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BundleFindUniqueArgs>(args: SelectSubset<T, BundleFindUniqueArgs<ExtArgs>>): Prisma__BundleClient<$Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Bundle that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BundleFindUniqueOrThrowArgs} args - Arguments to find a Bundle
     * @example
     * // Get one Bundle
     * const bundle = await prisma.bundle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BundleFindUniqueOrThrowArgs>(args: SelectSubset<T, BundleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BundleClient<$Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Bundle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleFindFirstArgs} args - Arguments to find a Bundle
     * @example
     * // Get one Bundle
     * const bundle = await prisma.bundle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BundleFindFirstArgs>(args?: SelectSubset<T, BundleFindFirstArgs<ExtArgs>>): Prisma__BundleClient<$Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Bundle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleFindFirstOrThrowArgs} args - Arguments to find a Bundle
     * @example
     * // Get one Bundle
     * const bundle = await prisma.bundle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BundleFindFirstOrThrowArgs>(args?: SelectSubset<T, BundleFindFirstOrThrowArgs<ExtArgs>>): Prisma__BundleClient<$Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bundles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bundles
     * const bundles = await prisma.bundle.findMany()
     * 
     * // Get first 10 Bundles
     * const bundles = await prisma.bundle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bundleWithIdOnly = await prisma.bundle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BundleFindManyArgs>(args?: SelectSubset<T, BundleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Bundle.
     * @param {BundleCreateArgs} args - Arguments to create a Bundle.
     * @example
     * // Create one Bundle
     * const Bundle = await prisma.bundle.create({
     *   data: {
     *     // ... data to create a Bundle
     *   }
     * })
     * 
     */
    create<T extends BundleCreateArgs>(args: SelectSubset<T, BundleCreateArgs<ExtArgs>>): Prisma__BundleClient<$Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bundles.
     * @param {BundleCreateManyArgs} args - Arguments to create many Bundles.
     * @example
     * // Create many Bundles
     * const bundle = await prisma.bundle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BundleCreateManyArgs>(args?: SelectSubset<T, BundleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bundles and returns the data saved in the database.
     * @param {BundleCreateManyAndReturnArgs} args - Arguments to create many Bundles.
     * @example
     * // Create many Bundles
     * const bundle = await prisma.bundle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bundles and only return the `id`
     * const bundleWithIdOnly = await prisma.bundle.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BundleCreateManyAndReturnArgs>(args?: SelectSubset<T, BundleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Bundle.
     * @param {BundleDeleteArgs} args - Arguments to delete one Bundle.
     * @example
     * // Delete one Bundle
     * const Bundle = await prisma.bundle.delete({
     *   where: {
     *     // ... filter to delete one Bundle
     *   }
     * })
     * 
     */
    delete<T extends BundleDeleteArgs>(args: SelectSubset<T, BundleDeleteArgs<ExtArgs>>): Prisma__BundleClient<$Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Bundle.
     * @param {BundleUpdateArgs} args - Arguments to update one Bundle.
     * @example
     * // Update one Bundle
     * const bundle = await prisma.bundle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BundleUpdateArgs>(args: SelectSubset<T, BundleUpdateArgs<ExtArgs>>): Prisma__BundleClient<$Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bundles.
     * @param {BundleDeleteManyArgs} args - Arguments to filter Bundles to delete.
     * @example
     * // Delete a few Bundles
     * const { count } = await prisma.bundle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BundleDeleteManyArgs>(args?: SelectSubset<T, BundleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bundles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bundles
     * const bundle = await prisma.bundle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BundleUpdateManyArgs>(args: SelectSubset<T, BundleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bundle.
     * @param {BundleUpsertArgs} args - Arguments to update or create a Bundle.
     * @example
     * // Update or create a Bundle
     * const bundle = await prisma.bundle.upsert({
     *   create: {
     *     // ... data to create a Bundle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bundle we want to update
     *   }
     * })
     */
    upsert<T extends BundleUpsertArgs>(args: SelectSubset<T, BundleUpsertArgs<ExtArgs>>): Prisma__BundleClient<$Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bundles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleCountArgs} args - Arguments to filter Bundles to count.
     * @example
     * // Count the number of Bundles
     * const count = await prisma.bundle.count({
     *   where: {
     *     // ... the filter for the Bundles we want to count
     *   }
     * })
    **/
    count<T extends BundleCountArgs>(
      args?: Subset<T, BundleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BundleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bundle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BundleAggregateArgs>(args: Subset<T, BundleAggregateArgs>): Prisma.PrismaPromise<GetBundleAggregateType<T>>

    /**
     * Group by Bundle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleGroupByArgs} args - Group by arguments.
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
      T extends BundleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BundleGroupByArgs['orderBy'] }
        : { orderBy?: BundleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BundleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBundleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bundle model
   */
  readonly fields: BundleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bundle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BundleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    items<T extends Bundle$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Bundle$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Bundle model
   */ 
  interface BundleFieldRefs {
    readonly id: FieldRef<"Bundle", 'String'>
    readonly name: FieldRef<"Bundle", 'String'>
    readonly slug: FieldRef<"Bundle", 'String'>
    readonly description: FieldRef<"Bundle", 'String'>
    readonly price: FieldRef<"Bundle", 'Decimal'>
    readonly vendorId: FieldRef<"Bundle", 'String'>
    readonly categoryId: FieldRef<"Bundle", 'String'>
    readonly images: FieldRef<"Bundle", 'String[]'>
    readonly isFeatured: FieldRef<"Bundle", 'Boolean'>
    readonly isActive: FieldRef<"Bundle", 'Boolean'>
    readonly createdAt: FieldRef<"Bundle", 'DateTime'>
    readonly updatedAt: FieldRef<"Bundle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bundle findUnique
   */
  export type BundleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bundle
     */
    select?: BundleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleInclude<ExtArgs> | null
    /**
     * Filter, which Bundle to fetch.
     */
    where: BundleWhereUniqueInput
  }

  /**
   * Bundle findUniqueOrThrow
   */
  export type BundleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bundle
     */
    select?: BundleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleInclude<ExtArgs> | null
    /**
     * Filter, which Bundle to fetch.
     */
    where: BundleWhereUniqueInput
  }

  /**
   * Bundle findFirst
   */
  export type BundleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bundle
     */
    select?: BundleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleInclude<ExtArgs> | null
    /**
     * Filter, which Bundle to fetch.
     */
    where?: BundleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bundles to fetch.
     */
    orderBy?: BundleOrderByWithRelationInput | BundleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bundles.
     */
    cursor?: BundleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bundles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bundles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bundles.
     */
    distinct?: BundleScalarFieldEnum | BundleScalarFieldEnum[]
  }

  /**
   * Bundle findFirstOrThrow
   */
  export type BundleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bundle
     */
    select?: BundleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleInclude<ExtArgs> | null
    /**
     * Filter, which Bundle to fetch.
     */
    where?: BundleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bundles to fetch.
     */
    orderBy?: BundleOrderByWithRelationInput | BundleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bundles.
     */
    cursor?: BundleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bundles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bundles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bundles.
     */
    distinct?: BundleScalarFieldEnum | BundleScalarFieldEnum[]
  }

  /**
   * Bundle findMany
   */
  export type BundleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bundle
     */
    select?: BundleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleInclude<ExtArgs> | null
    /**
     * Filter, which Bundles to fetch.
     */
    where?: BundleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bundles to fetch.
     */
    orderBy?: BundleOrderByWithRelationInput | BundleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bundles.
     */
    cursor?: BundleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bundles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bundles.
     */
    skip?: number
    distinct?: BundleScalarFieldEnum | BundleScalarFieldEnum[]
  }

  /**
   * Bundle create
   */
  export type BundleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bundle
     */
    select?: BundleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleInclude<ExtArgs> | null
    /**
     * The data needed to create a Bundle.
     */
    data: XOR<BundleCreateInput, BundleUncheckedCreateInput>
  }

  /**
   * Bundle createMany
   */
  export type BundleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bundles.
     */
    data: BundleCreateManyInput | BundleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bundle createManyAndReturn
   */
  export type BundleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bundle
     */
    select?: BundleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Bundles.
     */
    data: BundleCreateManyInput | BundleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bundle update
   */
  export type BundleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bundle
     */
    select?: BundleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleInclude<ExtArgs> | null
    /**
     * The data needed to update a Bundle.
     */
    data: XOR<BundleUpdateInput, BundleUncheckedUpdateInput>
    /**
     * Choose, which Bundle to update.
     */
    where: BundleWhereUniqueInput
  }

  /**
   * Bundle updateMany
   */
  export type BundleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bundles.
     */
    data: XOR<BundleUpdateManyMutationInput, BundleUncheckedUpdateManyInput>
    /**
     * Filter which Bundles to update
     */
    where?: BundleWhereInput
  }

  /**
   * Bundle upsert
   */
  export type BundleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bundle
     */
    select?: BundleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleInclude<ExtArgs> | null
    /**
     * The filter to search for the Bundle to update in case it exists.
     */
    where: BundleWhereUniqueInput
    /**
     * In case the Bundle found by the `where` argument doesn't exist, create a new Bundle with this data.
     */
    create: XOR<BundleCreateInput, BundleUncheckedCreateInput>
    /**
     * In case the Bundle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BundleUpdateInput, BundleUncheckedUpdateInput>
  }

  /**
   * Bundle delete
   */
  export type BundleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bundle
     */
    select?: BundleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleInclude<ExtArgs> | null
    /**
     * Filter which Bundle to delete.
     */
    where: BundleWhereUniqueInput
  }

  /**
   * Bundle deleteMany
   */
  export type BundleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bundles to delete
     */
    where?: BundleWhereInput
  }

  /**
   * Bundle.items
   */
  export type Bundle$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemInclude<ExtArgs> | null
    where?: BundleItemWhereInput
    orderBy?: BundleItemOrderByWithRelationInput | BundleItemOrderByWithRelationInput[]
    cursor?: BundleItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BundleItemScalarFieldEnum | BundleItemScalarFieldEnum[]
  }

  /**
   * Bundle without action
   */
  export type BundleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bundle
     */
    select?: BundleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleInclude<ExtArgs> | null
  }


  /**
   * Model BundleItem
   */

  export type AggregateBundleItem = {
    _count: BundleItemCountAggregateOutputType | null
    _avg: BundleItemAvgAggregateOutputType | null
    _sum: BundleItemSumAggregateOutputType | null
    _min: BundleItemMinAggregateOutputType | null
    _max: BundleItemMaxAggregateOutputType | null
  }

  export type BundleItemAvgAggregateOutputType = {
    quantity: number | null
  }

  export type BundleItemSumAggregateOutputType = {
    quantity: number | null
  }

  export type BundleItemMinAggregateOutputType = {
    id: string | null
    bundleId: string | null
    productId: string | null
    quantity: number | null
  }

  export type BundleItemMaxAggregateOutputType = {
    id: string | null
    bundleId: string | null
    productId: string | null
    quantity: number | null
  }

  export type BundleItemCountAggregateOutputType = {
    id: number
    bundleId: number
    productId: number
    quantity: number
    _all: number
  }


  export type BundleItemAvgAggregateInputType = {
    quantity?: true
  }

  export type BundleItemSumAggregateInputType = {
    quantity?: true
  }

  export type BundleItemMinAggregateInputType = {
    id?: true
    bundleId?: true
    productId?: true
    quantity?: true
  }

  export type BundleItemMaxAggregateInputType = {
    id?: true
    bundleId?: true
    productId?: true
    quantity?: true
  }

  export type BundleItemCountAggregateInputType = {
    id?: true
    bundleId?: true
    productId?: true
    quantity?: true
    _all?: true
  }

  export type BundleItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BundleItem to aggregate.
     */
    where?: BundleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BundleItems to fetch.
     */
    orderBy?: BundleItemOrderByWithRelationInput | BundleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BundleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BundleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BundleItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BundleItems
    **/
    _count?: true | BundleItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BundleItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BundleItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BundleItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BundleItemMaxAggregateInputType
  }

  export type GetBundleItemAggregateType<T extends BundleItemAggregateArgs> = {
        [P in keyof T & keyof AggregateBundleItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBundleItem[P]>
      : GetScalarType<T[P], AggregateBundleItem[P]>
  }




  export type BundleItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BundleItemWhereInput
    orderBy?: BundleItemOrderByWithAggregationInput | BundleItemOrderByWithAggregationInput[]
    by: BundleItemScalarFieldEnum[] | BundleItemScalarFieldEnum
    having?: BundleItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BundleItemCountAggregateInputType | true
    _avg?: BundleItemAvgAggregateInputType
    _sum?: BundleItemSumAggregateInputType
    _min?: BundleItemMinAggregateInputType
    _max?: BundleItemMaxAggregateInputType
  }

  export type BundleItemGroupByOutputType = {
    id: string
    bundleId: string
    productId: string
    quantity: number
    _count: BundleItemCountAggregateOutputType | null
    _avg: BundleItemAvgAggregateOutputType | null
    _sum: BundleItemSumAggregateOutputType | null
    _min: BundleItemMinAggregateOutputType | null
    _max: BundleItemMaxAggregateOutputType | null
  }

  type GetBundleItemGroupByPayload<T extends BundleItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BundleItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BundleItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BundleItemGroupByOutputType[P]>
            : GetScalarType<T[P], BundleItemGroupByOutputType[P]>
        }
      >
    >


  export type BundleItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bundleId?: boolean
    productId?: boolean
    quantity?: boolean
    bundle?: boolean | BundleDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bundleItem"]>

  export type BundleItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bundleId?: boolean
    productId?: boolean
    quantity?: boolean
    bundle?: boolean | BundleDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bundleItem"]>

  export type BundleItemSelectScalar = {
    id?: boolean
    bundleId?: boolean
    productId?: boolean
    quantity?: boolean
  }

  export type BundleItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bundle?: boolean | BundleDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type BundleItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bundle?: boolean | BundleDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $BundleItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BundleItem"
    objects: {
      bundle: Prisma.$BundlePayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bundleId: string
      productId: string
      quantity: number
    }, ExtArgs["result"]["bundleItem"]>
    composites: {}
  }

  type BundleItemGetPayload<S extends boolean | null | undefined | BundleItemDefaultArgs> = $Result.GetResult<Prisma.$BundleItemPayload, S>

  type BundleItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BundleItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BundleItemCountAggregateInputType | true
    }

  export interface BundleItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BundleItem'], meta: { name: 'BundleItem' } }
    /**
     * Find zero or one BundleItem that matches the filter.
     * @param {BundleItemFindUniqueArgs} args - Arguments to find a BundleItem
     * @example
     * // Get one BundleItem
     * const bundleItem = await prisma.bundleItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BundleItemFindUniqueArgs>(args: SelectSubset<T, BundleItemFindUniqueArgs<ExtArgs>>): Prisma__BundleItemClient<$Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BundleItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BundleItemFindUniqueOrThrowArgs} args - Arguments to find a BundleItem
     * @example
     * // Get one BundleItem
     * const bundleItem = await prisma.bundleItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BundleItemFindUniqueOrThrowArgs>(args: SelectSubset<T, BundleItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BundleItemClient<$Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BundleItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleItemFindFirstArgs} args - Arguments to find a BundleItem
     * @example
     * // Get one BundleItem
     * const bundleItem = await prisma.bundleItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BundleItemFindFirstArgs>(args?: SelectSubset<T, BundleItemFindFirstArgs<ExtArgs>>): Prisma__BundleItemClient<$Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BundleItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleItemFindFirstOrThrowArgs} args - Arguments to find a BundleItem
     * @example
     * // Get one BundleItem
     * const bundleItem = await prisma.bundleItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BundleItemFindFirstOrThrowArgs>(args?: SelectSubset<T, BundleItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__BundleItemClient<$Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BundleItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BundleItems
     * const bundleItems = await prisma.bundleItem.findMany()
     * 
     * // Get first 10 BundleItems
     * const bundleItems = await prisma.bundleItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bundleItemWithIdOnly = await prisma.bundleItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BundleItemFindManyArgs>(args?: SelectSubset<T, BundleItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BundleItem.
     * @param {BundleItemCreateArgs} args - Arguments to create a BundleItem.
     * @example
     * // Create one BundleItem
     * const BundleItem = await prisma.bundleItem.create({
     *   data: {
     *     // ... data to create a BundleItem
     *   }
     * })
     * 
     */
    create<T extends BundleItemCreateArgs>(args: SelectSubset<T, BundleItemCreateArgs<ExtArgs>>): Prisma__BundleItemClient<$Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BundleItems.
     * @param {BundleItemCreateManyArgs} args - Arguments to create many BundleItems.
     * @example
     * // Create many BundleItems
     * const bundleItem = await prisma.bundleItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BundleItemCreateManyArgs>(args?: SelectSubset<T, BundleItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BundleItems and returns the data saved in the database.
     * @param {BundleItemCreateManyAndReturnArgs} args - Arguments to create many BundleItems.
     * @example
     * // Create many BundleItems
     * const bundleItem = await prisma.bundleItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BundleItems and only return the `id`
     * const bundleItemWithIdOnly = await prisma.bundleItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BundleItemCreateManyAndReturnArgs>(args?: SelectSubset<T, BundleItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BundleItem.
     * @param {BundleItemDeleteArgs} args - Arguments to delete one BundleItem.
     * @example
     * // Delete one BundleItem
     * const BundleItem = await prisma.bundleItem.delete({
     *   where: {
     *     // ... filter to delete one BundleItem
     *   }
     * })
     * 
     */
    delete<T extends BundleItemDeleteArgs>(args: SelectSubset<T, BundleItemDeleteArgs<ExtArgs>>): Prisma__BundleItemClient<$Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BundleItem.
     * @param {BundleItemUpdateArgs} args - Arguments to update one BundleItem.
     * @example
     * // Update one BundleItem
     * const bundleItem = await prisma.bundleItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BundleItemUpdateArgs>(args: SelectSubset<T, BundleItemUpdateArgs<ExtArgs>>): Prisma__BundleItemClient<$Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BundleItems.
     * @param {BundleItemDeleteManyArgs} args - Arguments to filter BundleItems to delete.
     * @example
     * // Delete a few BundleItems
     * const { count } = await prisma.bundleItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BundleItemDeleteManyArgs>(args?: SelectSubset<T, BundleItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BundleItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BundleItems
     * const bundleItem = await prisma.bundleItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BundleItemUpdateManyArgs>(args: SelectSubset<T, BundleItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BundleItem.
     * @param {BundleItemUpsertArgs} args - Arguments to update or create a BundleItem.
     * @example
     * // Update or create a BundleItem
     * const bundleItem = await prisma.bundleItem.upsert({
     *   create: {
     *     // ... data to create a BundleItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BundleItem we want to update
     *   }
     * })
     */
    upsert<T extends BundleItemUpsertArgs>(args: SelectSubset<T, BundleItemUpsertArgs<ExtArgs>>): Prisma__BundleItemClient<$Result.GetResult<Prisma.$BundleItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BundleItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleItemCountArgs} args - Arguments to filter BundleItems to count.
     * @example
     * // Count the number of BundleItems
     * const count = await prisma.bundleItem.count({
     *   where: {
     *     // ... the filter for the BundleItems we want to count
     *   }
     * })
    **/
    count<T extends BundleItemCountArgs>(
      args?: Subset<T, BundleItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BundleItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BundleItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BundleItemAggregateArgs>(args: Subset<T, BundleItemAggregateArgs>): Prisma.PrismaPromise<GetBundleItemAggregateType<T>>

    /**
     * Group by BundleItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BundleItemGroupByArgs} args - Group by arguments.
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
      T extends BundleItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BundleItemGroupByArgs['orderBy'] }
        : { orderBy?: BundleItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BundleItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBundleItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BundleItem model
   */
  readonly fields: BundleItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BundleItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BundleItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bundle<T extends BundleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BundleDefaultArgs<ExtArgs>>): Prisma__BundleClient<$Result.GetResult<Prisma.$BundlePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the BundleItem model
   */ 
  interface BundleItemFieldRefs {
    readonly id: FieldRef<"BundleItem", 'String'>
    readonly bundleId: FieldRef<"BundleItem", 'String'>
    readonly productId: FieldRef<"BundleItem", 'String'>
    readonly quantity: FieldRef<"BundleItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BundleItem findUnique
   */
  export type BundleItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemInclude<ExtArgs> | null
    /**
     * Filter, which BundleItem to fetch.
     */
    where: BundleItemWhereUniqueInput
  }

  /**
   * BundleItem findUniqueOrThrow
   */
  export type BundleItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemInclude<ExtArgs> | null
    /**
     * Filter, which BundleItem to fetch.
     */
    where: BundleItemWhereUniqueInput
  }

  /**
   * BundleItem findFirst
   */
  export type BundleItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemInclude<ExtArgs> | null
    /**
     * Filter, which BundleItem to fetch.
     */
    where?: BundleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BundleItems to fetch.
     */
    orderBy?: BundleItemOrderByWithRelationInput | BundleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BundleItems.
     */
    cursor?: BundleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BundleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BundleItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BundleItems.
     */
    distinct?: BundleItemScalarFieldEnum | BundleItemScalarFieldEnum[]
  }

  /**
   * BundleItem findFirstOrThrow
   */
  export type BundleItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemInclude<ExtArgs> | null
    /**
     * Filter, which BundleItem to fetch.
     */
    where?: BundleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BundleItems to fetch.
     */
    orderBy?: BundleItemOrderByWithRelationInput | BundleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BundleItems.
     */
    cursor?: BundleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BundleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BundleItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BundleItems.
     */
    distinct?: BundleItemScalarFieldEnum | BundleItemScalarFieldEnum[]
  }

  /**
   * BundleItem findMany
   */
  export type BundleItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemInclude<ExtArgs> | null
    /**
     * Filter, which BundleItems to fetch.
     */
    where?: BundleItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BundleItems to fetch.
     */
    orderBy?: BundleItemOrderByWithRelationInput | BundleItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BundleItems.
     */
    cursor?: BundleItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BundleItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BundleItems.
     */
    skip?: number
    distinct?: BundleItemScalarFieldEnum | BundleItemScalarFieldEnum[]
  }

  /**
   * BundleItem create
   */
  export type BundleItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemInclude<ExtArgs> | null
    /**
     * The data needed to create a BundleItem.
     */
    data: XOR<BundleItemCreateInput, BundleItemUncheckedCreateInput>
  }

  /**
   * BundleItem createMany
   */
  export type BundleItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BundleItems.
     */
    data: BundleItemCreateManyInput | BundleItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BundleItem createManyAndReturn
   */
  export type BundleItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BundleItems.
     */
    data: BundleItemCreateManyInput | BundleItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BundleItem update
   */
  export type BundleItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemInclude<ExtArgs> | null
    /**
     * The data needed to update a BundleItem.
     */
    data: XOR<BundleItemUpdateInput, BundleItemUncheckedUpdateInput>
    /**
     * Choose, which BundleItem to update.
     */
    where: BundleItemWhereUniqueInput
  }

  /**
   * BundleItem updateMany
   */
  export type BundleItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BundleItems.
     */
    data: XOR<BundleItemUpdateManyMutationInput, BundleItemUncheckedUpdateManyInput>
    /**
     * Filter which BundleItems to update
     */
    where?: BundleItemWhereInput
  }

  /**
   * BundleItem upsert
   */
  export type BundleItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemInclude<ExtArgs> | null
    /**
     * The filter to search for the BundleItem to update in case it exists.
     */
    where: BundleItemWhereUniqueInput
    /**
     * In case the BundleItem found by the `where` argument doesn't exist, create a new BundleItem with this data.
     */
    create: XOR<BundleItemCreateInput, BundleItemUncheckedCreateInput>
    /**
     * In case the BundleItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BundleItemUpdateInput, BundleItemUncheckedUpdateInput>
  }

  /**
   * BundleItem delete
   */
  export type BundleItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemInclude<ExtArgs> | null
    /**
     * Filter which BundleItem to delete.
     */
    where: BundleItemWhereUniqueInput
  }

  /**
   * BundleItem deleteMany
   */
  export type BundleItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BundleItems to delete
     */
    where?: BundleItemWhereInput
  }

  /**
   * BundleItem without action
   */
  export type BundleItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BundleItem
     */
    select?: BundleItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BundleItemInclude<ExtArgs> | null
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


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    parentId: 'parentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    price: 'price',
    sku: 'sku',
    stockQuantity: 'stockQuantity',
    vendorId: 'vendorId',
    categoryId: 'categoryId',
    images: 'images',
    isFeatured: 'isFeatured',
    productType: 'productType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const DigitalFileScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    fileKey: 'fileKey',
    fileName: 'fileName',
    fileSize: 'fileSize',
    mimeType: 'mimeType',
    maxDownloads: 'maxDownloads',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DigitalFileScalarFieldEnum = (typeof DigitalFileScalarFieldEnum)[keyof typeof DigitalFileScalarFieldEnum]


  export const DigitalLicenseScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DigitalLicenseScalarFieldEnum = (typeof DigitalLicenseScalarFieldEnum)[keyof typeof DigitalLicenseScalarFieldEnum]


  export const LicenseKeyScalarFieldEnum: {
    id: 'id',
    digitalLicenseId: 'digitalLicenseId',
    key: 'key',
    isRedeemed: 'isRedeemed',
    redeemedAt: 'redeemedAt',
    redeemedBy: 'redeemedBy',
    createdAt: 'createdAt'
  };

  export type LicenseKeyScalarFieldEnum = (typeof LicenseKeyScalarFieldEnum)[keyof typeof LicenseKeyScalarFieldEnum]


  export const DigitalAccessScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    accessDurationDays: 'accessDurationDays',
    accessUrl: 'accessUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DigitalAccessScalarFieldEnum = (typeof DigitalAccessScalarFieldEnum)[keyof typeof DigitalAccessScalarFieldEnum]


  export const BundleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    price: 'price',
    vendorId: 'vendorId',
    categoryId: 'categoryId',
    images: 'images',
    isFeatured: 'isFeatured',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BundleScalarFieldEnum = (typeof BundleScalarFieldEnum)[keyof typeof BundleScalarFieldEnum]


  export const BundleItemScalarFieldEnum: {
    id: 'id',
    bundleId: 'bundleId',
    productId: 'productId',
    quantity: 'quantity'
  };

  export type BundleItemScalarFieldEnum = (typeof BundleItemScalarFieldEnum)[keyof typeof BundleItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ProductType'
   */
  export type EnumProductTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductType'>
    


  /**
   * Reference to a field of type 'ProductType[]'
   */
  export type ListEnumProductTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductType[]'>
    


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


  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    parentId?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    parent?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    products?: ProductListRelationFilter
    bundles?: BundleListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parent?: CategoryOrderByWithRelationInput
    children?: CategoryOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
    bundles?: BundleOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    parentId?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    parent?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    products?: ProductListRelationFilter
    bundles?: BundleListRelationFilter
  }, "id" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    slug?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    parentId?: StringNullableWithAggregatesFilter<"Category"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    sku?: StringFilter<"Product"> | string
    stockQuantity?: IntFilter<"Product"> | number
    vendorId?: StringFilter<"Product"> | string
    categoryId?: StringFilter<"Product"> | string
    images?: StringNullableListFilter<"Product">
    isFeatured?: BoolFilter<"Product"> | boolean
    productType?: EnumProductTypeFilter<"Product"> | $Enums.ProductType
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    digitalFile?: XOR<DigitalFileNullableRelationFilter, DigitalFileWhereInput> | null
    digitalLicense?: XOR<DigitalLicenseNullableRelationFilter, DigitalLicenseWhereInput> | null
    digitalAccess?: XOR<DigitalAccessNullableRelationFilter, DigitalAccessWhereInput> | null
    bundleItems?: BundleItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    sku?: SortOrder
    stockQuantity?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    images?: SortOrder
    isFeatured?: SortOrder
    productType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    digitalFile?: DigitalFileOrderByWithRelationInput
    digitalLicense?: DigitalLicenseOrderByWithRelationInput
    digitalAccess?: DigitalAccessOrderByWithRelationInput
    bundleItems?: BundleItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    sku?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    stockQuantity?: IntFilter<"Product"> | number
    vendorId?: StringFilter<"Product"> | string
    categoryId?: StringFilter<"Product"> | string
    images?: StringNullableListFilter<"Product">
    isFeatured?: BoolFilter<"Product"> | boolean
    productType?: EnumProductTypeFilter<"Product"> | $Enums.ProductType
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    digitalFile?: XOR<DigitalFileNullableRelationFilter, DigitalFileWhereInput> | null
    digitalLicense?: XOR<DigitalLicenseNullableRelationFilter, DigitalLicenseWhereInput> | null
    digitalAccess?: XOR<DigitalAccessNullableRelationFilter, DigitalAccessWhereInput> | null
    bundleItems?: BundleItemListRelationFilter
  }, "id" | "slug" | "sku">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    sku?: SortOrder
    stockQuantity?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    images?: SortOrder
    isFeatured?: SortOrder
    productType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    slug?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    price?: DecimalWithAggregatesFilter<"Product"> | Decimal | DecimalJsLike | number | string
    sku?: StringWithAggregatesFilter<"Product"> | string
    stockQuantity?: IntWithAggregatesFilter<"Product"> | number
    vendorId?: StringWithAggregatesFilter<"Product"> | string
    categoryId?: StringWithAggregatesFilter<"Product"> | string
    images?: StringNullableListFilter<"Product">
    isFeatured?: BoolWithAggregatesFilter<"Product"> | boolean
    productType?: EnumProductTypeWithAggregatesFilter<"Product"> | $Enums.ProductType
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type DigitalFileWhereInput = {
    AND?: DigitalFileWhereInput | DigitalFileWhereInput[]
    OR?: DigitalFileWhereInput[]
    NOT?: DigitalFileWhereInput | DigitalFileWhereInput[]
    id?: StringFilter<"DigitalFile"> | string
    productId?: StringFilter<"DigitalFile"> | string
    fileKey?: StringFilter<"DigitalFile"> | string
    fileName?: StringFilter<"DigitalFile"> | string
    fileSize?: IntFilter<"DigitalFile"> | number
    mimeType?: StringFilter<"DigitalFile"> | string
    maxDownloads?: IntFilter<"DigitalFile"> | number
    createdAt?: DateTimeFilter<"DigitalFile"> | Date | string
    updatedAt?: DateTimeFilter<"DigitalFile"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type DigitalFileOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    fileKey?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    maxDownloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type DigitalFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    productId?: string
    AND?: DigitalFileWhereInput | DigitalFileWhereInput[]
    OR?: DigitalFileWhereInput[]
    NOT?: DigitalFileWhereInput | DigitalFileWhereInput[]
    fileKey?: StringFilter<"DigitalFile"> | string
    fileName?: StringFilter<"DigitalFile"> | string
    fileSize?: IntFilter<"DigitalFile"> | number
    mimeType?: StringFilter<"DigitalFile"> | string
    maxDownloads?: IntFilter<"DigitalFile"> | number
    createdAt?: DateTimeFilter<"DigitalFile"> | Date | string
    updatedAt?: DateTimeFilter<"DigitalFile"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "id" | "productId">

  export type DigitalFileOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    fileKey?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    maxDownloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DigitalFileCountOrderByAggregateInput
    _avg?: DigitalFileAvgOrderByAggregateInput
    _max?: DigitalFileMaxOrderByAggregateInput
    _min?: DigitalFileMinOrderByAggregateInput
    _sum?: DigitalFileSumOrderByAggregateInput
  }

  export type DigitalFileScalarWhereWithAggregatesInput = {
    AND?: DigitalFileScalarWhereWithAggregatesInput | DigitalFileScalarWhereWithAggregatesInput[]
    OR?: DigitalFileScalarWhereWithAggregatesInput[]
    NOT?: DigitalFileScalarWhereWithAggregatesInput | DigitalFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DigitalFile"> | string
    productId?: StringWithAggregatesFilter<"DigitalFile"> | string
    fileKey?: StringWithAggregatesFilter<"DigitalFile"> | string
    fileName?: StringWithAggregatesFilter<"DigitalFile"> | string
    fileSize?: IntWithAggregatesFilter<"DigitalFile"> | number
    mimeType?: StringWithAggregatesFilter<"DigitalFile"> | string
    maxDownloads?: IntWithAggregatesFilter<"DigitalFile"> | number
    createdAt?: DateTimeWithAggregatesFilter<"DigitalFile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DigitalFile"> | Date | string
  }

  export type DigitalLicenseWhereInput = {
    AND?: DigitalLicenseWhereInput | DigitalLicenseWhereInput[]
    OR?: DigitalLicenseWhereInput[]
    NOT?: DigitalLicenseWhereInput | DigitalLicenseWhereInput[]
    id?: StringFilter<"DigitalLicense"> | string
    productId?: StringFilter<"DigitalLicense"> | string
    createdAt?: DateTimeFilter<"DigitalLicense"> | Date | string
    updatedAt?: DateTimeFilter<"DigitalLicense"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    keys?: LicenseKeyListRelationFilter
  }

  export type DigitalLicenseOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    keys?: LicenseKeyOrderByRelationAggregateInput
  }

  export type DigitalLicenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    productId?: string
    AND?: DigitalLicenseWhereInput | DigitalLicenseWhereInput[]
    OR?: DigitalLicenseWhereInput[]
    NOT?: DigitalLicenseWhereInput | DigitalLicenseWhereInput[]
    createdAt?: DateTimeFilter<"DigitalLicense"> | Date | string
    updatedAt?: DateTimeFilter<"DigitalLicense"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    keys?: LicenseKeyListRelationFilter
  }, "id" | "productId">

  export type DigitalLicenseOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DigitalLicenseCountOrderByAggregateInput
    _max?: DigitalLicenseMaxOrderByAggregateInput
    _min?: DigitalLicenseMinOrderByAggregateInput
  }

  export type DigitalLicenseScalarWhereWithAggregatesInput = {
    AND?: DigitalLicenseScalarWhereWithAggregatesInput | DigitalLicenseScalarWhereWithAggregatesInput[]
    OR?: DigitalLicenseScalarWhereWithAggregatesInput[]
    NOT?: DigitalLicenseScalarWhereWithAggregatesInput | DigitalLicenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DigitalLicense"> | string
    productId?: StringWithAggregatesFilter<"DigitalLicense"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DigitalLicense"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DigitalLicense"> | Date | string
  }

  export type LicenseKeyWhereInput = {
    AND?: LicenseKeyWhereInput | LicenseKeyWhereInput[]
    OR?: LicenseKeyWhereInput[]
    NOT?: LicenseKeyWhereInput | LicenseKeyWhereInput[]
    id?: StringFilter<"LicenseKey"> | string
    digitalLicenseId?: StringFilter<"LicenseKey"> | string
    key?: StringFilter<"LicenseKey"> | string
    isRedeemed?: BoolFilter<"LicenseKey"> | boolean
    redeemedAt?: DateTimeNullableFilter<"LicenseKey"> | Date | string | null
    redeemedBy?: StringNullableFilter<"LicenseKey"> | string | null
    createdAt?: DateTimeFilter<"LicenseKey"> | Date | string
    digitalLicense?: XOR<DigitalLicenseRelationFilter, DigitalLicenseWhereInput>
  }

  export type LicenseKeyOrderByWithRelationInput = {
    id?: SortOrder
    digitalLicenseId?: SortOrder
    key?: SortOrder
    isRedeemed?: SortOrder
    redeemedAt?: SortOrderInput | SortOrder
    redeemedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    digitalLicense?: DigitalLicenseOrderByWithRelationInput
  }

  export type LicenseKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LicenseKeyWhereInput | LicenseKeyWhereInput[]
    OR?: LicenseKeyWhereInput[]
    NOT?: LicenseKeyWhereInput | LicenseKeyWhereInput[]
    digitalLicenseId?: StringFilter<"LicenseKey"> | string
    key?: StringFilter<"LicenseKey"> | string
    isRedeemed?: BoolFilter<"LicenseKey"> | boolean
    redeemedAt?: DateTimeNullableFilter<"LicenseKey"> | Date | string | null
    redeemedBy?: StringNullableFilter<"LicenseKey"> | string | null
    createdAt?: DateTimeFilter<"LicenseKey"> | Date | string
    digitalLicense?: XOR<DigitalLicenseRelationFilter, DigitalLicenseWhereInput>
  }, "id">

  export type LicenseKeyOrderByWithAggregationInput = {
    id?: SortOrder
    digitalLicenseId?: SortOrder
    key?: SortOrder
    isRedeemed?: SortOrder
    redeemedAt?: SortOrderInput | SortOrder
    redeemedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LicenseKeyCountOrderByAggregateInput
    _max?: LicenseKeyMaxOrderByAggregateInput
    _min?: LicenseKeyMinOrderByAggregateInput
  }

  export type LicenseKeyScalarWhereWithAggregatesInput = {
    AND?: LicenseKeyScalarWhereWithAggregatesInput | LicenseKeyScalarWhereWithAggregatesInput[]
    OR?: LicenseKeyScalarWhereWithAggregatesInput[]
    NOT?: LicenseKeyScalarWhereWithAggregatesInput | LicenseKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LicenseKey"> | string
    digitalLicenseId?: StringWithAggregatesFilter<"LicenseKey"> | string
    key?: StringWithAggregatesFilter<"LicenseKey"> | string
    isRedeemed?: BoolWithAggregatesFilter<"LicenseKey"> | boolean
    redeemedAt?: DateTimeNullableWithAggregatesFilter<"LicenseKey"> | Date | string | null
    redeemedBy?: StringNullableWithAggregatesFilter<"LicenseKey"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LicenseKey"> | Date | string
  }

  export type DigitalAccessWhereInput = {
    AND?: DigitalAccessWhereInput | DigitalAccessWhereInput[]
    OR?: DigitalAccessWhereInput[]
    NOT?: DigitalAccessWhereInput | DigitalAccessWhereInput[]
    id?: StringFilter<"DigitalAccess"> | string
    productId?: StringFilter<"DigitalAccess"> | string
    accessDurationDays?: IntFilter<"DigitalAccess"> | number
    accessUrl?: StringNullableFilter<"DigitalAccess"> | string | null
    createdAt?: DateTimeFilter<"DigitalAccess"> | Date | string
    updatedAt?: DateTimeFilter<"DigitalAccess"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type DigitalAccessOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    accessDurationDays?: SortOrder
    accessUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type DigitalAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    productId?: string
    AND?: DigitalAccessWhereInput | DigitalAccessWhereInput[]
    OR?: DigitalAccessWhereInput[]
    NOT?: DigitalAccessWhereInput | DigitalAccessWhereInput[]
    accessDurationDays?: IntFilter<"DigitalAccess"> | number
    accessUrl?: StringNullableFilter<"DigitalAccess"> | string | null
    createdAt?: DateTimeFilter<"DigitalAccess"> | Date | string
    updatedAt?: DateTimeFilter<"DigitalAccess"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "id" | "productId">

  export type DigitalAccessOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    accessDurationDays?: SortOrder
    accessUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DigitalAccessCountOrderByAggregateInput
    _avg?: DigitalAccessAvgOrderByAggregateInput
    _max?: DigitalAccessMaxOrderByAggregateInput
    _min?: DigitalAccessMinOrderByAggregateInput
    _sum?: DigitalAccessSumOrderByAggregateInput
  }

  export type DigitalAccessScalarWhereWithAggregatesInput = {
    AND?: DigitalAccessScalarWhereWithAggregatesInput | DigitalAccessScalarWhereWithAggregatesInput[]
    OR?: DigitalAccessScalarWhereWithAggregatesInput[]
    NOT?: DigitalAccessScalarWhereWithAggregatesInput | DigitalAccessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DigitalAccess"> | string
    productId?: StringWithAggregatesFilter<"DigitalAccess"> | string
    accessDurationDays?: IntWithAggregatesFilter<"DigitalAccess"> | number
    accessUrl?: StringNullableWithAggregatesFilter<"DigitalAccess"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DigitalAccess"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DigitalAccess"> | Date | string
  }

  export type BundleWhereInput = {
    AND?: BundleWhereInput | BundleWhereInput[]
    OR?: BundleWhereInput[]
    NOT?: BundleWhereInput | BundleWhereInput[]
    id?: StringFilter<"Bundle"> | string
    name?: StringFilter<"Bundle"> | string
    slug?: StringFilter<"Bundle"> | string
    description?: StringNullableFilter<"Bundle"> | string | null
    price?: DecimalFilter<"Bundle"> | Decimal | DecimalJsLike | number | string
    vendorId?: StringFilter<"Bundle"> | string
    categoryId?: StringFilter<"Bundle"> | string
    images?: StringNullableListFilter<"Bundle">
    isFeatured?: BoolFilter<"Bundle"> | boolean
    isActive?: BoolFilter<"Bundle"> | boolean
    createdAt?: DateTimeFilter<"Bundle"> | Date | string
    updatedAt?: DateTimeFilter<"Bundle"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    items?: BundleItemListRelationFilter
  }

  export type BundleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    images?: SortOrder
    isFeatured?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    items?: BundleItemOrderByRelationAggregateInput
  }

  export type BundleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: BundleWhereInput | BundleWhereInput[]
    OR?: BundleWhereInput[]
    NOT?: BundleWhereInput | BundleWhereInput[]
    name?: StringFilter<"Bundle"> | string
    description?: StringNullableFilter<"Bundle"> | string | null
    price?: DecimalFilter<"Bundle"> | Decimal | DecimalJsLike | number | string
    vendorId?: StringFilter<"Bundle"> | string
    categoryId?: StringFilter<"Bundle"> | string
    images?: StringNullableListFilter<"Bundle">
    isFeatured?: BoolFilter<"Bundle"> | boolean
    isActive?: BoolFilter<"Bundle"> | boolean
    createdAt?: DateTimeFilter<"Bundle"> | Date | string
    updatedAt?: DateTimeFilter<"Bundle"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    items?: BundleItemListRelationFilter
  }, "id" | "slug">

  export type BundleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    images?: SortOrder
    isFeatured?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BundleCountOrderByAggregateInput
    _avg?: BundleAvgOrderByAggregateInput
    _max?: BundleMaxOrderByAggregateInput
    _min?: BundleMinOrderByAggregateInput
    _sum?: BundleSumOrderByAggregateInput
  }

  export type BundleScalarWhereWithAggregatesInput = {
    AND?: BundleScalarWhereWithAggregatesInput | BundleScalarWhereWithAggregatesInput[]
    OR?: BundleScalarWhereWithAggregatesInput[]
    NOT?: BundleScalarWhereWithAggregatesInput | BundleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bundle"> | string
    name?: StringWithAggregatesFilter<"Bundle"> | string
    slug?: StringWithAggregatesFilter<"Bundle"> | string
    description?: StringNullableWithAggregatesFilter<"Bundle"> | string | null
    price?: DecimalWithAggregatesFilter<"Bundle"> | Decimal | DecimalJsLike | number | string
    vendorId?: StringWithAggregatesFilter<"Bundle"> | string
    categoryId?: StringWithAggregatesFilter<"Bundle"> | string
    images?: StringNullableListFilter<"Bundle">
    isFeatured?: BoolWithAggregatesFilter<"Bundle"> | boolean
    isActive?: BoolWithAggregatesFilter<"Bundle"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Bundle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bundle"> | Date | string
  }

  export type BundleItemWhereInput = {
    AND?: BundleItemWhereInput | BundleItemWhereInput[]
    OR?: BundleItemWhereInput[]
    NOT?: BundleItemWhereInput | BundleItemWhereInput[]
    id?: StringFilter<"BundleItem"> | string
    bundleId?: StringFilter<"BundleItem"> | string
    productId?: StringFilter<"BundleItem"> | string
    quantity?: IntFilter<"BundleItem"> | number
    bundle?: XOR<BundleRelationFilter, BundleWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type BundleItemOrderByWithRelationInput = {
    id?: SortOrder
    bundleId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    bundle?: BundleOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type BundleItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bundleId_productId?: BundleItemBundleIdProductIdCompoundUniqueInput
    AND?: BundleItemWhereInput | BundleItemWhereInput[]
    OR?: BundleItemWhereInput[]
    NOT?: BundleItemWhereInput | BundleItemWhereInput[]
    bundleId?: StringFilter<"BundleItem"> | string
    productId?: StringFilter<"BundleItem"> | string
    quantity?: IntFilter<"BundleItem"> | number
    bundle?: XOR<BundleRelationFilter, BundleWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "id" | "bundleId_productId">

  export type BundleItemOrderByWithAggregationInput = {
    id?: SortOrder
    bundleId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    _count?: BundleItemCountOrderByAggregateInput
    _avg?: BundleItemAvgOrderByAggregateInput
    _max?: BundleItemMaxOrderByAggregateInput
    _min?: BundleItemMinOrderByAggregateInput
    _sum?: BundleItemSumOrderByAggregateInput
  }

  export type BundleItemScalarWhereWithAggregatesInput = {
    AND?: BundleItemScalarWhereWithAggregatesInput | BundleItemScalarWhereWithAggregatesInput[]
    OR?: BundleItemScalarWhereWithAggregatesInput[]
    NOT?: BundleItemScalarWhereWithAggregatesInput | BundleItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BundleItem"> | string
    bundleId?: StringWithAggregatesFilter<"BundleItem"> | string
    productId?: StringWithAggregatesFilter<"BundleItem"> | string
    quantity?: IntWithAggregatesFilter<"BundleItem"> | number
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
    products?: ProductCreateNestedManyWithoutCategoryInput
    bundles?: BundleCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
    bundles?: BundleUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
    bundles?: BundleUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
    bundles?: BundleUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    digitalFile?: DigitalFileCreateNestedOneWithoutProductInput
    digitalLicense?: DigitalLicenseCreateNestedOneWithoutProductInput
    digitalAccess?: DigitalAccessCreateNestedOneWithoutProductInput
    bundleItems?: BundleItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    categoryId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
    digitalFile?: DigitalFileUncheckedCreateNestedOneWithoutProductInput
    digitalLicense?: DigitalLicenseUncheckedCreateNestedOneWithoutProductInput
    digitalAccess?: DigitalAccessUncheckedCreateNestedOneWithoutProductInput
    bundleItems?: BundleItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    digitalFile?: DigitalFileUpdateOneWithoutProductNestedInput
    digitalLicense?: DigitalLicenseUpdateOneWithoutProductNestedInput
    digitalAccess?: DigitalAccessUpdateOneWithoutProductNestedInput
    bundleItems?: BundleItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    digitalFile?: DigitalFileUncheckedUpdateOneWithoutProductNestedInput
    digitalLicense?: DigitalLicenseUncheckedUpdateOneWithoutProductNestedInput
    digitalAccess?: DigitalAccessUncheckedUpdateOneWithoutProductNestedInput
    bundleItems?: BundleItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    categoryId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalFileCreateInput = {
    id?: string
    fileKey: string
    fileName: string
    fileSize: number
    mimeType: string
    maxDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutDigitalFileInput
  }

  export type DigitalFileUncheckedCreateInput = {
    id?: string
    productId: string
    fileKey: string
    fileName: string
    fileSize: number
    mimeType: string
    maxDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    maxDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutDigitalFileNestedInput
  }

  export type DigitalFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    maxDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalFileCreateManyInput = {
    id?: string
    productId: string
    fileKey: string
    fileName: string
    fileSize: number
    mimeType: string
    maxDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    maxDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    maxDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalLicenseCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutDigitalLicenseInput
    keys?: LicenseKeyCreateNestedManyWithoutDigitalLicenseInput
  }

  export type DigitalLicenseUncheckedCreateInput = {
    id?: string
    productId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    keys?: LicenseKeyUncheckedCreateNestedManyWithoutDigitalLicenseInput
  }

  export type DigitalLicenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutDigitalLicenseNestedInput
    keys?: LicenseKeyUpdateManyWithoutDigitalLicenseNestedInput
  }

  export type DigitalLicenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    keys?: LicenseKeyUncheckedUpdateManyWithoutDigitalLicenseNestedInput
  }

  export type DigitalLicenseCreateManyInput = {
    id?: string
    productId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalLicenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalLicenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LicenseKeyCreateInput = {
    id?: string
    key: string
    isRedeemed?: boolean
    redeemedAt?: Date | string | null
    redeemedBy?: string | null
    createdAt?: Date | string
    digitalLicense: DigitalLicenseCreateNestedOneWithoutKeysInput
  }

  export type LicenseKeyUncheckedCreateInput = {
    id?: string
    digitalLicenseId: string
    key: string
    isRedeemed?: boolean
    redeemedAt?: Date | string | null
    redeemedBy?: string | null
    createdAt?: Date | string
  }

  export type LicenseKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    isRedeemed?: BoolFieldUpdateOperationsInput | boolean
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    digitalLicense?: DigitalLicenseUpdateOneRequiredWithoutKeysNestedInput
  }

  export type LicenseKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    digitalLicenseId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    isRedeemed?: BoolFieldUpdateOperationsInput | boolean
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LicenseKeyCreateManyInput = {
    id?: string
    digitalLicenseId: string
    key: string
    isRedeemed?: boolean
    redeemedAt?: Date | string | null
    redeemedBy?: string | null
    createdAt?: Date | string
  }

  export type LicenseKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    isRedeemed?: BoolFieldUpdateOperationsInput | boolean
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LicenseKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    digitalLicenseId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    isRedeemed?: BoolFieldUpdateOperationsInput | boolean
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalAccessCreateInput = {
    id?: string
    accessDurationDays: number
    accessUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutDigitalAccessInput
  }

  export type DigitalAccessUncheckedCreateInput = {
    id?: string
    productId: string
    accessDurationDays: number
    accessUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalAccessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessDurationDays?: IntFieldUpdateOperationsInput | number
    accessUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutDigitalAccessNestedInput
  }

  export type DigitalAccessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    accessDurationDays?: IntFieldUpdateOperationsInput | number
    accessUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalAccessCreateManyInput = {
    id?: string
    productId: string
    accessDurationDays: number
    accessUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalAccessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessDurationDays?: IntFieldUpdateOperationsInput | number
    accessUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalAccessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    accessDurationDays?: IntFieldUpdateOperationsInput | number
    accessUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BundleCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    vendorId: string
    images?: BundleCreateimagesInput | string[]
    isFeatured?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutBundlesInput
    items?: BundleItemCreateNestedManyWithoutBundleInput
  }

  export type BundleUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    vendorId: string
    categoryId: string
    images?: BundleCreateimagesInput | string[]
    isFeatured?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: BundleItemUncheckedCreateNestedManyWithoutBundleInput
  }

  export type BundleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: BundleUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutBundlesNestedInput
    items?: BundleItemUpdateManyWithoutBundleNestedInput
  }

  export type BundleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vendorId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    images?: BundleUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: BundleItemUncheckedUpdateManyWithoutBundleNestedInput
  }

  export type BundleCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    vendorId: string
    categoryId: string
    images?: BundleCreateimagesInput | string[]
    isFeatured?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BundleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: BundleUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BundleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vendorId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    images?: BundleUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BundleItemCreateInput = {
    id?: string
    quantity?: number
    bundle: BundleCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutBundleItemsInput
  }

  export type BundleItemUncheckedCreateInput = {
    id?: string
    bundleId: string
    productId: string
    quantity?: number
  }

  export type BundleItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    bundle?: BundleUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutBundleItemsNestedInput
  }

  export type BundleItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type BundleItemCreateManyInput = {
    id?: string
    bundleId: string
    productId: string
    quantity?: number
  }

  export type BundleItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type BundleItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
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

  export type CategoryNullableRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type BundleListRelationFilter = {
    every?: BundleWhereInput
    some?: BundleWhereInput
    none?: BundleWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BundleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    parentId?: SortOrder
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

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumProductTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductType | EnumProductTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductTypeFilter<$PrismaModel> | $Enums.ProductType
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type DigitalFileNullableRelationFilter = {
    is?: DigitalFileWhereInput | null
    isNot?: DigitalFileWhereInput | null
  }

  export type DigitalLicenseNullableRelationFilter = {
    is?: DigitalLicenseWhereInput | null
    isNot?: DigitalLicenseWhereInput | null
  }

  export type DigitalAccessNullableRelationFilter = {
    is?: DigitalAccessWhereInput | null
    isNot?: DigitalAccessWhereInput | null
  }

  export type BundleItemListRelationFilter = {
    every?: BundleItemWhereInput
    some?: BundleItemWhereInput
    none?: BundleItemWhereInput
  }

  export type BundleItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    sku?: SortOrder
    stockQuantity?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    images?: SortOrder
    isFeatured?: SortOrder
    productType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
    stockQuantity?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    sku?: SortOrder
    stockQuantity?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    isFeatured?: SortOrder
    productType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    sku?: SortOrder
    stockQuantity?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    isFeatured?: SortOrder
    productType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
    stockQuantity?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumProductTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductType | EnumProductTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductTypeWithAggregatesFilter<$PrismaModel> | $Enums.ProductType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductTypeFilter<$PrismaModel>
    _max?: NestedEnumProductTypeFilter<$PrismaModel>
  }

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type DigitalFileCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    fileKey?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    maxDownloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DigitalFileAvgOrderByAggregateInput = {
    fileSize?: SortOrder
    maxDownloads?: SortOrder
  }

  export type DigitalFileMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    fileKey?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    maxDownloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DigitalFileMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    fileKey?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    maxDownloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DigitalFileSumOrderByAggregateInput = {
    fileSize?: SortOrder
    maxDownloads?: SortOrder
  }

  export type LicenseKeyListRelationFilter = {
    every?: LicenseKeyWhereInput
    some?: LicenseKeyWhereInput
    none?: LicenseKeyWhereInput
  }

  export type LicenseKeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DigitalLicenseCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DigitalLicenseMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DigitalLicenseMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type DigitalLicenseRelationFilter = {
    is?: DigitalLicenseWhereInput
    isNot?: DigitalLicenseWhereInput
  }

  export type LicenseKeyCountOrderByAggregateInput = {
    id?: SortOrder
    digitalLicenseId?: SortOrder
    key?: SortOrder
    isRedeemed?: SortOrder
    redeemedAt?: SortOrder
    redeemedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type LicenseKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    digitalLicenseId?: SortOrder
    key?: SortOrder
    isRedeemed?: SortOrder
    redeemedAt?: SortOrder
    redeemedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type LicenseKeyMinOrderByAggregateInput = {
    id?: SortOrder
    digitalLicenseId?: SortOrder
    key?: SortOrder
    isRedeemed?: SortOrder
    redeemedAt?: SortOrder
    redeemedBy?: SortOrder
    createdAt?: SortOrder
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

  export type DigitalAccessCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    accessDurationDays?: SortOrder
    accessUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DigitalAccessAvgOrderByAggregateInput = {
    accessDurationDays?: SortOrder
  }

  export type DigitalAccessMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    accessDurationDays?: SortOrder
    accessUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DigitalAccessMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    accessDurationDays?: SortOrder
    accessUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DigitalAccessSumOrderByAggregateInput = {
    accessDurationDays?: SortOrder
  }

  export type BundleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    images?: SortOrder
    isFeatured?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BundleAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type BundleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    isFeatured?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BundleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    isFeatured?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BundleSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type BundleRelationFilter = {
    is?: BundleWhereInput
    isNot?: BundleWhereInput
  }

  export type BundleItemBundleIdProductIdCompoundUniqueInput = {
    bundleId: string
    productId: string
  }

  export type BundleItemCountOrderByAggregateInput = {
    id?: SortOrder
    bundleId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
  }

  export type BundleItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type BundleItemMaxOrderByAggregateInput = {
    id?: SortOrder
    bundleId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
  }

  export type BundleItemMinOrderByAggregateInput = {
    id?: SortOrder
    bundleId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
  }

  export type BundleItemSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type CategoryCreateNestedOneWithoutChildrenInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    connect?: CategoryWhereUniqueInput
  }

  export type CategoryCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type BundleCreateNestedManyWithoutCategoryInput = {
    create?: XOR<BundleCreateWithoutCategoryInput, BundleUncheckedCreateWithoutCategoryInput> | BundleCreateWithoutCategoryInput[] | BundleUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BundleCreateOrConnectWithoutCategoryInput | BundleCreateOrConnectWithoutCategoryInput[]
    createMany?: BundleCreateManyCategoryInputEnvelope
    connect?: BundleWhereUniqueInput | BundleWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type BundleUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<BundleCreateWithoutCategoryInput, BundleUncheckedCreateWithoutCategoryInput> | BundleCreateWithoutCategoryInput[] | BundleUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BundleCreateOrConnectWithoutCategoryInput | BundleCreateOrConnectWithoutCategoryInput[]
    createMany?: BundleCreateManyCategoryInputEnvelope
    connect?: BundleWhereUniqueInput | BundleWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CategoryUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    upsert?: CategoryUpsertWithoutChildrenInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutChildrenInput, CategoryUpdateWithoutChildrenInput>, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type BundleUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<BundleCreateWithoutCategoryInput, BundleUncheckedCreateWithoutCategoryInput> | BundleCreateWithoutCategoryInput[] | BundleUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BundleCreateOrConnectWithoutCategoryInput | BundleCreateOrConnectWithoutCategoryInput[]
    upsert?: BundleUpsertWithWhereUniqueWithoutCategoryInput | BundleUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: BundleCreateManyCategoryInputEnvelope
    set?: BundleWhereUniqueInput | BundleWhereUniqueInput[]
    disconnect?: BundleWhereUniqueInput | BundleWhereUniqueInput[]
    delete?: BundleWhereUniqueInput | BundleWhereUniqueInput[]
    connect?: BundleWhereUniqueInput | BundleWhereUniqueInput[]
    update?: BundleUpdateWithWhereUniqueWithoutCategoryInput | BundleUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: BundleUpdateManyWithWhereWithoutCategoryInput | BundleUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: BundleScalarWhereInput | BundleScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type BundleUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<BundleCreateWithoutCategoryInput, BundleUncheckedCreateWithoutCategoryInput> | BundleCreateWithoutCategoryInput[] | BundleUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BundleCreateOrConnectWithoutCategoryInput | BundleCreateOrConnectWithoutCategoryInput[]
    upsert?: BundleUpsertWithWhereUniqueWithoutCategoryInput | BundleUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: BundleCreateManyCategoryInputEnvelope
    set?: BundleWhereUniqueInput | BundleWhereUniqueInput[]
    disconnect?: BundleWhereUniqueInput | BundleWhereUniqueInput[]
    delete?: BundleWhereUniqueInput | BundleWhereUniqueInput[]
    connect?: BundleWhereUniqueInput | BundleWhereUniqueInput[]
    update?: BundleUpdateWithWhereUniqueWithoutCategoryInput | BundleUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: BundleUpdateManyWithWhereWithoutCategoryInput | BundleUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: BundleScalarWhereInput | BundleScalarWhereInput[]
  }

  export type ProductCreateimagesInput = {
    set: string[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type DigitalFileCreateNestedOneWithoutProductInput = {
    create?: XOR<DigitalFileCreateWithoutProductInput, DigitalFileUncheckedCreateWithoutProductInput>
    connectOrCreate?: DigitalFileCreateOrConnectWithoutProductInput
    connect?: DigitalFileWhereUniqueInput
  }

  export type DigitalLicenseCreateNestedOneWithoutProductInput = {
    create?: XOR<DigitalLicenseCreateWithoutProductInput, DigitalLicenseUncheckedCreateWithoutProductInput>
    connectOrCreate?: DigitalLicenseCreateOrConnectWithoutProductInput
    connect?: DigitalLicenseWhereUniqueInput
  }

  export type DigitalAccessCreateNestedOneWithoutProductInput = {
    create?: XOR<DigitalAccessCreateWithoutProductInput, DigitalAccessUncheckedCreateWithoutProductInput>
    connectOrCreate?: DigitalAccessCreateOrConnectWithoutProductInput
    connect?: DigitalAccessWhereUniqueInput
  }

  export type BundleItemCreateNestedManyWithoutProductInput = {
    create?: XOR<BundleItemCreateWithoutProductInput, BundleItemUncheckedCreateWithoutProductInput> | BundleItemCreateWithoutProductInput[] | BundleItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: BundleItemCreateOrConnectWithoutProductInput | BundleItemCreateOrConnectWithoutProductInput[]
    createMany?: BundleItemCreateManyProductInputEnvelope
    connect?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
  }

  export type DigitalFileUncheckedCreateNestedOneWithoutProductInput = {
    create?: XOR<DigitalFileCreateWithoutProductInput, DigitalFileUncheckedCreateWithoutProductInput>
    connectOrCreate?: DigitalFileCreateOrConnectWithoutProductInput
    connect?: DigitalFileWhereUniqueInput
  }

  export type DigitalLicenseUncheckedCreateNestedOneWithoutProductInput = {
    create?: XOR<DigitalLicenseCreateWithoutProductInput, DigitalLicenseUncheckedCreateWithoutProductInput>
    connectOrCreate?: DigitalLicenseCreateOrConnectWithoutProductInput
    connect?: DigitalLicenseWhereUniqueInput
  }

  export type DigitalAccessUncheckedCreateNestedOneWithoutProductInput = {
    create?: XOR<DigitalAccessCreateWithoutProductInput, DigitalAccessUncheckedCreateWithoutProductInput>
    connectOrCreate?: DigitalAccessCreateOrConnectWithoutProductInput
    connect?: DigitalAccessWhereUniqueInput
  }

  export type BundleItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<BundleItemCreateWithoutProductInput, BundleItemUncheckedCreateWithoutProductInput> | BundleItemCreateWithoutProductInput[] | BundleItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: BundleItemCreateOrConnectWithoutProductInput | BundleItemCreateOrConnectWithoutProductInput[]
    createMany?: BundleItemCreateManyProductInputEnvelope
    connect?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumProductTypeFieldUpdateOperationsInput = {
    set?: $Enums.ProductType
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type DigitalFileUpdateOneWithoutProductNestedInput = {
    create?: XOR<DigitalFileCreateWithoutProductInput, DigitalFileUncheckedCreateWithoutProductInput>
    connectOrCreate?: DigitalFileCreateOrConnectWithoutProductInput
    upsert?: DigitalFileUpsertWithoutProductInput
    disconnect?: DigitalFileWhereInput | boolean
    delete?: DigitalFileWhereInput | boolean
    connect?: DigitalFileWhereUniqueInput
    update?: XOR<XOR<DigitalFileUpdateToOneWithWhereWithoutProductInput, DigitalFileUpdateWithoutProductInput>, DigitalFileUncheckedUpdateWithoutProductInput>
  }

  export type DigitalLicenseUpdateOneWithoutProductNestedInput = {
    create?: XOR<DigitalLicenseCreateWithoutProductInput, DigitalLicenseUncheckedCreateWithoutProductInput>
    connectOrCreate?: DigitalLicenseCreateOrConnectWithoutProductInput
    upsert?: DigitalLicenseUpsertWithoutProductInput
    disconnect?: DigitalLicenseWhereInput | boolean
    delete?: DigitalLicenseWhereInput | boolean
    connect?: DigitalLicenseWhereUniqueInput
    update?: XOR<XOR<DigitalLicenseUpdateToOneWithWhereWithoutProductInput, DigitalLicenseUpdateWithoutProductInput>, DigitalLicenseUncheckedUpdateWithoutProductInput>
  }

  export type DigitalAccessUpdateOneWithoutProductNestedInput = {
    create?: XOR<DigitalAccessCreateWithoutProductInput, DigitalAccessUncheckedCreateWithoutProductInput>
    connectOrCreate?: DigitalAccessCreateOrConnectWithoutProductInput
    upsert?: DigitalAccessUpsertWithoutProductInput
    disconnect?: DigitalAccessWhereInput | boolean
    delete?: DigitalAccessWhereInput | boolean
    connect?: DigitalAccessWhereUniqueInput
    update?: XOR<XOR<DigitalAccessUpdateToOneWithWhereWithoutProductInput, DigitalAccessUpdateWithoutProductInput>, DigitalAccessUncheckedUpdateWithoutProductInput>
  }

  export type BundleItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<BundleItemCreateWithoutProductInput, BundleItemUncheckedCreateWithoutProductInput> | BundleItemCreateWithoutProductInput[] | BundleItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: BundleItemCreateOrConnectWithoutProductInput | BundleItemCreateOrConnectWithoutProductInput[]
    upsert?: BundleItemUpsertWithWhereUniqueWithoutProductInput | BundleItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: BundleItemCreateManyProductInputEnvelope
    set?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    disconnect?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    delete?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    connect?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    update?: BundleItemUpdateWithWhereUniqueWithoutProductInput | BundleItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: BundleItemUpdateManyWithWhereWithoutProductInput | BundleItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: BundleItemScalarWhereInput | BundleItemScalarWhereInput[]
  }

  export type DigitalFileUncheckedUpdateOneWithoutProductNestedInput = {
    create?: XOR<DigitalFileCreateWithoutProductInput, DigitalFileUncheckedCreateWithoutProductInput>
    connectOrCreate?: DigitalFileCreateOrConnectWithoutProductInput
    upsert?: DigitalFileUpsertWithoutProductInput
    disconnect?: DigitalFileWhereInput | boolean
    delete?: DigitalFileWhereInput | boolean
    connect?: DigitalFileWhereUniqueInput
    update?: XOR<XOR<DigitalFileUpdateToOneWithWhereWithoutProductInput, DigitalFileUpdateWithoutProductInput>, DigitalFileUncheckedUpdateWithoutProductInput>
  }

  export type DigitalLicenseUncheckedUpdateOneWithoutProductNestedInput = {
    create?: XOR<DigitalLicenseCreateWithoutProductInput, DigitalLicenseUncheckedCreateWithoutProductInput>
    connectOrCreate?: DigitalLicenseCreateOrConnectWithoutProductInput
    upsert?: DigitalLicenseUpsertWithoutProductInput
    disconnect?: DigitalLicenseWhereInput | boolean
    delete?: DigitalLicenseWhereInput | boolean
    connect?: DigitalLicenseWhereUniqueInput
    update?: XOR<XOR<DigitalLicenseUpdateToOneWithWhereWithoutProductInput, DigitalLicenseUpdateWithoutProductInput>, DigitalLicenseUncheckedUpdateWithoutProductInput>
  }

  export type DigitalAccessUncheckedUpdateOneWithoutProductNestedInput = {
    create?: XOR<DigitalAccessCreateWithoutProductInput, DigitalAccessUncheckedCreateWithoutProductInput>
    connectOrCreate?: DigitalAccessCreateOrConnectWithoutProductInput
    upsert?: DigitalAccessUpsertWithoutProductInput
    disconnect?: DigitalAccessWhereInput | boolean
    delete?: DigitalAccessWhereInput | boolean
    connect?: DigitalAccessWhereUniqueInput
    update?: XOR<XOR<DigitalAccessUpdateToOneWithWhereWithoutProductInput, DigitalAccessUpdateWithoutProductInput>, DigitalAccessUncheckedUpdateWithoutProductInput>
  }

  export type BundleItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<BundleItemCreateWithoutProductInput, BundleItemUncheckedCreateWithoutProductInput> | BundleItemCreateWithoutProductInput[] | BundleItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: BundleItemCreateOrConnectWithoutProductInput | BundleItemCreateOrConnectWithoutProductInput[]
    upsert?: BundleItemUpsertWithWhereUniqueWithoutProductInput | BundleItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: BundleItemCreateManyProductInputEnvelope
    set?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    disconnect?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    delete?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    connect?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    update?: BundleItemUpdateWithWhereUniqueWithoutProductInput | BundleItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: BundleItemUpdateManyWithWhereWithoutProductInput | BundleItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: BundleItemScalarWhereInput | BundleItemScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutDigitalFileInput = {
    create?: XOR<ProductCreateWithoutDigitalFileInput, ProductUncheckedCreateWithoutDigitalFileInput>
    connectOrCreate?: ProductCreateOrConnectWithoutDigitalFileInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutDigitalFileNestedInput = {
    create?: XOR<ProductCreateWithoutDigitalFileInput, ProductUncheckedCreateWithoutDigitalFileInput>
    connectOrCreate?: ProductCreateOrConnectWithoutDigitalFileInput
    upsert?: ProductUpsertWithoutDigitalFileInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutDigitalFileInput, ProductUpdateWithoutDigitalFileInput>, ProductUncheckedUpdateWithoutDigitalFileInput>
  }

  export type ProductCreateNestedOneWithoutDigitalLicenseInput = {
    create?: XOR<ProductCreateWithoutDigitalLicenseInput, ProductUncheckedCreateWithoutDigitalLicenseInput>
    connectOrCreate?: ProductCreateOrConnectWithoutDigitalLicenseInput
    connect?: ProductWhereUniqueInput
  }

  export type LicenseKeyCreateNestedManyWithoutDigitalLicenseInput = {
    create?: XOR<LicenseKeyCreateWithoutDigitalLicenseInput, LicenseKeyUncheckedCreateWithoutDigitalLicenseInput> | LicenseKeyCreateWithoutDigitalLicenseInput[] | LicenseKeyUncheckedCreateWithoutDigitalLicenseInput[]
    connectOrCreate?: LicenseKeyCreateOrConnectWithoutDigitalLicenseInput | LicenseKeyCreateOrConnectWithoutDigitalLicenseInput[]
    createMany?: LicenseKeyCreateManyDigitalLicenseInputEnvelope
    connect?: LicenseKeyWhereUniqueInput | LicenseKeyWhereUniqueInput[]
  }

  export type LicenseKeyUncheckedCreateNestedManyWithoutDigitalLicenseInput = {
    create?: XOR<LicenseKeyCreateWithoutDigitalLicenseInput, LicenseKeyUncheckedCreateWithoutDigitalLicenseInput> | LicenseKeyCreateWithoutDigitalLicenseInput[] | LicenseKeyUncheckedCreateWithoutDigitalLicenseInput[]
    connectOrCreate?: LicenseKeyCreateOrConnectWithoutDigitalLicenseInput | LicenseKeyCreateOrConnectWithoutDigitalLicenseInput[]
    createMany?: LicenseKeyCreateManyDigitalLicenseInputEnvelope
    connect?: LicenseKeyWhereUniqueInput | LicenseKeyWhereUniqueInput[]
  }

  export type ProductUpdateOneRequiredWithoutDigitalLicenseNestedInput = {
    create?: XOR<ProductCreateWithoutDigitalLicenseInput, ProductUncheckedCreateWithoutDigitalLicenseInput>
    connectOrCreate?: ProductCreateOrConnectWithoutDigitalLicenseInput
    upsert?: ProductUpsertWithoutDigitalLicenseInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutDigitalLicenseInput, ProductUpdateWithoutDigitalLicenseInput>, ProductUncheckedUpdateWithoutDigitalLicenseInput>
  }

  export type LicenseKeyUpdateManyWithoutDigitalLicenseNestedInput = {
    create?: XOR<LicenseKeyCreateWithoutDigitalLicenseInput, LicenseKeyUncheckedCreateWithoutDigitalLicenseInput> | LicenseKeyCreateWithoutDigitalLicenseInput[] | LicenseKeyUncheckedCreateWithoutDigitalLicenseInput[]
    connectOrCreate?: LicenseKeyCreateOrConnectWithoutDigitalLicenseInput | LicenseKeyCreateOrConnectWithoutDigitalLicenseInput[]
    upsert?: LicenseKeyUpsertWithWhereUniqueWithoutDigitalLicenseInput | LicenseKeyUpsertWithWhereUniqueWithoutDigitalLicenseInput[]
    createMany?: LicenseKeyCreateManyDigitalLicenseInputEnvelope
    set?: LicenseKeyWhereUniqueInput | LicenseKeyWhereUniqueInput[]
    disconnect?: LicenseKeyWhereUniqueInput | LicenseKeyWhereUniqueInput[]
    delete?: LicenseKeyWhereUniqueInput | LicenseKeyWhereUniqueInput[]
    connect?: LicenseKeyWhereUniqueInput | LicenseKeyWhereUniqueInput[]
    update?: LicenseKeyUpdateWithWhereUniqueWithoutDigitalLicenseInput | LicenseKeyUpdateWithWhereUniqueWithoutDigitalLicenseInput[]
    updateMany?: LicenseKeyUpdateManyWithWhereWithoutDigitalLicenseInput | LicenseKeyUpdateManyWithWhereWithoutDigitalLicenseInput[]
    deleteMany?: LicenseKeyScalarWhereInput | LicenseKeyScalarWhereInput[]
  }

  export type LicenseKeyUncheckedUpdateManyWithoutDigitalLicenseNestedInput = {
    create?: XOR<LicenseKeyCreateWithoutDigitalLicenseInput, LicenseKeyUncheckedCreateWithoutDigitalLicenseInput> | LicenseKeyCreateWithoutDigitalLicenseInput[] | LicenseKeyUncheckedCreateWithoutDigitalLicenseInput[]
    connectOrCreate?: LicenseKeyCreateOrConnectWithoutDigitalLicenseInput | LicenseKeyCreateOrConnectWithoutDigitalLicenseInput[]
    upsert?: LicenseKeyUpsertWithWhereUniqueWithoutDigitalLicenseInput | LicenseKeyUpsertWithWhereUniqueWithoutDigitalLicenseInput[]
    createMany?: LicenseKeyCreateManyDigitalLicenseInputEnvelope
    set?: LicenseKeyWhereUniqueInput | LicenseKeyWhereUniqueInput[]
    disconnect?: LicenseKeyWhereUniqueInput | LicenseKeyWhereUniqueInput[]
    delete?: LicenseKeyWhereUniqueInput | LicenseKeyWhereUniqueInput[]
    connect?: LicenseKeyWhereUniqueInput | LicenseKeyWhereUniqueInput[]
    update?: LicenseKeyUpdateWithWhereUniqueWithoutDigitalLicenseInput | LicenseKeyUpdateWithWhereUniqueWithoutDigitalLicenseInput[]
    updateMany?: LicenseKeyUpdateManyWithWhereWithoutDigitalLicenseInput | LicenseKeyUpdateManyWithWhereWithoutDigitalLicenseInput[]
    deleteMany?: LicenseKeyScalarWhereInput | LicenseKeyScalarWhereInput[]
  }

  export type DigitalLicenseCreateNestedOneWithoutKeysInput = {
    create?: XOR<DigitalLicenseCreateWithoutKeysInput, DigitalLicenseUncheckedCreateWithoutKeysInput>
    connectOrCreate?: DigitalLicenseCreateOrConnectWithoutKeysInput
    connect?: DigitalLicenseWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DigitalLicenseUpdateOneRequiredWithoutKeysNestedInput = {
    create?: XOR<DigitalLicenseCreateWithoutKeysInput, DigitalLicenseUncheckedCreateWithoutKeysInput>
    connectOrCreate?: DigitalLicenseCreateOrConnectWithoutKeysInput
    upsert?: DigitalLicenseUpsertWithoutKeysInput
    connect?: DigitalLicenseWhereUniqueInput
    update?: XOR<XOR<DigitalLicenseUpdateToOneWithWhereWithoutKeysInput, DigitalLicenseUpdateWithoutKeysInput>, DigitalLicenseUncheckedUpdateWithoutKeysInput>
  }

  export type ProductCreateNestedOneWithoutDigitalAccessInput = {
    create?: XOR<ProductCreateWithoutDigitalAccessInput, ProductUncheckedCreateWithoutDigitalAccessInput>
    connectOrCreate?: ProductCreateOrConnectWithoutDigitalAccessInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutDigitalAccessNestedInput = {
    create?: XOR<ProductCreateWithoutDigitalAccessInput, ProductUncheckedCreateWithoutDigitalAccessInput>
    connectOrCreate?: ProductCreateOrConnectWithoutDigitalAccessInput
    upsert?: ProductUpsertWithoutDigitalAccessInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutDigitalAccessInput, ProductUpdateWithoutDigitalAccessInput>, ProductUncheckedUpdateWithoutDigitalAccessInput>
  }

  export type BundleCreateimagesInput = {
    set: string[]
  }

  export type CategoryCreateNestedOneWithoutBundlesInput = {
    create?: XOR<CategoryCreateWithoutBundlesInput, CategoryUncheckedCreateWithoutBundlesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutBundlesInput
    connect?: CategoryWhereUniqueInput
  }

  export type BundleItemCreateNestedManyWithoutBundleInput = {
    create?: XOR<BundleItemCreateWithoutBundleInput, BundleItemUncheckedCreateWithoutBundleInput> | BundleItemCreateWithoutBundleInput[] | BundleItemUncheckedCreateWithoutBundleInput[]
    connectOrCreate?: BundleItemCreateOrConnectWithoutBundleInput | BundleItemCreateOrConnectWithoutBundleInput[]
    createMany?: BundleItemCreateManyBundleInputEnvelope
    connect?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
  }

  export type BundleItemUncheckedCreateNestedManyWithoutBundleInput = {
    create?: XOR<BundleItemCreateWithoutBundleInput, BundleItemUncheckedCreateWithoutBundleInput> | BundleItemCreateWithoutBundleInput[] | BundleItemUncheckedCreateWithoutBundleInput[]
    connectOrCreate?: BundleItemCreateOrConnectWithoutBundleInput | BundleItemCreateOrConnectWithoutBundleInput[]
    createMany?: BundleItemCreateManyBundleInputEnvelope
    connect?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
  }

  export type BundleUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CategoryUpdateOneRequiredWithoutBundlesNestedInput = {
    create?: XOR<CategoryCreateWithoutBundlesInput, CategoryUncheckedCreateWithoutBundlesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutBundlesInput
    upsert?: CategoryUpsertWithoutBundlesInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutBundlesInput, CategoryUpdateWithoutBundlesInput>, CategoryUncheckedUpdateWithoutBundlesInput>
  }

  export type BundleItemUpdateManyWithoutBundleNestedInput = {
    create?: XOR<BundleItemCreateWithoutBundleInput, BundleItemUncheckedCreateWithoutBundleInput> | BundleItemCreateWithoutBundleInput[] | BundleItemUncheckedCreateWithoutBundleInput[]
    connectOrCreate?: BundleItemCreateOrConnectWithoutBundleInput | BundleItemCreateOrConnectWithoutBundleInput[]
    upsert?: BundleItemUpsertWithWhereUniqueWithoutBundleInput | BundleItemUpsertWithWhereUniqueWithoutBundleInput[]
    createMany?: BundleItemCreateManyBundleInputEnvelope
    set?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    disconnect?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    delete?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    connect?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    update?: BundleItemUpdateWithWhereUniqueWithoutBundleInput | BundleItemUpdateWithWhereUniqueWithoutBundleInput[]
    updateMany?: BundleItemUpdateManyWithWhereWithoutBundleInput | BundleItemUpdateManyWithWhereWithoutBundleInput[]
    deleteMany?: BundleItemScalarWhereInput | BundleItemScalarWhereInput[]
  }

  export type BundleItemUncheckedUpdateManyWithoutBundleNestedInput = {
    create?: XOR<BundleItemCreateWithoutBundleInput, BundleItemUncheckedCreateWithoutBundleInput> | BundleItemCreateWithoutBundleInput[] | BundleItemUncheckedCreateWithoutBundleInput[]
    connectOrCreate?: BundleItemCreateOrConnectWithoutBundleInput | BundleItemCreateOrConnectWithoutBundleInput[]
    upsert?: BundleItemUpsertWithWhereUniqueWithoutBundleInput | BundleItemUpsertWithWhereUniqueWithoutBundleInput[]
    createMany?: BundleItemCreateManyBundleInputEnvelope
    set?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    disconnect?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    delete?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    connect?: BundleItemWhereUniqueInput | BundleItemWhereUniqueInput[]
    update?: BundleItemUpdateWithWhereUniqueWithoutBundleInput | BundleItemUpdateWithWhereUniqueWithoutBundleInput[]
    updateMany?: BundleItemUpdateManyWithWhereWithoutBundleInput | BundleItemUpdateManyWithWhereWithoutBundleInput[]
    deleteMany?: BundleItemScalarWhereInput | BundleItemScalarWhereInput[]
  }

  export type BundleCreateNestedOneWithoutItemsInput = {
    create?: XOR<BundleCreateWithoutItemsInput, BundleUncheckedCreateWithoutItemsInput>
    connectOrCreate?: BundleCreateOrConnectWithoutItemsInput
    connect?: BundleWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutBundleItemsInput = {
    create?: XOR<ProductCreateWithoutBundleItemsInput, ProductUncheckedCreateWithoutBundleItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutBundleItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type BundleUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<BundleCreateWithoutItemsInput, BundleUncheckedCreateWithoutItemsInput>
    connectOrCreate?: BundleCreateOrConnectWithoutItemsInput
    upsert?: BundleUpsertWithoutItemsInput
    connect?: BundleWhereUniqueInput
    update?: XOR<XOR<BundleUpdateToOneWithWhereWithoutItemsInput, BundleUpdateWithoutItemsInput>, BundleUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutBundleItemsNestedInput = {
    create?: XOR<ProductCreateWithoutBundleItemsInput, ProductUncheckedCreateWithoutBundleItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutBundleItemsInput
    upsert?: ProductUpsertWithoutBundleItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutBundleItemsInput, ProductUpdateWithoutBundleItemsInput>, ProductUncheckedUpdateWithoutBundleItemsInput>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumProductTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductType | EnumProductTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductTypeFilter<$PrismaModel> | $Enums.ProductType
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumProductTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductType | EnumProductTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductType[] | ListEnumProductTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductTypeWithAggregatesFilter<$PrismaModel> | $Enums.ProductType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductTypeFilter<$PrismaModel>
    _max?: NestedEnumProductTypeFilter<$PrismaModel>
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

  export type CategoryCreateWithoutChildrenInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    products?: ProductCreateNestedManyWithoutCategoryInput
    bundles?: BundleCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutChildrenInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
    bundles?: BundleUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutChildrenInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
  }

  export type CategoryCreateWithoutParentInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryCreateNestedManyWithoutParentInput
    products?: ProductCreateNestedManyWithoutCategoryInput
    bundles?: BundleCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutParentInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
    bundles?: BundleUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutParentInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryCreateManyParentInputEnvelope = {
    data: CategoryCreateManyParentInput | CategoryCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutCategoryInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
    digitalFile?: DigitalFileCreateNestedOneWithoutProductInput
    digitalLicense?: DigitalLicenseCreateNestedOneWithoutProductInput
    digitalAccess?: DigitalAccessCreateNestedOneWithoutProductInput
    bundleItems?: BundleItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
    digitalFile?: DigitalFileUncheckedCreateNestedOneWithoutProductInput
    digitalLicense?: DigitalLicenseUncheckedCreateNestedOneWithoutProductInput
    digitalAccess?: DigitalAccessUncheckedCreateNestedOneWithoutProductInput
    bundleItems?: BundleItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type BundleCreateWithoutCategoryInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    vendorId: string
    images?: BundleCreateimagesInput | string[]
    isFeatured?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: BundleItemCreateNestedManyWithoutBundleInput
  }

  export type BundleUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    vendorId: string
    images?: BundleCreateimagesInput | string[]
    isFeatured?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: BundleItemUncheckedCreateNestedManyWithoutBundleInput
  }

  export type BundleCreateOrConnectWithoutCategoryInput = {
    where: BundleWhereUniqueInput
    create: XOR<BundleCreateWithoutCategoryInput, BundleUncheckedCreateWithoutCategoryInput>
  }

  export type BundleCreateManyCategoryInputEnvelope = {
    data: BundleCreateManyCategoryInput | BundleCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutChildrenInput = {
    update: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
    bundles?: BundleUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
    bundles?: BundleUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUpsertWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
  }

  export type CategoryUpdateManyWithWhereWithoutParentInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutParentInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    parentId?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: DecimalFilter<"Product"> | Decimal | DecimalJsLike | number | string
    sku?: StringFilter<"Product"> | string
    stockQuantity?: IntFilter<"Product"> | number
    vendorId?: StringFilter<"Product"> | string
    categoryId?: StringFilter<"Product"> | string
    images?: StringNullableListFilter<"Product">
    isFeatured?: BoolFilter<"Product"> | boolean
    productType?: EnumProductTypeFilter<"Product"> | $Enums.ProductType
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type BundleUpsertWithWhereUniqueWithoutCategoryInput = {
    where: BundleWhereUniqueInput
    update: XOR<BundleUpdateWithoutCategoryInput, BundleUncheckedUpdateWithoutCategoryInput>
    create: XOR<BundleCreateWithoutCategoryInput, BundleUncheckedCreateWithoutCategoryInput>
  }

  export type BundleUpdateWithWhereUniqueWithoutCategoryInput = {
    where: BundleWhereUniqueInput
    data: XOR<BundleUpdateWithoutCategoryInput, BundleUncheckedUpdateWithoutCategoryInput>
  }

  export type BundleUpdateManyWithWhereWithoutCategoryInput = {
    where: BundleScalarWhereInput
    data: XOR<BundleUpdateManyMutationInput, BundleUncheckedUpdateManyWithoutCategoryInput>
  }

  export type BundleScalarWhereInput = {
    AND?: BundleScalarWhereInput | BundleScalarWhereInput[]
    OR?: BundleScalarWhereInput[]
    NOT?: BundleScalarWhereInput | BundleScalarWhereInput[]
    id?: StringFilter<"Bundle"> | string
    name?: StringFilter<"Bundle"> | string
    slug?: StringFilter<"Bundle"> | string
    description?: StringNullableFilter<"Bundle"> | string | null
    price?: DecimalFilter<"Bundle"> | Decimal | DecimalJsLike | number | string
    vendorId?: StringFilter<"Bundle"> | string
    categoryId?: StringFilter<"Bundle"> | string
    images?: StringNullableListFilter<"Bundle">
    isFeatured?: BoolFilter<"Bundle"> | boolean
    isActive?: BoolFilter<"Bundle"> | boolean
    createdAt?: DateTimeFilter<"Bundle"> | Date | string
    updatedAt?: DateTimeFilter<"Bundle"> | Date | string
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
    bundles?: BundleCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    bundles?: BundleUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type DigitalFileCreateWithoutProductInput = {
    id?: string
    fileKey: string
    fileName: string
    fileSize: number
    mimeType: string
    maxDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalFileUncheckedCreateWithoutProductInput = {
    id?: string
    fileKey: string
    fileName: string
    fileSize: number
    mimeType: string
    maxDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalFileCreateOrConnectWithoutProductInput = {
    where: DigitalFileWhereUniqueInput
    create: XOR<DigitalFileCreateWithoutProductInput, DigitalFileUncheckedCreateWithoutProductInput>
  }

  export type DigitalLicenseCreateWithoutProductInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    keys?: LicenseKeyCreateNestedManyWithoutDigitalLicenseInput
  }

  export type DigitalLicenseUncheckedCreateWithoutProductInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    keys?: LicenseKeyUncheckedCreateNestedManyWithoutDigitalLicenseInput
  }

  export type DigitalLicenseCreateOrConnectWithoutProductInput = {
    where: DigitalLicenseWhereUniqueInput
    create: XOR<DigitalLicenseCreateWithoutProductInput, DigitalLicenseUncheckedCreateWithoutProductInput>
  }

  export type DigitalAccessCreateWithoutProductInput = {
    id?: string
    accessDurationDays: number
    accessUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalAccessUncheckedCreateWithoutProductInput = {
    id?: string
    accessDurationDays: number
    accessUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalAccessCreateOrConnectWithoutProductInput = {
    where: DigitalAccessWhereUniqueInput
    create: XOR<DigitalAccessCreateWithoutProductInput, DigitalAccessUncheckedCreateWithoutProductInput>
  }

  export type BundleItemCreateWithoutProductInput = {
    id?: string
    quantity?: number
    bundle: BundleCreateNestedOneWithoutItemsInput
  }

  export type BundleItemUncheckedCreateWithoutProductInput = {
    id?: string
    bundleId: string
    quantity?: number
  }

  export type BundleItemCreateOrConnectWithoutProductInput = {
    where: BundleItemWhereUniqueInput
    create: XOR<BundleItemCreateWithoutProductInput, BundleItemUncheckedCreateWithoutProductInput>
  }

  export type BundleItemCreateManyProductInputEnvelope = {
    data: BundleItemCreateManyProductInput | BundleItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    bundles?: BundleUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    bundles?: BundleUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type DigitalFileUpsertWithoutProductInput = {
    update: XOR<DigitalFileUpdateWithoutProductInput, DigitalFileUncheckedUpdateWithoutProductInput>
    create: XOR<DigitalFileCreateWithoutProductInput, DigitalFileUncheckedCreateWithoutProductInput>
    where?: DigitalFileWhereInput
  }

  export type DigitalFileUpdateToOneWithWhereWithoutProductInput = {
    where?: DigitalFileWhereInput
    data: XOR<DigitalFileUpdateWithoutProductInput, DigitalFileUncheckedUpdateWithoutProductInput>
  }

  export type DigitalFileUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    maxDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalFileUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileKey?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    mimeType?: StringFieldUpdateOperationsInput | string
    maxDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalLicenseUpsertWithoutProductInput = {
    update: XOR<DigitalLicenseUpdateWithoutProductInput, DigitalLicenseUncheckedUpdateWithoutProductInput>
    create: XOR<DigitalLicenseCreateWithoutProductInput, DigitalLicenseUncheckedCreateWithoutProductInput>
    where?: DigitalLicenseWhereInput
  }

  export type DigitalLicenseUpdateToOneWithWhereWithoutProductInput = {
    where?: DigitalLicenseWhereInput
    data: XOR<DigitalLicenseUpdateWithoutProductInput, DigitalLicenseUncheckedUpdateWithoutProductInput>
  }

  export type DigitalLicenseUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    keys?: LicenseKeyUpdateManyWithoutDigitalLicenseNestedInput
  }

  export type DigitalLicenseUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    keys?: LicenseKeyUncheckedUpdateManyWithoutDigitalLicenseNestedInput
  }

  export type DigitalAccessUpsertWithoutProductInput = {
    update: XOR<DigitalAccessUpdateWithoutProductInput, DigitalAccessUncheckedUpdateWithoutProductInput>
    create: XOR<DigitalAccessCreateWithoutProductInput, DigitalAccessUncheckedCreateWithoutProductInput>
    where?: DigitalAccessWhereInput
  }

  export type DigitalAccessUpdateToOneWithWhereWithoutProductInput = {
    where?: DigitalAccessWhereInput
    data: XOR<DigitalAccessUpdateWithoutProductInput, DigitalAccessUncheckedUpdateWithoutProductInput>
  }

  export type DigitalAccessUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessDurationDays?: IntFieldUpdateOperationsInput | number
    accessUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalAccessUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessDurationDays?: IntFieldUpdateOperationsInput | number
    accessUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BundleItemUpsertWithWhereUniqueWithoutProductInput = {
    where: BundleItemWhereUniqueInput
    update: XOR<BundleItemUpdateWithoutProductInput, BundleItemUncheckedUpdateWithoutProductInput>
    create: XOR<BundleItemCreateWithoutProductInput, BundleItemUncheckedCreateWithoutProductInput>
  }

  export type BundleItemUpdateWithWhereUniqueWithoutProductInput = {
    where: BundleItemWhereUniqueInput
    data: XOR<BundleItemUpdateWithoutProductInput, BundleItemUncheckedUpdateWithoutProductInput>
  }

  export type BundleItemUpdateManyWithWhereWithoutProductInput = {
    where: BundleItemScalarWhereInput
    data: XOR<BundleItemUpdateManyMutationInput, BundleItemUncheckedUpdateManyWithoutProductInput>
  }

  export type BundleItemScalarWhereInput = {
    AND?: BundleItemScalarWhereInput | BundleItemScalarWhereInput[]
    OR?: BundleItemScalarWhereInput[]
    NOT?: BundleItemScalarWhereInput | BundleItemScalarWhereInput[]
    id?: StringFilter<"BundleItem"> | string
    bundleId?: StringFilter<"BundleItem"> | string
    productId?: StringFilter<"BundleItem"> | string
    quantity?: IntFilter<"BundleItem"> | number
  }

  export type ProductCreateWithoutDigitalFileInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    digitalLicense?: DigitalLicenseCreateNestedOneWithoutProductInput
    digitalAccess?: DigitalAccessCreateNestedOneWithoutProductInput
    bundleItems?: BundleItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutDigitalFileInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    categoryId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
    digitalLicense?: DigitalLicenseUncheckedCreateNestedOneWithoutProductInput
    digitalAccess?: DigitalAccessUncheckedCreateNestedOneWithoutProductInput
    bundleItems?: BundleItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutDigitalFileInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutDigitalFileInput, ProductUncheckedCreateWithoutDigitalFileInput>
  }

  export type ProductUpsertWithoutDigitalFileInput = {
    update: XOR<ProductUpdateWithoutDigitalFileInput, ProductUncheckedUpdateWithoutDigitalFileInput>
    create: XOR<ProductCreateWithoutDigitalFileInput, ProductUncheckedCreateWithoutDigitalFileInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutDigitalFileInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutDigitalFileInput, ProductUncheckedUpdateWithoutDigitalFileInput>
  }

  export type ProductUpdateWithoutDigitalFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    digitalLicense?: DigitalLicenseUpdateOneWithoutProductNestedInput
    digitalAccess?: DigitalAccessUpdateOneWithoutProductNestedInput
    bundleItems?: BundleItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutDigitalFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    digitalLicense?: DigitalLicenseUncheckedUpdateOneWithoutProductNestedInput
    digitalAccess?: DigitalAccessUncheckedUpdateOneWithoutProductNestedInput
    bundleItems?: BundleItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateWithoutDigitalLicenseInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    digitalFile?: DigitalFileCreateNestedOneWithoutProductInput
    digitalAccess?: DigitalAccessCreateNestedOneWithoutProductInput
    bundleItems?: BundleItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutDigitalLicenseInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    categoryId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
    digitalFile?: DigitalFileUncheckedCreateNestedOneWithoutProductInput
    digitalAccess?: DigitalAccessUncheckedCreateNestedOneWithoutProductInput
    bundleItems?: BundleItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutDigitalLicenseInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutDigitalLicenseInput, ProductUncheckedCreateWithoutDigitalLicenseInput>
  }

  export type LicenseKeyCreateWithoutDigitalLicenseInput = {
    id?: string
    key: string
    isRedeemed?: boolean
    redeemedAt?: Date | string | null
    redeemedBy?: string | null
    createdAt?: Date | string
  }

  export type LicenseKeyUncheckedCreateWithoutDigitalLicenseInput = {
    id?: string
    key: string
    isRedeemed?: boolean
    redeemedAt?: Date | string | null
    redeemedBy?: string | null
    createdAt?: Date | string
  }

  export type LicenseKeyCreateOrConnectWithoutDigitalLicenseInput = {
    where: LicenseKeyWhereUniqueInput
    create: XOR<LicenseKeyCreateWithoutDigitalLicenseInput, LicenseKeyUncheckedCreateWithoutDigitalLicenseInput>
  }

  export type LicenseKeyCreateManyDigitalLicenseInputEnvelope = {
    data: LicenseKeyCreateManyDigitalLicenseInput | LicenseKeyCreateManyDigitalLicenseInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithoutDigitalLicenseInput = {
    update: XOR<ProductUpdateWithoutDigitalLicenseInput, ProductUncheckedUpdateWithoutDigitalLicenseInput>
    create: XOR<ProductCreateWithoutDigitalLicenseInput, ProductUncheckedCreateWithoutDigitalLicenseInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutDigitalLicenseInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutDigitalLicenseInput, ProductUncheckedUpdateWithoutDigitalLicenseInput>
  }

  export type ProductUpdateWithoutDigitalLicenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    digitalFile?: DigitalFileUpdateOneWithoutProductNestedInput
    digitalAccess?: DigitalAccessUpdateOneWithoutProductNestedInput
    bundleItems?: BundleItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutDigitalLicenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    digitalFile?: DigitalFileUncheckedUpdateOneWithoutProductNestedInput
    digitalAccess?: DigitalAccessUncheckedUpdateOneWithoutProductNestedInput
    bundleItems?: BundleItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type LicenseKeyUpsertWithWhereUniqueWithoutDigitalLicenseInput = {
    where: LicenseKeyWhereUniqueInput
    update: XOR<LicenseKeyUpdateWithoutDigitalLicenseInput, LicenseKeyUncheckedUpdateWithoutDigitalLicenseInput>
    create: XOR<LicenseKeyCreateWithoutDigitalLicenseInput, LicenseKeyUncheckedCreateWithoutDigitalLicenseInput>
  }

  export type LicenseKeyUpdateWithWhereUniqueWithoutDigitalLicenseInput = {
    where: LicenseKeyWhereUniqueInput
    data: XOR<LicenseKeyUpdateWithoutDigitalLicenseInput, LicenseKeyUncheckedUpdateWithoutDigitalLicenseInput>
  }

  export type LicenseKeyUpdateManyWithWhereWithoutDigitalLicenseInput = {
    where: LicenseKeyScalarWhereInput
    data: XOR<LicenseKeyUpdateManyMutationInput, LicenseKeyUncheckedUpdateManyWithoutDigitalLicenseInput>
  }

  export type LicenseKeyScalarWhereInput = {
    AND?: LicenseKeyScalarWhereInput | LicenseKeyScalarWhereInput[]
    OR?: LicenseKeyScalarWhereInput[]
    NOT?: LicenseKeyScalarWhereInput | LicenseKeyScalarWhereInput[]
    id?: StringFilter<"LicenseKey"> | string
    digitalLicenseId?: StringFilter<"LicenseKey"> | string
    key?: StringFilter<"LicenseKey"> | string
    isRedeemed?: BoolFilter<"LicenseKey"> | boolean
    redeemedAt?: DateTimeNullableFilter<"LicenseKey"> | Date | string | null
    redeemedBy?: StringNullableFilter<"LicenseKey"> | string | null
    createdAt?: DateTimeFilter<"LicenseKey"> | Date | string
  }

  export type DigitalLicenseCreateWithoutKeysInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutDigitalLicenseInput
  }

  export type DigitalLicenseUncheckedCreateWithoutKeysInput = {
    id?: string
    productId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalLicenseCreateOrConnectWithoutKeysInput = {
    where: DigitalLicenseWhereUniqueInput
    create: XOR<DigitalLicenseCreateWithoutKeysInput, DigitalLicenseUncheckedCreateWithoutKeysInput>
  }

  export type DigitalLicenseUpsertWithoutKeysInput = {
    update: XOR<DigitalLicenseUpdateWithoutKeysInput, DigitalLicenseUncheckedUpdateWithoutKeysInput>
    create: XOR<DigitalLicenseCreateWithoutKeysInput, DigitalLicenseUncheckedCreateWithoutKeysInput>
    where?: DigitalLicenseWhereInput
  }

  export type DigitalLicenseUpdateToOneWithWhereWithoutKeysInput = {
    where?: DigitalLicenseWhereInput
    data: XOR<DigitalLicenseUpdateWithoutKeysInput, DigitalLicenseUncheckedUpdateWithoutKeysInput>
  }

  export type DigitalLicenseUpdateWithoutKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutDigitalLicenseNestedInput
  }

  export type DigitalLicenseUncheckedUpdateWithoutKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateWithoutDigitalAccessInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    digitalFile?: DigitalFileCreateNestedOneWithoutProductInput
    digitalLicense?: DigitalLicenseCreateNestedOneWithoutProductInput
    bundleItems?: BundleItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutDigitalAccessInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    categoryId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
    digitalFile?: DigitalFileUncheckedCreateNestedOneWithoutProductInput
    digitalLicense?: DigitalLicenseUncheckedCreateNestedOneWithoutProductInput
    bundleItems?: BundleItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutDigitalAccessInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutDigitalAccessInput, ProductUncheckedCreateWithoutDigitalAccessInput>
  }

  export type ProductUpsertWithoutDigitalAccessInput = {
    update: XOR<ProductUpdateWithoutDigitalAccessInput, ProductUncheckedUpdateWithoutDigitalAccessInput>
    create: XOR<ProductCreateWithoutDigitalAccessInput, ProductUncheckedCreateWithoutDigitalAccessInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutDigitalAccessInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutDigitalAccessInput, ProductUncheckedUpdateWithoutDigitalAccessInput>
  }

  export type ProductUpdateWithoutDigitalAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    digitalFile?: DigitalFileUpdateOneWithoutProductNestedInput
    digitalLicense?: DigitalLicenseUpdateOneWithoutProductNestedInput
    bundleItems?: BundleItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutDigitalAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    digitalFile?: DigitalFileUncheckedUpdateOneWithoutProductNestedInput
    digitalLicense?: DigitalLicenseUncheckedUpdateOneWithoutProductNestedInput
    bundleItems?: BundleItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type CategoryCreateWithoutBundlesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutBundlesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutBundlesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutBundlesInput, CategoryUncheckedCreateWithoutBundlesInput>
  }

  export type BundleItemCreateWithoutBundleInput = {
    id?: string
    quantity?: number
    product: ProductCreateNestedOneWithoutBundleItemsInput
  }

  export type BundleItemUncheckedCreateWithoutBundleInput = {
    id?: string
    productId: string
    quantity?: number
  }

  export type BundleItemCreateOrConnectWithoutBundleInput = {
    where: BundleItemWhereUniqueInput
    create: XOR<BundleItemCreateWithoutBundleInput, BundleItemUncheckedCreateWithoutBundleInput>
  }

  export type BundleItemCreateManyBundleInputEnvelope = {
    data: BundleItemCreateManyBundleInput | BundleItemCreateManyBundleInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutBundlesInput = {
    update: XOR<CategoryUpdateWithoutBundlesInput, CategoryUncheckedUpdateWithoutBundlesInput>
    create: XOR<CategoryCreateWithoutBundlesInput, CategoryUncheckedCreateWithoutBundlesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutBundlesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutBundlesInput, CategoryUncheckedUpdateWithoutBundlesInput>
  }

  export type CategoryUpdateWithoutBundlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutBundlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type BundleItemUpsertWithWhereUniqueWithoutBundleInput = {
    where: BundleItemWhereUniqueInput
    update: XOR<BundleItemUpdateWithoutBundleInput, BundleItemUncheckedUpdateWithoutBundleInput>
    create: XOR<BundleItemCreateWithoutBundleInput, BundleItemUncheckedCreateWithoutBundleInput>
  }

  export type BundleItemUpdateWithWhereUniqueWithoutBundleInput = {
    where: BundleItemWhereUniqueInput
    data: XOR<BundleItemUpdateWithoutBundleInput, BundleItemUncheckedUpdateWithoutBundleInput>
  }

  export type BundleItemUpdateManyWithWhereWithoutBundleInput = {
    where: BundleItemScalarWhereInput
    data: XOR<BundleItemUpdateManyMutationInput, BundleItemUncheckedUpdateManyWithoutBundleInput>
  }

  export type BundleCreateWithoutItemsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    vendorId: string
    images?: BundleCreateimagesInput | string[]
    isFeatured?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutBundlesInput
  }

  export type BundleUncheckedCreateWithoutItemsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    vendorId: string
    categoryId: string
    images?: BundleCreateimagesInput | string[]
    isFeatured?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BundleCreateOrConnectWithoutItemsInput = {
    where: BundleWhereUniqueInput
    create: XOR<BundleCreateWithoutItemsInput, BundleUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutBundleItemsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    digitalFile?: DigitalFileCreateNestedOneWithoutProductInput
    digitalLicense?: DigitalLicenseCreateNestedOneWithoutProductInput
    digitalAccess?: DigitalAccessCreateNestedOneWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutBundleItemsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    categoryId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
    digitalFile?: DigitalFileUncheckedCreateNestedOneWithoutProductInput
    digitalLicense?: DigitalLicenseUncheckedCreateNestedOneWithoutProductInput
    digitalAccess?: DigitalAccessUncheckedCreateNestedOneWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutBundleItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutBundleItemsInput, ProductUncheckedCreateWithoutBundleItemsInput>
  }

  export type BundleUpsertWithoutItemsInput = {
    update: XOR<BundleUpdateWithoutItemsInput, BundleUncheckedUpdateWithoutItemsInput>
    create: XOR<BundleCreateWithoutItemsInput, BundleUncheckedCreateWithoutItemsInput>
    where?: BundleWhereInput
  }

  export type BundleUpdateToOneWithWhereWithoutItemsInput = {
    where?: BundleWhereInput
    data: XOR<BundleUpdateWithoutItemsInput, BundleUncheckedUpdateWithoutItemsInput>
  }

  export type BundleUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: BundleUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutBundlesNestedInput
  }

  export type BundleUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vendorId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    images?: BundleUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutBundleItemsInput = {
    update: XOR<ProductUpdateWithoutBundleItemsInput, ProductUncheckedUpdateWithoutBundleItemsInput>
    create: XOR<ProductCreateWithoutBundleItemsInput, ProductUncheckedCreateWithoutBundleItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutBundleItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutBundleItemsInput, ProductUncheckedUpdateWithoutBundleItemsInput>
  }

  export type ProductUpdateWithoutBundleItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    digitalFile?: DigitalFileUpdateOneWithoutProductNestedInput
    digitalLicense?: DigitalLicenseUpdateOneWithoutProductNestedInput
    digitalAccess?: DigitalAccessUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutBundleItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    digitalFile?: DigitalFileUncheckedUpdateOneWithoutProductNestedInput
    digitalLicense?: DigitalLicenseUncheckedUpdateOneWithoutProductNestedInput
    digitalAccess?: DigitalAccessUncheckedUpdateOneWithoutProductNestedInput
  }

  export type CategoryCreateManyParentInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateManyCategoryInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    sku: string
    stockQuantity?: number
    vendorId: string
    images?: ProductCreateimagesInput | string[]
    isFeatured?: boolean
    productType?: $Enums.ProductType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BundleCreateManyCategoryInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    vendorId: string
    images?: BundleCreateimagesInput | string[]
    isFeatured?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUpdateManyWithoutParentNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
    bundles?: BundleUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
    bundles?: BundleUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    digitalFile?: DigitalFileUpdateOneWithoutProductNestedInput
    digitalLicense?: DigitalLicenseUpdateOneWithoutProductNestedInput
    digitalAccess?: DigitalAccessUpdateOneWithoutProductNestedInput
    bundleItems?: BundleItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    digitalFile?: DigitalFileUncheckedUpdateOneWithoutProductNestedInput
    digitalLicense?: DigitalLicenseUncheckedUpdateOneWithoutProductNestedInput
    digitalAccess?: DigitalAccessUncheckedUpdateOneWithoutProductNestedInput
    bundleItems?: BundleItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sku?: StringFieldUpdateOperationsInput | string
    stockQuantity?: IntFieldUpdateOperationsInput | number
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: ProductUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    productType?: EnumProductTypeFieldUpdateOperationsInput | $Enums.ProductType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BundleUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: BundleUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: BundleItemUpdateManyWithoutBundleNestedInput
  }

  export type BundleUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: BundleUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: BundleItemUncheckedUpdateManyWithoutBundleNestedInput
  }

  export type BundleUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    vendorId?: StringFieldUpdateOperationsInput | string
    images?: BundleUpdateimagesInput | string[]
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BundleItemCreateManyProductInput = {
    id?: string
    bundleId: string
    quantity?: number
  }

  export type BundleItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    bundle?: BundleUpdateOneRequiredWithoutItemsNestedInput
  }

  export type BundleItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type BundleItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type LicenseKeyCreateManyDigitalLicenseInput = {
    id?: string
    key: string
    isRedeemed?: boolean
    redeemedAt?: Date | string | null
    redeemedBy?: string | null
    createdAt?: Date | string
  }

  export type LicenseKeyUpdateWithoutDigitalLicenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    isRedeemed?: BoolFieldUpdateOperationsInput | boolean
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LicenseKeyUncheckedUpdateWithoutDigitalLicenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    isRedeemed?: BoolFieldUpdateOperationsInput | boolean
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LicenseKeyUncheckedUpdateManyWithoutDigitalLicenseInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    isRedeemed?: BoolFieldUpdateOperationsInput | boolean
    redeemedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redeemedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BundleItemCreateManyBundleInput = {
    id?: string
    productId: string
    quantity?: number
  }

  export type BundleItemUpdateWithoutBundleInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutBundleItemsNestedInput
  }

  export type BundleItemUncheckedUpdateWithoutBundleInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type BundleItemUncheckedUpdateManyWithoutBundleInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DigitalLicenseCountOutputTypeDefaultArgs instead
     */
    export type DigitalLicenseCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DigitalLicenseCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BundleCountOutputTypeDefaultArgs instead
     */
    export type BundleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BundleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DigitalFileDefaultArgs instead
     */
    export type DigitalFileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DigitalFileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DigitalLicenseDefaultArgs instead
     */
    export type DigitalLicenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DigitalLicenseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LicenseKeyDefaultArgs instead
     */
    export type LicenseKeyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LicenseKeyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DigitalAccessDefaultArgs instead
     */
    export type DigitalAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DigitalAccessDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BundleDefaultArgs instead
     */
    export type BundleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BundleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BundleItemDefaultArgs instead
     */
    export type BundleItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BundleItemDefaultArgs<ExtArgs>

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