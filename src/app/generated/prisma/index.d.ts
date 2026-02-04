
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model DomainIsu
 * 
 */
export type DomainIsu = $Result.DefaultSelection<Prisma.$DomainIsuPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model MasukanWarga
 * 
 */
export type MasukanWarga = $Result.DefaultSelection<Prisma.$MasukanWargaPayload>
/**
 * Model DataMaster
 * 
 */
export type DataMaster = $Result.DefaultSelection<Prisma.$DataMasterPayload>
/**
 * Model Rekomendasi
 * 
 */
export type Rekomendasi = $Result.DefaultSelection<Prisma.$RekomendasiPayload>
/**
 * Model RekomendasiMasukan
 * 
 */
export type RekomendasiMasukan = $Result.DefaultSelection<Prisma.$RekomendasiMasukanPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model KegiatanRapat
 * 
 */
export type KegiatanRapat = $Result.DefaultSelection<Prisma.$KegiatanRapatPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  LURAH: 'LURAH',
  PERANGKAT_DESA: 'PERANGKAT_DESA',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const StatusMasukan: {
  MENUNGGU: 'MENUNGGU',
  DIVERIFIKASI: 'DIVERIFIKASI',
  DITOLAK: 'DITOLAK'
};

export type StatusMasukan = (typeof StatusMasukan)[keyof typeof StatusMasukan]


export const StatusRekomendasi: {
  DRAFT: 'DRAFT',
  DIAJUKAN: 'DIAJUKAN',
  DISETUJUI: 'DISETUJUI',
  DITOLAK: 'DITOLAK'
};

export type StatusRekomendasi = (typeof StatusRekomendasi)[keyof typeof StatusRekomendasi]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type StatusMasukan = $Enums.StatusMasukan

export const StatusMasukan: typeof $Enums.StatusMasukan

export type StatusRekomendasi = $Enums.StatusRekomendasi

export const StatusRekomendasi: typeof $Enums.StatusRekomendasi

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DomainIsus
 * const domainIsus = await prisma.domainIsu.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more DomainIsus
   * const domainIsus = await prisma.domainIsu.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.domainIsu`: Exposes CRUD operations for the **DomainIsu** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DomainIsus
    * const domainIsus = await prisma.domainIsu.findMany()
    * ```
    */
  get domainIsu(): Prisma.DomainIsuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.masukanWarga`: Exposes CRUD operations for the **MasukanWarga** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MasukanWargas
    * const masukanWargas = await prisma.masukanWarga.findMany()
    * ```
    */
  get masukanWarga(): Prisma.MasukanWargaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dataMaster`: Exposes CRUD operations for the **DataMaster** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DataMasters
    * const dataMasters = await prisma.dataMaster.findMany()
    * ```
    */
  get dataMaster(): Prisma.DataMasterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rekomendasi`: Exposes CRUD operations for the **Rekomendasi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rekomendasis
    * const rekomendasis = await prisma.rekomendasi.findMany()
    * ```
    */
  get rekomendasi(): Prisma.RekomendasiDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rekomendasiMasukan`: Exposes CRUD operations for the **RekomendasiMasukan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RekomendasiMasukans
    * const rekomendasiMasukans = await prisma.rekomendasiMasukan.findMany()
    * ```
    */
  get rekomendasiMasukan(): Prisma.RekomendasiMasukanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kegiatanRapat`: Exposes CRUD operations for the **KegiatanRapat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KegiatanRapats
    * const kegiatanRapats = await prisma.kegiatanRapat.findMany()
    * ```
    */
  get kegiatanRapat(): Prisma.KegiatanRapatDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    DomainIsu: 'DomainIsu',
    User: 'User',
    MasukanWarga: 'MasukanWarga',
    DataMaster: 'DataMaster',
    Rekomendasi: 'Rekomendasi',
    RekomendasiMasukan: 'RekomendasiMasukan',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    KegiatanRapat: 'KegiatanRapat'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "domainIsu" | "user" | "masukanWarga" | "dataMaster" | "rekomendasi" | "rekomendasiMasukan" | "session" | "account" | "verification" | "kegiatanRapat"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DomainIsu: {
        payload: Prisma.$DomainIsuPayload<ExtArgs>
        fields: Prisma.DomainIsuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DomainIsuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainIsuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DomainIsuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainIsuPayload>
          }
          findFirst: {
            args: Prisma.DomainIsuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainIsuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DomainIsuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainIsuPayload>
          }
          findMany: {
            args: Prisma.DomainIsuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainIsuPayload>[]
          }
          create: {
            args: Prisma.DomainIsuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainIsuPayload>
          }
          createMany: {
            args: Prisma.DomainIsuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DomainIsuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainIsuPayload>[]
          }
          delete: {
            args: Prisma.DomainIsuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainIsuPayload>
          }
          update: {
            args: Prisma.DomainIsuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainIsuPayload>
          }
          deleteMany: {
            args: Prisma.DomainIsuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DomainIsuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DomainIsuUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainIsuPayload>[]
          }
          upsert: {
            args: Prisma.DomainIsuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainIsuPayload>
          }
          aggregate: {
            args: Prisma.DomainIsuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDomainIsu>
          }
          groupBy: {
            args: Prisma.DomainIsuGroupByArgs<ExtArgs>
            result: $Utils.Optional<DomainIsuGroupByOutputType>[]
          }
          count: {
            args: Prisma.DomainIsuCountArgs<ExtArgs>
            result: $Utils.Optional<DomainIsuCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      MasukanWarga: {
        payload: Prisma.$MasukanWargaPayload<ExtArgs>
        fields: Prisma.MasukanWargaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MasukanWargaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasukanWargaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MasukanWargaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasukanWargaPayload>
          }
          findFirst: {
            args: Prisma.MasukanWargaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasukanWargaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MasukanWargaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasukanWargaPayload>
          }
          findMany: {
            args: Prisma.MasukanWargaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasukanWargaPayload>[]
          }
          create: {
            args: Prisma.MasukanWargaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasukanWargaPayload>
          }
          createMany: {
            args: Prisma.MasukanWargaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MasukanWargaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasukanWargaPayload>[]
          }
          delete: {
            args: Prisma.MasukanWargaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasukanWargaPayload>
          }
          update: {
            args: Prisma.MasukanWargaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasukanWargaPayload>
          }
          deleteMany: {
            args: Prisma.MasukanWargaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MasukanWargaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MasukanWargaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasukanWargaPayload>[]
          }
          upsert: {
            args: Prisma.MasukanWargaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MasukanWargaPayload>
          }
          aggregate: {
            args: Prisma.MasukanWargaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMasukanWarga>
          }
          groupBy: {
            args: Prisma.MasukanWargaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MasukanWargaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MasukanWargaCountArgs<ExtArgs>
            result: $Utils.Optional<MasukanWargaCountAggregateOutputType> | number
          }
        }
      }
      DataMaster: {
        payload: Prisma.$DataMasterPayload<ExtArgs>
        fields: Prisma.DataMasterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DataMasterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMasterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DataMasterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMasterPayload>
          }
          findFirst: {
            args: Prisma.DataMasterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMasterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DataMasterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMasterPayload>
          }
          findMany: {
            args: Prisma.DataMasterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMasterPayload>[]
          }
          create: {
            args: Prisma.DataMasterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMasterPayload>
          }
          createMany: {
            args: Prisma.DataMasterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DataMasterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMasterPayload>[]
          }
          delete: {
            args: Prisma.DataMasterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMasterPayload>
          }
          update: {
            args: Prisma.DataMasterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMasterPayload>
          }
          deleteMany: {
            args: Prisma.DataMasterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DataMasterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DataMasterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMasterPayload>[]
          }
          upsert: {
            args: Prisma.DataMasterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataMasterPayload>
          }
          aggregate: {
            args: Prisma.DataMasterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDataMaster>
          }
          groupBy: {
            args: Prisma.DataMasterGroupByArgs<ExtArgs>
            result: $Utils.Optional<DataMasterGroupByOutputType>[]
          }
          count: {
            args: Prisma.DataMasterCountArgs<ExtArgs>
            result: $Utils.Optional<DataMasterCountAggregateOutputType> | number
          }
        }
      }
      Rekomendasi: {
        payload: Prisma.$RekomendasiPayload<ExtArgs>
        fields: Prisma.RekomendasiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RekomendasiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RekomendasiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiPayload>
          }
          findFirst: {
            args: Prisma.RekomendasiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RekomendasiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiPayload>
          }
          findMany: {
            args: Prisma.RekomendasiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiPayload>[]
          }
          create: {
            args: Prisma.RekomendasiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiPayload>
          }
          createMany: {
            args: Prisma.RekomendasiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RekomendasiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiPayload>[]
          }
          delete: {
            args: Prisma.RekomendasiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiPayload>
          }
          update: {
            args: Prisma.RekomendasiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiPayload>
          }
          deleteMany: {
            args: Prisma.RekomendasiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RekomendasiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RekomendasiUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiPayload>[]
          }
          upsert: {
            args: Prisma.RekomendasiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiPayload>
          }
          aggregate: {
            args: Prisma.RekomendasiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRekomendasi>
          }
          groupBy: {
            args: Prisma.RekomendasiGroupByArgs<ExtArgs>
            result: $Utils.Optional<RekomendasiGroupByOutputType>[]
          }
          count: {
            args: Prisma.RekomendasiCountArgs<ExtArgs>
            result: $Utils.Optional<RekomendasiCountAggregateOutputType> | number
          }
        }
      }
      RekomendasiMasukan: {
        payload: Prisma.$RekomendasiMasukanPayload<ExtArgs>
        fields: Prisma.RekomendasiMasukanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RekomendasiMasukanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiMasukanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RekomendasiMasukanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiMasukanPayload>
          }
          findFirst: {
            args: Prisma.RekomendasiMasukanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiMasukanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RekomendasiMasukanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiMasukanPayload>
          }
          findMany: {
            args: Prisma.RekomendasiMasukanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiMasukanPayload>[]
          }
          create: {
            args: Prisma.RekomendasiMasukanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiMasukanPayload>
          }
          createMany: {
            args: Prisma.RekomendasiMasukanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RekomendasiMasukanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiMasukanPayload>[]
          }
          delete: {
            args: Prisma.RekomendasiMasukanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiMasukanPayload>
          }
          update: {
            args: Prisma.RekomendasiMasukanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiMasukanPayload>
          }
          deleteMany: {
            args: Prisma.RekomendasiMasukanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RekomendasiMasukanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RekomendasiMasukanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiMasukanPayload>[]
          }
          upsert: {
            args: Prisma.RekomendasiMasukanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RekomendasiMasukanPayload>
          }
          aggregate: {
            args: Prisma.RekomendasiMasukanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRekomendasiMasukan>
          }
          groupBy: {
            args: Prisma.RekomendasiMasukanGroupByArgs<ExtArgs>
            result: $Utils.Optional<RekomendasiMasukanGroupByOutputType>[]
          }
          count: {
            args: Prisma.RekomendasiMasukanCountArgs<ExtArgs>
            result: $Utils.Optional<RekomendasiMasukanCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      KegiatanRapat: {
        payload: Prisma.$KegiatanRapatPayload<ExtArgs>
        fields: Prisma.KegiatanRapatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KegiatanRapatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KegiatanRapatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KegiatanRapatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KegiatanRapatPayload>
          }
          findFirst: {
            args: Prisma.KegiatanRapatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KegiatanRapatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KegiatanRapatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KegiatanRapatPayload>
          }
          findMany: {
            args: Prisma.KegiatanRapatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KegiatanRapatPayload>[]
          }
          create: {
            args: Prisma.KegiatanRapatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KegiatanRapatPayload>
          }
          createMany: {
            args: Prisma.KegiatanRapatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KegiatanRapatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KegiatanRapatPayload>[]
          }
          delete: {
            args: Prisma.KegiatanRapatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KegiatanRapatPayload>
          }
          update: {
            args: Prisma.KegiatanRapatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KegiatanRapatPayload>
          }
          deleteMany: {
            args: Prisma.KegiatanRapatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KegiatanRapatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KegiatanRapatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KegiatanRapatPayload>[]
          }
          upsert: {
            args: Prisma.KegiatanRapatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KegiatanRapatPayload>
          }
          aggregate: {
            args: Prisma.KegiatanRapatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKegiatanRapat>
          }
          groupBy: {
            args: Prisma.KegiatanRapatGroupByArgs<ExtArgs>
            result: $Utils.Optional<KegiatanRapatGroupByOutputType>[]
          }
          count: {
            args: Prisma.KegiatanRapatCountArgs<ExtArgs>
            result: $Utils.Optional<KegiatanRapatCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    domainIsu?: DomainIsuOmit
    user?: UserOmit
    masukanWarga?: MasukanWargaOmit
    dataMaster?: DataMasterOmit
    rekomendasi?: RekomendasiOmit
    rekomendasiMasukan?: RekomendasiMasukanOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
    kegiatanRapat?: KegiatanRapatOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'updateManyAndReturn'
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
   * Count Type DomainIsuCountOutputType
   */

  export type DomainIsuCountOutputType = {
    masukan: number
    dataMaster: number
    rekomendasi: number
    kegiatanRapat: number
  }

  export type DomainIsuCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    masukan?: boolean | DomainIsuCountOutputTypeCountMasukanArgs
    dataMaster?: boolean | DomainIsuCountOutputTypeCountDataMasterArgs
    rekomendasi?: boolean | DomainIsuCountOutputTypeCountRekomendasiArgs
    kegiatanRapat?: boolean | DomainIsuCountOutputTypeCountKegiatanRapatArgs
  }

  // Custom InputTypes
  /**
   * DomainIsuCountOutputType without action
   */
  export type DomainIsuCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsuCountOutputType
     */
    select?: DomainIsuCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DomainIsuCountOutputType without action
   */
  export type DomainIsuCountOutputTypeCountMasukanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasukanWargaWhereInput
  }

  /**
   * DomainIsuCountOutputType without action
   */
  export type DomainIsuCountOutputTypeCountDataMasterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DataMasterWhereInput
  }

  /**
   * DomainIsuCountOutputType without action
   */
  export type DomainIsuCountOutputTypeCountRekomendasiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekomendasiWhereInput
  }

  /**
   * DomainIsuCountOutputType without action
   */
  export type DomainIsuCountOutputTypeCountKegiatanRapatArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KegiatanRapatWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    masukanVerifikasi: number
    rekomendasiDiproses: number
    sessions: number
    accounts: number
    kegiatanRapat: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    masukanVerifikasi?: boolean | UserCountOutputTypeCountMasukanVerifikasiArgs
    rekomendasiDiproses?: boolean | UserCountOutputTypeCountRekomendasiDiprosesArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    kegiatanRapat?: boolean | UserCountOutputTypeCountKegiatanRapatArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMasukanVerifikasiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasukanWargaWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRekomendasiDiprosesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekomendasiWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountKegiatanRapatArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KegiatanRapatWhereInput
  }


  /**
   * Count Type MasukanWargaCountOutputType
   */

  export type MasukanWargaCountOutputType = {
    rekomendasiLinks: number
  }

  export type MasukanWargaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rekomendasiLinks?: boolean | MasukanWargaCountOutputTypeCountRekomendasiLinksArgs
  }

  // Custom InputTypes
  /**
   * MasukanWargaCountOutputType without action
   */
  export type MasukanWargaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWargaCountOutputType
     */
    select?: MasukanWargaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MasukanWargaCountOutputType without action
   */
  export type MasukanWargaCountOutputTypeCountRekomendasiLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekomendasiMasukanWhereInput
  }


  /**
   * Count Type RekomendasiCountOutputType
   */

  export type RekomendasiCountOutputType = {
    masukanLinks: number
  }

  export type RekomendasiCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    masukanLinks?: boolean | RekomendasiCountOutputTypeCountMasukanLinksArgs
  }

  // Custom InputTypes
  /**
   * RekomendasiCountOutputType without action
   */
  export type RekomendasiCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiCountOutputType
     */
    select?: RekomendasiCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RekomendasiCountOutputType without action
   */
  export type RekomendasiCountOutputTypeCountMasukanLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekomendasiMasukanWhereInput
  }


  /**
   * Count Type KegiatanRapatCountOutputType
   */

  export type KegiatanRapatCountOutputType = {
    rekomendasi: number
  }

  export type KegiatanRapatCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rekomendasi?: boolean | KegiatanRapatCountOutputTypeCountRekomendasiArgs
  }

  // Custom InputTypes
  /**
   * KegiatanRapatCountOutputType without action
   */
  export type KegiatanRapatCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapatCountOutputType
     */
    select?: KegiatanRapatCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KegiatanRapatCountOutputType without action
   */
  export type KegiatanRapatCountOutputTypeCountRekomendasiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekomendasiWhereInput
  }


  /**
   * Models
   */

  /**
   * Model DomainIsu
   */

  export type AggregateDomainIsu = {
    _count: DomainIsuCountAggregateOutputType | null
    _min: DomainIsuMinAggregateOutputType | null
    _max: DomainIsuMaxAggregateOutputType | null
  }

  export type DomainIsuMinAggregateOutputType = {
    id: string | null
    code: string | null
    nama: string | null
    deskripsi: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DomainIsuMaxAggregateOutputType = {
    id: string | null
    code: string | null
    nama: string | null
    deskripsi: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DomainIsuCountAggregateOutputType = {
    id: number
    code: number
    nama: number
    deskripsi: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DomainIsuMinAggregateInputType = {
    id?: true
    code?: true
    nama?: true
    deskripsi?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DomainIsuMaxAggregateInputType = {
    id?: true
    code?: true
    nama?: true
    deskripsi?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DomainIsuCountAggregateInputType = {
    id?: true
    code?: true
    nama?: true
    deskripsi?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DomainIsuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DomainIsu to aggregate.
     */
    where?: DomainIsuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DomainIsus to fetch.
     */
    orderBy?: DomainIsuOrderByWithRelationInput | DomainIsuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DomainIsuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DomainIsus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DomainIsus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DomainIsus
    **/
    _count?: true | DomainIsuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DomainIsuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DomainIsuMaxAggregateInputType
  }

  export type GetDomainIsuAggregateType<T extends DomainIsuAggregateArgs> = {
        [P in keyof T & keyof AggregateDomainIsu]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDomainIsu[P]>
      : GetScalarType<T[P], AggregateDomainIsu[P]>
  }




  export type DomainIsuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DomainIsuWhereInput
    orderBy?: DomainIsuOrderByWithAggregationInput | DomainIsuOrderByWithAggregationInput[]
    by: DomainIsuScalarFieldEnum[] | DomainIsuScalarFieldEnum
    having?: DomainIsuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DomainIsuCountAggregateInputType | true
    _min?: DomainIsuMinAggregateInputType
    _max?: DomainIsuMaxAggregateInputType
  }

  export type DomainIsuGroupByOutputType = {
    id: string
    code: string
    nama: string
    deskripsi: string | null
    createdAt: Date
    updatedAt: Date
    _count: DomainIsuCountAggregateOutputType | null
    _min: DomainIsuMinAggregateOutputType | null
    _max: DomainIsuMaxAggregateOutputType | null
  }

  type GetDomainIsuGroupByPayload<T extends DomainIsuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DomainIsuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DomainIsuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DomainIsuGroupByOutputType[P]>
            : GetScalarType<T[P], DomainIsuGroupByOutputType[P]>
        }
      >
    >


  export type DomainIsuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    nama?: boolean
    deskripsi?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    masukan?: boolean | DomainIsu$masukanArgs<ExtArgs>
    dataMaster?: boolean | DomainIsu$dataMasterArgs<ExtArgs>
    rekomendasi?: boolean | DomainIsu$rekomendasiArgs<ExtArgs>
    kegiatanRapat?: boolean | DomainIsu$kegiatanRapatArgs<ExtArgs>
    _count?: boolean | DomainIsuCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["domainIsu"]>

  export type DomainIsuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    nama?: boolean
    deskripsi?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["domainIsu"]>

  export type DomainIsuSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    nama?: boolean
    deskripsi?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["domainIsu"]>

  export type DomainIsuSelectScalar = {
    id?: boolean
    code?: boolean
    nama?: boolean
    deskripsi?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DomainIsuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "nama" | "deskripsi" | "createdAt" | "updatedAt", ExtArgs["result"]["domainIsu"]>
  export type DomainIsuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    masukan?: boolean | DomainIsu$masukanArgs<ExtArgs>
    dataMaster?: boolean | DomainIsu$dataMasterArgs<ExtArgs>
    rekomendasi?: boolean | DomainIsu$rekomendasiArgs<ExtArgs>
    kegiatanRapat?: boolean | DomainIsu$kegiatanRapatArgs<ExtArgs>
    _count?: boolean | DomainIsuCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DomainIsuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DomainIsuIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DomainIsuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DomainIsu"
    objects: {
      masukan: Prisma.$MasukanWargaPayload<ExtArgs>[]
      dataMaster: Prisma.$DataMasterPayload<ExtArgs>[]
      rekomendasi: Prisma.$RekomendasiPayload<ExtArgs>[]
      kegiatanRapat: Prisma.$KegiatanRapatPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      nama: string
      deskripsi: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["domainIsu"]>
    composites: {}
  }

  type DomainIsuGetPayload<S extends boolean | null | undefined | DomainIsuDefaultArgs> = $Result.GetResult<Prisma.$DomainIsuPayload, S>

  type DomainIsuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DomainIsuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DomainIsuCountAggregateInputType | true
    }

  export interface DomainIsuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DomainIsu'], meta: { name: 'DomainIsu' } }
    /**
     * Find zero or one DomainIsu that matches the filter.
     * @param {DomainIsuFindUniqueArgs} args - Arguments to find a DomainIsu
     * @example
     * // Get one DomainIsu
     * const domainIsu = await prisma.domainIsu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DomainIsuFindUniqueArgs>(args: SelectSubset<T, DomainIsuFindUniqueArgs<ExtArgs>>): Prisma__DomainIsuClient<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DomainIsu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DomainIsuFindUniqueOrThrowArgs} args - Arguments to find a DomainIsu
     * @example
     * // Get one DomainIsu
     * const domainIsu = await prisma.domainIsu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DomainIsuFindUniqueOrThrowArgs>(args: SelectSubset<T, DomainIsuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DomainIsuClient<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DomainIsu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainIsuFindFirstArgs} args - Arguments to find a DomainIsu
     * @example
     * // Get one DomainIsu
     * const domainIsu = await prisma.domainIsu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DomainIsuFindFirstArgs>(args?: SelectSubset<T, DomainIsuFindFirstArgs<ExtArgs>>): Prisma__DomainIsuClient<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DomainIsu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainIsuFindFirstOrThrowArgs} args - Arguments to find a DomainIsu
     * @example
     * // Get one DomainIsu
     * const domainIsu = await prisma.domainIsu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DomainIsuFindFirstOrThrowArgs>(args?: SelectSubset<T, DomainIsuFindFirstOrThrowArgs<ExtArgs>>): Prisma__DomainIsuClient<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DomainIsus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainIsuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DomainIsus
     * const domainIsus = await prisma.domainIsu.findMany()
     * 
     * // Get first 10 DomainIsus
     * const domainIsus = await prisma.domainIsu.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const domainIsuWithIdOnly = await prisma.domainIsu.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DomainIsuFindManyArgs>(args?: SelectSubset<T, DomainIsuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DomainIsu.
     * @param {DomainIsuCreateArgs} args - Arguments to create a DomainIsu.
     * @example
     * // Create one DomainIsu
     * const DomainIsu = await prisma.domainIsu.create({
     *   data: {
     *     // ... data to create a DomainIsu
     *   }
     * })
     * 
     */
    create<T extends DomainIsuCreateArgs>(args: SelectSubset<T, DomainIsuCreateArgs<ExtArgs>>): Prisma__DomainIsuClient<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DomainIsus.
     * @param {DomainIsuCreateManyArgs} args - Arguments to create many DomainIsus.
     * @example
     * // Create many DomainIsus
     * const domainIsu = await prisma.domainIsu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DomainIsuCreateManyArgs>(args?: SelectSubset<T, DomainIsuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DomainIsus and returns the data saved in the database.
     * @param {DomainIsuCreateManyAndReturnArgs} args - Arguments to create many DomainIsus.
     * @example
     * // Create many DomainIsus
     * const domainIsu = await prisma.domainIsu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DomainIsus and only return the `id`
     * const domainIsuWithIdOnly = await prisma.domainIsu.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DomainIsuCreateManyAndReturnArgs>(args?: SelectSubset<T, DomainIsuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DomainIsu.
     * @param {DomainIsuDeleteArgs} args - Arguments to delete one DomainIsu.
     * @example
     * // Delete one DomainIsu
     * const DomainIsu = await prisma.domainIsu.delete({
     *   where: {
     *     // ... filter to delete one DomainIsu
     *   }
     * })
     * 
     */
    delete<T extends DomainIsuDeleteArgs>(args: SelectSubset<T, DomainIsuDeleteArgs<ExtArgs>>): Prisma__DomainIsuClient<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DomainIsu.
     * @param {DomainIsuUpdateArgs} args - Arguments to update one DomainIsu.
     * @example
     * // Update one DomainIsu
     * const domainIsu = await prisma.domainIsu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DomainIsuUpdateArgs>(args: SelectSubset<T, DomainIsuUpdateArgs<ExtArgs>>): Prisma__DomainIsuClient<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DomainIsus.
     * @param {DomainIsuDeleteManyArgs} args - Arguments to filter DomainIsus to delete.
     * @example
     * // Delete a few DomainIsus
     * const { count } = await prisma.domainIsu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DomainIsuDeleteManyArgs>(args?: SelectSubset<T, DomainIsuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DomainIsus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainIsuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DomainIsus
     * const domainIsu = await prisma.domainIsu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DomainIsuUpdateManyArgs>(args: SelectSubset<T, DomainIsuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DomainIsus and returns the data updated in the database.
     * @param {DomainIsuUpdateManyAndReturnArgs} args - Arguments to update many DomainIsus.
     * @example
     * // Update many DomainIsus
     * const domainIsu = await prisma.domainIsu.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DomainIsus and only return the `id`
     * const domainIsuWithIdOnly = await prisma.domainIsu.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DomainIsuUpdateManyAndReturnArgs>(args: SelectSubset<T, DomainIsuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DomainIsu.
     * @param {DomainIsuUpsertArgs} args - Arguments to update or create a DomainIsu.
     * @example
     * // Update or create a DomainIsu
     * const domainIsu = await prisma.domainIsu.upsert({
     *   create: {
     *     // ... data to create a DomainIsu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DomainIsu we want to update
     *   }
     * })
     */
    upsert<T extends DomainIsuUpsertArgs>(args: SelectSubset<T, DomainIsuUpsertArgs<ExtArgs>>): Prisma__DomainIsuClient<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DomainIsus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainIsuCountArgs} args - Arguments to filter DomainIsus to count.
     * @example
     * // Count the number of DomainIsus
     * const count = await prisma.domainIsu.count({
     *   where: {
     *     // ... the filter for the DomainIsus we want to count
     *   }
     * })
    **/
    count<T extends DomainIsuCountArgs>(
      args?: Subset<T, DomainIsuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DomainIsuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DomainIsu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainIsuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DomainIsuAggregateArgs>(args: Subset<T, DomainIsuAggregateArgs>): Prisma.PrismaPromise<GetDomainIsuAggregateType<T>>

    /**
     * Group by DomainIsu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainIsuGroupByArgs} args - Group by arguments.
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
      T extends DomainIsuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DomainIsuGroupByArgs['orderBy'] }
        : { orderBy?: DomainIsuGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DomainIsuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDomainIsuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DomainIsu model
   */
  readonly fields: DomainIsuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DomainIsu.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DomainIsuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    masukan<T extends DomainIsu$masukanArgs<ExtArgs> = {}>(args?: Subset<T, DomainIsu$masukanArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dataMaster<T extends DomainIsu$dataMasterArgs<ExtArgs> = {}>(args?: Subset<T, DomainIsu$dataMasterArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rekomendasi<T extends DomainIsu$rekomendasiArgs<ExtArgs> = {}>(args?: Subset<T, DomainIsu$rekomendasiArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    kegiatanRapat<T extends DomainIsu$kegiatanRapatArgs<ExtArgs> = {}>(args?: Subset<T, DomainIsu$kegiatanRapatArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the DomainIsu model
   */
  interface DomainIsuFieldRefs {
    readonly id: FieldRef<"DomainIsu", 'String'>
    readonly code: FieldRef<"DomainIsu", 'String'>
    readonly nama: FieldRef<"DomainIsu", 'String'>
    readonly deskripsi: FieldRef<"DomainIsu", 'String'>
    readonly createdAt: FieldRef<"DomainIsu", 'DateTime'>
    readonly updatedAt: FieldRef<"DomainIsu", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DomainIsu findUnique
   */
  export type DomainIsuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIsuInclude<ExtArgs> | null
    /**
     * Filter, which DomainIsu to fetch.
     */
    where: DomainIsuWhereUniqueInput
  }

  /**
   * DomainIsu findUniqueOrThrow
   */
  export type DomainIsuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIsuInclude<ExtArgs> | null
    /**
     * Filter, which DomainIsu to fetch.
     */
    where: DomainIsuWhereUniqueInput
  }

  /**
   * DomainIsu findFirst
   */
  export type DomainIsuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIsuInclude<ExtArgs> | null
    /**
     * Filter, which DomainIsu to fetch.
     */
    where?: DomainIsuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DomainIsus to fetch.
     */
    orderBy?: DomainIsuOrderByWithRelationInput | DomainIsuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DomainIsus.
     */
    cursor?: DomainIsuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DomainIsus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DomainIsus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DomainIsus.
     */
    distinct?: DomainIsuScalarFieldEnum | DomainIsuScalarFieldEnum[]
  }

  /**
   * DomainIsu findFirstOrThrow
   */
  export type DomainIsuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIsuInclude<ExtArgs> | null
    /**
     * Filter, which DomainIsu to fetch.
     */
    where?: DomainIsuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DomainIsus to fetch.
     */
    orderBy?: DomainIsuOrderByWithRelationInput | DomainIsuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DomainIsus.
     */
    cursor?: DomainIsuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DomainIsus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DomainIsus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DomainIsus.
     */
    distinct?: DomainIsuScalarFieldEnum | DomainIsuScalarFieldEnum[]
  }

  /**
   * DomainIsu findMany
   */
  export type DomainIsuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIsuInclude<ExtArgs> | null
    /**
     * Filter, which DomainIsus to fetch.
     */
    where?: DomainIsuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DomainIsus to fetch.
     */
    orderBy?: DomainIsuOrderByWithRelationInput | DomainIsuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DomainIsus.
     */
    cursor?: DomainIsuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DomainIsus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DomainIsus.
     */
    skip?: number
    distinct?: DomainIsuScalarFieldEnum | DomainIsuScalarFieldEnum[]
  }

  /**
   * DomainIsu create
   */
  export type DomainIsuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIsuInclude<ExtArgs> | null
    /**
     * The data needed to create a DomainIsu.
     */
    data: XOR<DomainIsuCreateInput, DomainIsuUncheckedCreateInput>
  }

  /**
   * DomainIsu createMany
   */
  export type DomainIsuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DomainIsus.
     */
    data: DomainIsuCreateManyInput | DomainIsuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DomainIsu createManyAndReturn
   */
  export type DomainIsuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * The data used to create many DomainIsus.
     */
    data: DomainIsuCreateManyInput | DomainIsuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DomainIsu update
   */
  export type DomainIsuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIsuInclude<ExtArgs> | null
    /**
     * The data needed to update a DomainIsu.
     */
    data: XOR<DomainIsuUpdateInput, DomainIsuUncheckedUpdateInput>
    /**
     * Choose, which DomainIsu to update.
     */
    where: DomainIsuWhereUniqueInput
  }

  /**
   * DomainIsu updateMany
   */
  export type DomainIsuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DomainIsus.
     */
    data: XOR<DomainIsuUpdateManyMutationInput, DomainIsuUncheckedUpdateManyInput>
    /**
     * Filter which DomainIsus to update
     */
    where?: DomainIsuWhereInput
    /**
     * Limit how many DomainIsus to update.
     */
    limit?: number
  }

  /**
   * DomainIsu updateManyAndReturn
   */
  export type DomainIsuUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * The data used to update DomainIsus.
     */
    data: XOR<DomainIsuUpdateManyMutationInput, DomainIsuUncheckedUpdateManyInput>
    /**
     * Filter which DomainIsus to update
     */
    where?: DomainIsuWhereInput
    /**
     * Limit how many DomainIsus to update.
     */
    limit?: number
  }

  /**
   * DomainIsu upsert
   */
  export type DomainIsuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIsuInclude<ExtArgs> | null
    /**
     * The filter to search for the DomainIsu to update in case it exists.
     */
    where: DomainIsuWhereUniqueInput
    /**
     * In case the DomainIsu found by the `where` argument doesn't exist, create a new DomainIsu with this data.
     */
    create: XOR<DomainIsuCreateInput, DomainIsuUncheckedCreateInput>
    /**
     * In case the DomainIsu was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DomainIsuUpdateInput, DomainIsuUncheckedUpdateInput>
  }

  /**
   * DomainIsu delete
   */
  export type DomainIsuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIsuInclude<ExtArgs> | null
    /**
     * Filter which DomainIsu to delete.
     */
    where: DomainIsuWhereUniqueInput
  }

  /**
   * DomainIsu deleteMany
   */
  export type DomainIsuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DomainIsus to delete
     */
    where?: DomainIsuWhereInput
    /**
     * Limit how many DomainIsus to delete.
     */
    limit?: number
  }

  /**
   * DomainIsu.masukan
   */
  export type DomainIsu$masukanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaInclude<ExtArgs> | null
    where?: MasukanWargaWhereInput
    orderBy?: MasukanWargaOrderByWithRelationInput | MasukanWargaOrderByWithRelationInput[]
    cursor?: MasukanWargaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MasukanWargaScalarFieldEnum | MasukanWargaScalarFieldEnum[]
  }

  /**
   * DomainIsu.dataMaster
   */
  export type DomainIsu$dataMasterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterInclude<ExtArgs> | null
    where?: DataMasterWhereInput
    orderBy?: DataMasterOrderByWithRelationInput | DataMasterOrderByWithRelationInput[]
    cursor?: DataMasterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DataMasterScalarFieldEnum | DataMasterScalarFieldEnum[]
  }

  /**
   * DomainIsu.rekomendasi
   */
  export type DomainIsu$rekomendasiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
    where?: RekomendasiWhereInput
    orderBy?: RekomendasiOrderByWithRelationInput | RekomendasiOrderByWithRelationInput[]
    cursor?: RekomendasiWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RekomendasiScalarFieldEnum | RekomendasiScalarFieldEnum[]
  }

  /**
   * DomainIsu.kegiatanRapat
   */
  export type DomainIsu$kegiatanRapatArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatInclude<ExtArgs> | null
    where?: KegiatanRapatWhereInput
    orderBy?: KegiatanRapatOrderByWithRelationInput | KegiatanRapatOrderByWithRelationInput[]
    cursor?: KegiatanRapatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KegiatanRapatScalarFieldEnum | KegiatanRapatScalarFieldEnum[]
  }

  /**
   * DomainIsu without action
   */
  export type DomainIsuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIsuInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    jabatan: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    emailVerified: boolean | null
    image: string | null
    phoneNumber: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    jabatan: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    emailVerified: boolean | null
    image: string | null
    phoneNumber: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    jabatan: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    emailVerified: number
    image: number
    phoneNumber: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    jabatan?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    emailVerified?: true
    image?: true
    phoneNumber?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    jabatan?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    emailVerified?: true
    image?: true
    phoneNumber?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    jabatan?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    emailVerified?: true
    image?: true
    phoneNumber?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    jabatan: string | null
    role: $Enums.Role
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    emailVerified: boolean
    image: string | null
    phoneNumber: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    jabatan?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emailVerified?: boolean
    image?: boolean
    phoneNumber?: boolean
    masukanVerifikasi?: boolean | User$masukanVerifikasiArgs<ExtArgs>
    rekomendasiDiproses?: boolean | User$rekomendasiDiprosesArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    kegiatanRapat?: boolean | User$kegiatanRapatArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    jabatan?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emailVerified?: boolean
    image?: boolean
    phoneNumber?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    jabatan?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emailVerified?: boolean
    image?: boolean
    phoneNumber?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    jabatan?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emailVerified?: boolean
    image?: boolean
    phoneNumber?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "jabatan" | "role" | "isActive" | "createdAt" | "updatedAt" | "emailVerified" | "image" | "phoneNumber", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    masukanVerifikasi?: boolean | User$masukanVerifikasiArgs<ExtArgs>
    rekomendasiDiproses?: boolean | User$rekomendasiDiprosesArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    kegiatanRapat?: boolean | User$kegiatanRapatArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      masukanVerifikasi: Prisma.$MasukanWargaPayload<ExtArgs>[]
      rekomendasiDiproses: Prisma.$RekomendasiPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      kegiatanRapat: Prisma.$KegiatanRapatPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      jabatan: string | null
      role: $Enums.Role
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      emailVerified: boolean
      image: string | null
      phoneNumber: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    masukanVerifikasi<T extends User$masukanVerifikasiArgs<ExtArgs> = {}>(args?: Subset<T, User$masukanVerifikasiArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rekomendasiDiproses<T extends User$rekomendasiDiprosesArgs<ExtArgs> = {}>(args?: Subset<T, User$rekomendasiDiprosesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    kegiatanRapat<T extends User$kegiatanRapatArgs<ExtArgs> = {}>(args?: Subset<T, User$kegiatanRapatArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly jabatan: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.masukanVerifikasi
   */
  export type User$masukanVerifikasiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaInclude<ExtArgs> | null
    where?: MasukanWargaWhereInput
    orderBy?: MasukanWargaOrderByWithRelationInput | MasukanWargaOrderByWithRelationInput[]
    cursor?: MasukanWargaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MasukanWargaScalarFieldEnum | MasukanWargaScalarFieldEnum[]
  }

  /**
   * User.rekomendasiDiproses
   */
  export type User$rekomendasiDiprosesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
    where?: RekomendasiWhereInput
    orderBy?: RekomendasiOrderByWithRelationInput | RekomendasiOrderByWithRelationInput[]
    cursor?: RekomendasiWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RekomendasiScalarFieldEnum | RekomendasiScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.kegiatanRapat
   */
  export type User$kegiatanRapatArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatInclude<ExtArgs> | null
    where?: KegiatanRapatWhereInput
    orderBy?: KegiatanRapatOrderByWithRelationInput | KegiatanRapatOrderByWithRelationInput[]
    cursor?: KegiatanRapatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KegiatanRapatScalarFieldEnum | KegiatanRapatScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model MasukanWarga
   */

  export type AggregateMasukanWarga = {
    _count: MasukanWargaCountAggregateOutputType | null
    _avg: MasukanWargaAvgAggregateOutputType | null
    _sum: MasukanWargaSumAggregateOutputType | null
    _min: MasukanWargaMinAggregateOutputType | null
    _max: MasukanWargaMaxAggregateOutputType | null
  }

  export type MasukanWargaAvgAggregateOutputType = {
    lokasiRt: number | null
    lokasiRw: number | null
  }

  export type MasukanWargaSumAggregateOutputType = {
    lokasiRt: number | null
    lokasiRw: number | null
  }

  export type MasukanWargaMinAggregateOutputType = {
    id: string | null
    judul: string | null
    deskripsi: string | null
    lokasiRt: number | null
    lokasiRw: number | null
    domainIsuId: string | null
    status: $Enums.StatusMasukan | null
    diverifikasiOlehId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MasukanWargaMaxAggregateOutputType = {
    id: string | null
    judul: string | null
    deskripsi: string | null
    lokasiRt: number | null
    lokasiRw: number | null
    domainIsuId: string | null
    status: $Enums.StatusMasukan | null
    diverifikasiOlehId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MasukanWargaCountAggregateOutputType = {
    id: number
    judul: number
    deskripsi: number
    lokasiRt: number
    lokasiRw: number
    domainIsuId: number
    status: number
    diverifikasiOlehId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MasukanWargaAvgAggregateInputType = {
    lokasiRt?: true
    lokasiRw?: true
  }

  export type MasukanWargaSumAggregateInputType = {
    lokasiRt?: true
    lokasiRw?: true
  }

  export type MasukanWargaMinAggregateInputType = {
    id?: true
    judul?: true
    deskripsi?: true
    lokasiRt?: true
    lokasiRw?: true
    domainIsuId?: true
    status?: true
    diverifikasiOlehId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MasukanWargaMaxAggregateInputType = {
    id?: true
    judul?: true
    deskripsi?: true
    lokasiRt?: true
    lokasiRw?: true
    domainIsuId?: true
    status?: true
    diverifikasiOlehId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MasukanWargaCountAggregateInputType = {
    id?: true
    judul?: true
    deskripsi?: true
    lokasiRt?: true
    lokasiRw?: true
    domainIsuId?: true
    status?: true
    diverifikasiOlehId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MasukanWargaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasukanWarga to aggregate.
     */
    where?: MasukanWargaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasukanWargas to fetch.
     */
    orderBy?: MasukanWargaOrderByWithRelationInput | MasukanWargaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MasukanWargaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasukanWargas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasukanWargas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MasukanWargas
    **/
    _count?: true | MasukanWargaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MasukanWargaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MasukanWargaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MasukanWargaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MasukanWargaMaxAggregateInputType
  }

  export type GetMasukanWargaAggregateType<T extends MasukanWargaAggregateArgs> = {
        [P in keyof T & keyof AggregateMasukanWarga]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMasukanWarga[P]>
      : GetScalarType<T[P], AggregateMasukanWarga[P]>
  }




  export type MasukanWargaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasukanWargaWhereInput
    orderBy?: MasukanWargaOrderByWithAggregationInput | MasukanWargaOrderByWithAggregationInput[]
    by: MasukanWargaScalarFieldEnum[] | MasukanWargaScalarFieldEnum
    having?: MasukanWargaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MasukanWargaCountAggregateInputType | true
    _avg?: MasukanWargaAvgAggregateInputType
    _sum?: MasukanWargaSumAggregateInputType
    _min?: MasukanWargaMinAggregateInputType
    _max?: MasukanWargaMaxAggregateInputType
  }

  export type MasukanWargaGroupByOutputType = {
    id: string
    judul: string
    deskripsi: string
    lokasiRt: number
    lokasiRw: number
    domainIsuId: string
    status: $Enums.StatusMasukan
    diverifikasiOlehId: string | null
    createdAt: Date
    updatedAt: Date
    _count: MasukanWargaCountAggregateOutputType | null
    _avg: MasukanWargaAvgAggregateOutputType | null
    _sum: MasukanWargaSumAggregateOutputType | null
    _min: MasukanWargaMinAggregateOutputType | null
    _max: MasukanWargaMaxAggregateOutputType | null
  }

  type GetMasukanWargaGroupByPayload<T extends MasukanWargaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MasukanWargaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MasukanWargaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MasukanWargaGroupByOutputType[P]>
            : GetScalarType<T[P], MasukanWargaGroupByOutputType[P]>
        }
      >
    >


  export type MasukanWargaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    judul?: boolean
    deskripsi?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    domainIsuId?: boolean
    status?: boolean
    diverifikasiOlehId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
    diverifikasiOleh?: boolean | MasukanWarga$diverifikasiOlehArgs<ExtArgs>
    rekomendasiLinks?: boolean | MasukanWarga$rekomendasiLinksArgs<ExtArgs>
    _count?: boolean | MasukanWargaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["masukanWarga"]>

  export type MasukanWargaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    judul?: boolean
    deskripsi?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    domainIsuId?: boolean
    status?: boolean
    diverifikasiOlehId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
    diverifikasiOleh?: boolean | MasukanWarga$diverifikasiOlehArgs<ExtArgs>
  }, ExtArgs["result"]["masukanWarga"]>

  export type MasukanWargaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    judul?: boolean
    deskripsi?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    domainIsuId?: boolean
    status?: boolean
    diverifikasiOlehId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
    diverifikasiOleh?: boolean | MasukanWarga$diverifikasiOlehArgs<ExtArgs>
  }, ExtArgs["result"]["masukanWarga"]>

  export type MasukanWargaSelectScalar = {
    id?: boolean
    judul?: boolean
    deskripsi?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    domainIsuId?: boolean
    status?: boolean
    diverifikasiOlehId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MasukanWargaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "judul" | "deskripsi" | "lokasiRt" | "lokasiRw" | "domainIsuId" | "status" | "diverifikasiOlehId" | "createdAt" | "updatedAt", ExtArgs["result"]["masukanWarga"]>
  export type MasukanWargaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
    diverifikasiOleh?: boolean | MasukanWarga$diverifikasiOlehArgs<ExtArgs>
    rekomendasiLinks?: boolean | MasukanWarga$rekomendasiLinksArgs<ExtArgs>
    _count?: boolean | MasukanWargaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MasukanWargaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
    diverifikasiOleh?: boolean | MasukanWarga$diverifikasiOlehArgs<ExtArgs>
  }
  export type MasukanWargaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
    diverifikasiOleh?: boolean | MasukanWarga$diverifikasiOlehArgs<ExtArgs>
  }

  export type $MasukanWargaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MasukanWarga"
    objects: {
      domainIsu: Prisma.$DomainIsuPayload<ExtArgs>
      diverifikasiOleh: Prisma.$UserPayload<ExtArgs> | null
      rekomendasiLinks: Prisma.$RekomendasiMasukanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      judul: string
      deskripsi: string
      lokasiRt: number
      lokasiRw: number
      domainIsuId: string
      status: $Enums.StatusMasukan
      diverifikasiOlehId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["masukanWarga"]>
    composites: {}
  }

  type MasukanWargaGetPayload<S extends boolean | null | undefined | MasukanWargaDefaultArgs> = $Result.GetResult<Prisma.$MasukanWargaPayload, S>

  type MasukanWargaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MasukanWargaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MasukanWargaCountAggregateInputType | true
    }

  export interface MasukanWargaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MasukanWarga'], meta: { name: 'MasukanWarga' } }
    /**
     * Find zero or one MasukanWarga that matches the filter.
     * @param {MasukanWargaFindUniqueArgs} args - Arguments to find a MasukanWarga
     * @example
     * // Get one MasukanWarga
     * const masukanWarga = await prisma.masukanWarga.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MasukanWargaFindUniqueArgs>(args: SelectSubset<T, MasukanWargaFindUniqueArgs<ExtArgs>>): Prisma__MasukanWargaClient<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MasukanWarga that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MasukanWargaFindUniqueOrThrowArgs} args - Arguments to find a MasukanWarga
     * @example
     * // Get one MasukanWarga
     * const masukanWarga = await prisma.masukanWarga.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MasukanWargaFindUniqueOrThrowArgs>(args: SelectSubset<T, MasukanWargaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MasukanWargaClient<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MasukanWarga that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasukanWargaFindFirstArgs} args - Arguments to find a MasukanWarga
     * @example
     * // Get one MasukanWarga
     * const masukanWarga = await prisma.masukanWarga.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MasukanWargaFindFirstArgs>(args?: SelectSubset<T, MasukanWargaFindFirstArgs<ExtArgs>>): Prisma__MasukanWargaClient<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MasukanWarga that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasukanWargaFindFirstOrThrowArgs} args - Arguments to find a MasukanWarga
     * @example
     * // Get one MasukanWarga
     * const masukanWarga = await prisma.masukanWarga.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MasukanWargaFindFirstOrThrowArgs>(args?: SelectSubset<T, MasukanWargaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MasukanWargaClient<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MasukanWargas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasukanWargaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MasukanWargas
     * const masukanWargas = await prisma.masukanWarga.findMany()
     * 
     * // Get first 10 MasukanWargas
     * const masukanWargas = await prisma.masukanWarga.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const masukanWargaWithIdOnly = await prisma.masukanWarga.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MasukanWargaFindManyArgs>(args?: SelectSubset<T, MasukanWargaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MasukanWarga.
     * @param {MasukanWargaCreateArgs} args - Arguments to create a MasukanWarga.
     * @example
     * // Create one MasukanWarga
     * const MasukanWarga = await prisma.masukanWarga.create({
     *   data: {
     *     // ... data to create a MasukanWarga
     *   }
     * })
     * 
     */
    create<T extends MasukanWargaCreateArgs>(args: SelectSubset<T, MasukanWargaCreateArgs<ExtArgs>>): Prisma__MasukanWargaClient<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MasukanWargas.
     * @param {MasukanWargaCreateManyArgs} args - Arguments to create many MasukanWargas.
     * @example
     * // Create many MasukanWargas
     * const masukanWarga = await prisma.masukanWarga.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MasukanWargaCreateManyArgs>(args?: SelectSubset<T, MasukanWargaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MasukanWargas and returns the data saved in the database.
     * @param {MasukanWargaCreateManyAndReturnArgs} args - Arguments to create many MasukanWargas.
     * @example
     * // Create many MasukanWargas
     * const masukanWarga = await prisma.masukanWarga.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MasukanWargas and only return the `id`
     * const masukanWargaWithIdOnly = await prisma.masukanWarga.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MasukanWargaCreateManyAndReturnArgs>(args?: SelectSubset<T, MasukanWargaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MasukanWarga.
     * @param {MasukanWargaDeleteArgs} args - Arguments to delete one MasukanWarga.
     * @example
     * // Delete one MasukanWarga
     * const MasukanWarga = await prisma.masukanWarga.delete({
     *   where: {
     *     // ... filter to delete one MasukanWarga
     *   }
     * })
     * 
     */
    delete<T extends MasukanWargaDeleteArgs>(args: SelectSubset<T, MasukanWargaDeleteArgs<ExtArgs>>): Prisma__MasukanWargaClient<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MasukanWarga.
     * @param {MasukanWargaUpdateArgs} args - Arguments to update one MasukanWarga.
     * @example
     * // Update one MasukanWarga
     * const masukanWarga = await prisma.masukanWarga.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MasukanWargaUpdateArgs>(args: SelectSubset<T, MasukanWargaUpdateArgs<ExtArgs>>): Prisma__MasukanWargaClient<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MasukanWargas.
     * @param {MasukanWargaDeleteManyArgs} args - Arguments to filter MasukanWargas to delete.
     * @example
     * // Delete a few MasukanWargas
     * const { count } = await prisma.masukanWarga.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MasukanWargaDeleteManyArgs>(args?: SelectSubset<T, MasukanWargaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MasukanWargas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasukanWargaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MasukanWargas
     * const masukanWarga = await prisma.masukanWarga.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MasukanWargaUpdateManyArgs>(args: SelectSubset<T, MasukanWargaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MasukanWargas and returns the data updated in the database.
     * @param {MasukanWargaUpdateManyAndReturnArgs} args - Arguments to update many MasukanWargas.
     * @example
     * // Update many MasukanWargas
     * const masukanWarga = await prisma.masukanWarga.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MasukanWargas and only return the `id`
     * const masukanWargaWithIdOnly = await prisma.masukanWarga.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MasukanWargaUpdateManyAndReturnArgs>(args: SelectSubset<T, MasukanWargaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MasukanWarga.
     * @param {MasukanWargaUpsertArgs} args - Arguments to update or create a MasukanWarga.
     * @example
     * // Update or create a MasukanWarga
     * const masukanWarga = await prisma.masukanWarga.upsert({
     *   create: {
     *     // ... data to create a MasukanWarga
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MasukanWarga we want to update
     *   }
     * })
     */
    upsert<T extends MasukanWargaUpsertArgs>(args: SelectSubset<T, MasukanWargaUpsertArgs<ExtArgs>>): Prisma__MasukanWargaClient<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MasukanWargas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasukanWargaCountArgs} args - Arguments to filter MasukanWargas to count.
     * @example
     * // Count the number of MasukanWargas
     * const count = await prisma.masukanWarga.count({
     *   where: {
     *     // ... the filter for the MasukanWargas we want to count
     *   }
     * })
    **/
    count<T extends MasukanWargaCountArgs>(
      args?: Subset<T, MasukanWargaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MasukanWargaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MasukanWarga.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasukanWargaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MasukanWargaAggregateArgs>(args: Subset<T, MasukanWargaAggregateArgs>): Prisma.PrismaPromise<GetMasukanWargaAggregateType<T>>

    /**
     * Group by MasukanWarga.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasukanWargaGroupByArgs} args - Group by arguments.
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
      T extends MasukanWargaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MasukanWargaGroupByArgs['orderBy'] }
        : { orderBy?: MasukanWargaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MasukanWargaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMasukanWargaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MasukanWarga model
   */
  readonly fields: MasukanWargaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MasukanWarga.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MasukanWargaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domainIsu<T extends DomainIsuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DomainIsuDefaultArgs<ExtArgs>>): Prisma__DomainIsuClient<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    diverifikasiOleh<T extends MasukanWarga$diverifikasiOlehArgs<ExtArgs> = {}>(args?: Subset<T, MasukanWarga$diverifikasiOlehArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    rekomendasiLinks<T extends MasukanWarga$rekomendasiLinksArgs<ExtArgs> = {}>(args?: Subset<T, MasukanWarga$rekomendasiLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the MasukanWarga model
   */
  interface MasukanWargaFieldRefs {
    readonly id: FieldRef<"MasukanWarga", 'String'>
    readonly judul: FieldRef<"MasukanWarga", 'String'>
    readonly deskripsi: FieldRef<"MasukanWarga", 'String'>
    readonly lokasiRt: FieldRef<"MasukanWarga", 'Int'>
    readonly lokasiRw: FieldRef<"MasukanWarga", 'Int'>
    readonly domainIsuId: FieldRef<"MasukanWarga", 'String'>
    readonly status: FieldRef<"MasukanWarga", 'StatusMasukan'>
    readonly diverifikasiOlehId: FieldRef<"MasukanWarga", 'String'>
    readonly createdAt: FieldRef<"MasukanWarga", 'DateTime'>
    readonly updatedAt: FieldRef<"MasukanWarga", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MasukanWarga findUnique
   */
  export type MasukanWargaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaInclude<ExtArgs> | null
    /**
     * Filter, which MasukanWarga to fetch.
     */
    where: MasukanWargaWhereUniqueInput
  }

  /**
   * MasukanWarga findUniqueOrThrow
   */
  export type MasukanWargaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaInclude<ExtArgs> | null
    /**
     * Filter, which MasukanWarga to fetch.
     */
    where: MasukanWargaWhereUniqueInput
  }

  /**
   * MasukanWarga findFirst
   */
  export type MasukanWargaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaInclude<ExtArgs> | null
    /**
     * Filter, which MasukanWarga to fetch.
     */
    where?: MasukanWargaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasukanWargas to fetch.
     */
    orderBy?: MasukanWargaOrderByWithRelationInput | MasukanWargaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasukanWargas.
     */
    cursor?: MasukanWargaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasukanWargas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasukanWargas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasukanWargas.
     */
    distinct?: MasukanWargaScalarFieldEnum | MasukanWargaScalarFieldEnum[]
  }

  /**
   * MasukanWarga findFirstOrThrow
   */
  export type MasukanWargaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaInclude<ExtArgs> | null
    /**
     * Filter, which MasukanWarga to fetch.
     */
    where?: MasukanWargaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasukanWargas to fetch.
     */
    orderBy?: MasukanWargaOrderByWithRelationInput | MasukanWargaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasukanWargas.
     */
    cursor?: MasukanWargaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasukanWargas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasukanWargas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasukanWargas.
     */
    distinct?: MasukanWargaScalarFieldEnum | MasukanWargaScalarFieldEnum[]
  }

  /**
   * MasukanWarga findMany
   */
  export type MasukanWargaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaInclude<ExtArgs> | null
    /**
     * Filter, which MasukanWargas to fetch.
     */
    where?: MasukanWargaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasukanWargas to fetch.
     */
    orderBy?: MasukanWargaOrderByWithRelationInput | MasukanWargaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MasukanWargas.
     */
    cursor?: MasukanWargaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasukanWargas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasukanWargas.
     */
    skip?: number
    distinct?: MasukanWargaScalarFieldEnum | MasukanWargaScalarFieldEnum[]
  }

  /**
   * MasukanWarga create
   */
  export type MasukanWargaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaInclude<ExtArgs> | null
    /**
     * The data needed to create a MasukanWarga.
     */
    data: XOR<MasukanWargaCreateInput, MasukanWargaUncheckedCreateInput>
  }

  /**
   * MasukanWarga createMany
   */
  export type MasukanWargaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MasukanWargas.
     */
    data: MasukanWargaCreateManyInput | MasukanWargaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MasukanWarga createManyAndReturn
   */
  export type MasukanWargaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * The data used to create many MasukanWargas.
     */
    data: MasukanWargaCreateManyInput | MasukanWargaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MasukanWarga update
   */
  export type MasukanWargaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaInclude<ExtArgs> | null
    /**
     * The data needed to update a MasukanWarga.
     */
    data: XOR<MasukanWargaUpdateInput, MasukanWargaUncheckedUpdateInput>
    /**
     * Choose, which MasukanWarga to update.
     */
    where: MasukanWargaWhereUniqueInput
  }

  /**
   * MasukanWarga updateMany
   */
  export type MasukanWargaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MasukanWargas.
     */
    data: XOR<MasukanWargaUpdateManyMutationInput, MasukanWargaUncheckedUpdateManyInput>
    /**
     * Filter which MasukanWargas to update
     */
    where?: MasukanWargaWhereInput
    /**
     * Limit how many MasukanWargas to update.
     */
    limit?: number
  }

  /**
   * MasukanWarga updateManyAndReturn
   */
  export type MasukanWargaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * The data used to update MasukanWargas.
     */
    data: XOR<MasukanWargaUpdateManyMutationInput, MasukanWargaUncheckedUpdateManyInput>
    /**
     * Filter which MasukanWargas to update
     */
    where?: MasukanWargaWhereInput
    /**
     * Limit how many MasukanWargas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MasukanWarga upsert
   */
  export type MasukanWargaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaInclude<ExtArgs> | null
    /**
     * The filter to search for the MasukanWarga to update in case it exists.
     */
    where: MasukanWargaWhereUniqueInput
    /**
     * In case the MasukanWarga found by the `where` argument doesn't exist, create a new MasukanWarga with this data.
     */
    create: XOR<MasukanWargaCreateInput, MasukanWargaUncheckedCreateInput>
    /**
     * In case the MasukanWarga was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MasukanWargaUpdateInput, MasukanWargaUncheckedUpdateInput>
  }

  /**
   * MasukanWarga delete
   */
  export type MasukanWargaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaInclude<ExtArgs> | null
    /**
     * Filter which MasukanWarga to delete.
     */
    where: MasukanWargaWhereUniqueInput
  }

  /**
   * MasukanWarga deleteMany
   */
  export type MasukanWargaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MasukanWargas to delete
     */
    where?: MasukanWargaWhereInput
    /**
     * Limit how many MasukanWargas to delete.
     */
    limit?: number
  }

  /**
   * MasukanWarga.diverifikasiOleh
   */
  export type MasukanWarga$diverifikasiOlehArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * MasukanWarga.rekomendasiLinks
   */
  export type MasukanWarga$rekomendasiLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanInclude<ExtArgs> | null
    where?: RekomendasiMasukanWhereInput
    orderBy?: RekomendasiMasukanOrderByWithRelationInput | RekomendasiMasukanOrderByWithRelationInput[]
    cursor?: RekomendasiMasukanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RekomendasiMasukanScalarFieldEnum | RekomendasiMasukanScalarFieldEnum[]
  }

  /**
   * MasukanWarga without action
   */
  export type MasukanWargaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MasukanWarga
     */
    select?: MasukanWargaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MasukanWarga
     */
    omit?: MasukanWargaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MasukanWargaInclude<ExtArgs> | null
  }


  /**
   * Model DataMaster
   */

  export type AggregateDataMaster = {
    _count: DataMasterCountAggregateOutputType | null
    _avg: DataMasterAvgAggregateOutputType | null
    _sum: DataMasterSumAggregateOutputType | null
    _min: DataMasterMinAggregateOutputType | null
    _max: DataMasterMaxAggregateOutputType | null
  }

  export type DataMasterAvgAggregateOutputType = {
    jumlah: number | null
    lokasiRt: number | null
    lokasiRw: number | null
  }

  export type DataMasterSumAggregateOutputType = {
    jumlah: number | null
    lokasiRt: number | null
    lokasiRw: number | null
  }

  export type DataMasterMinAggregateOutputType = {
    id: string | null
    domainIsuId: string | null
    namaAtribut: string | null
    nilai: string | null
    jumlah: number | null
    lokasiRt: number | null
    lokasiRw: number | null
    sumberData: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DataMasterMaxAggregateOutputType = {
    id: string | null
    domainIsuId: string | null
    namaAtribut: string | null
    nilai: string | null
    jumlah: number | null
    lokasiRt: number | null
    lokasiRw: number | null
    sumberData: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DataMasterCountAggregateOutputType = {
    id: number
    domainIsuId: number
    namaAtribut: number
    nilai: number
    jumlah: number
    lokasiRt: number
    lokasiRw: number
    sumberData: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DataMasterAvgAggregateInputType = {
    jumlah?: true
    lokasiRt?: true
    lokasiRw?: true
  }

  export type DataMasterSumAggregateInputType = {
    jumlah?: true
    lokasiRt?: true
    lokasiRw?: true
  }

  export type DataMasterMinAggregateInputType = {
    id?: true
    domainIsuId?: true
    namaAtribut?: true
    nilai?: true
    jumlah?: true
    lokasiRt?: true
    lokasiRw?: true
    sumberData?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DataMasterMaxAggregateInputType = {
    id?: true
    domainIsuId?: true
    namaAtribut?: true
    nilai?: true
    jumlah?: true
    lokasiRt?: true
    lokasiRw?: true
    sumberData?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DataMasterCountAggregateInputType = {
    id?: true
    domainIsuId?: true
    namaAtribut?: true
    nilai?: true
    jumlah?: true
    lokasiRt?: true
    lokasiRw?: true
    sumberData?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DataMasterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataMaster to aggregate.
     */
    where?: DataMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataMasters to fetch.
     */
    orderBy?: DataMasterOrderByWithRelationInput | DataMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DataMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataMasters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DataMasters
    **/
    _count?: true | DataMasterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DataMasterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DataMasterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DataMasterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DataMasterMaxAggregateInputType
  }

  export type GetDataMasterAggregateType<T extends DataMasterAggregateArgs> = {
        [P in keyof T & keyof AggregateDataMaster]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDataMaster[P]>
      : GetScalarType<T[P], AggregateDataMaster[P]>
  }




  export type DataMasterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DataMasterWhereInput
    orderBy?: DataMasterOrderByWithAggregationInput | DataMasterOrderByWithAggregationInput[]
    by: DataMasterScalarFieldEnum[] | DataMasterScalarFieldEnum
    having?: DataMasterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DataMasterCountAggregateInputType | true
    _avg?: DataMasterAvgAggregateInputType
    _sum?: DataMasterSumAggregateInputType
    _min?: DataMasterMinAggregateInputType
    _max?: DataMasterMaxAggregateInputType
  }

  export type DataMasterGroupByOutputType = {
    id: string
    domainIsuId: string
    namaAtribut: string
    nilai: string
    jumlah: number | null
    lokasiRt: number | null
    lokasiRw: number | null
    sumberData: string | null
    createdAt: Date
    updatedAt: Date
    _count: DataMasterCountAggregateOutputType | null
    _avg: DataMasterAvgAggregateOutputType | null
    _sum: DataMasterSumAggregateOutputType | null
    _min: DataMasterMinAggregateOutputType | null
    _max: DataMasterMaxAggregateOutputType | null
  }

  type GetDataMasterGroupByPayload<T extends DataMasterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DataMasterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DataMasterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DataMasterGroupByOutputType[P]>
            : GetScalarType<T[P], DataMasterGroupByOutputType[P]>
        }
      >
    >


  export type DataMasterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainIsuId?: boolean
    namaAtribut?: boolean
    nilai?: boolean
    jumlah?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    sumberData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataMaster"]>

  export type DataMasterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainIsuId?: boolean
    namaAtribut?: boolean
    nilai?: boolean
    jumlah?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    sumberData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataMaster"]>

  export type DataMasterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainIsuId?: boolean
    namaAtribut?: boolean
    nilai?: boolean
    jumlah?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    sumberData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataMaster"]>

  export type DataMasterSelectScalar = {
    id?: boolean
    domainIsuId?: boolean
    namaAtribut?: boolean
    nilai?: boolean
    jumlah?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    sumberData?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DataMasterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "domainIsuId" | "namaAtribut" | "nilai" | "jumlah" | "lokasiRt" | "lokasiRw" | "sumberData" | "createdAt" | "updatedAt", ExtArgs["result"]["dataMaster"]>
  export type DataMasterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
  }
  export type DataMasterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
  }
  export type DataMasterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
  }

  export type $DataMasterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DataMaster"
    objects: {
      domainIsu: Prisma.$DomainIsuPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      domainIsuId: string
      namaAtribut: string
      nilai: string
      jumlah: number | null
      lokasiRt: number | null
      lokasiRw: number | null
      sumberData: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dataMaster"]>
    composites: {}
  }

  type DataMasterGetPayload<S extends boolean | null | undefined | DataMasterDefaultArgs> = $Result.GetResult<Prisma.$DataMasterPayload, S>

  type DataMasterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DataMasterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DataMasterCountAggregateInputType | true
    }

  export interface DataMasterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DataMaster'], meta: { name: 'DataMaster' } }
    /**
     * Find zero or one DataMaster that matches the filter.
     * @param {DataMasterFindUniqueArgs} args - Arguments to find a DataMaster
     * @example
     * // Get one DataMaster
     * const dataMaster = await prisma.dataMaster.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DataMasterFindUniqueArgs>(args: SelectSubset<T, DataMasterFindUniqueArgs<ExtArgs>>): Prisma__DataMasterClient<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DataMaster that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DataMasterFindUniqueOrThrowArgs} args - Arguments to find a DataMaster
     * @example
     * // Get one DataMaster
     * const dataMaster = await prisma.dataMaster.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DataMasterFindUniqueOrThrowArgs>(args: SelectSubset<T, DataMasterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DataMasterClient<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DataMaster that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMasterFindFirstArgs} args - Arguments to find a DataMaster
     * @example
     * // Get one DataMaster
     * const dataMaster = await prisma.dataMaster.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DataMasterFindFirstArgs>(args?: SelectSubset<T, DataMasterFindFirstArgs<ExtArgs>>): Prisma__DataMasterClient<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DataMaster that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMasterFindFirstOrThrowArgs} args - Arguments to find a DataMaster
     * @example
     * // Get one DataMaster
     * const dataMaster = await prisma.dataMaster.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DataMasterFindFirstOrThrowArgs>(args?: SelectSubset<T, DataMasterFindFirstOrThrowArgs<ExtArgs>>): Prisma__DataMasterClient<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DataMasters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMasterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DataMasters
     * const dataMasters = await prisma.dataMaster.findMany()
     * 
     * // Get first 10 DataMasters
     * const dataMasters = await prisma.dataMaster.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dataMasterWithIdOnly = await prisma.dataMaster.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DataMasterFindManyArgs>(args?: SelectSubset<T, DataMasterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DataMaster.
     * @param {DataMasterCreateArgs} args - Arguments to create a DataMaster.
     * @example
     * // Create one DataMaster
     * const DataMaster = await prisma.dataMaster.create({
     *   data: {
     *     // ... data to create a DataMaster
     *   }
     * })
     * 
     */
    create<T extends DataMasterCreateArgs>(args: SelectSubset<T, DataMasterCreateArgs<ExtArgs>>): Prisma__DataMasterClient<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DataMasters.
     * @param {DataMasterCreateManyArgs} args - Arguments to create many DataMasters.
     * @example
     * // Create many DataMasters
     * const dataMaster = await prisma.dataMaster.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DataMasterCreateManyArgs>(args?: SelectSubset<T, DataMasterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DataMasters and returns the data saved in the database.
     * @param {DataMasterCreateManyAndReturnArgs} args - Arguments to create many DataMasters.
     * @example
     * // Create many DataMasters
     * const dataMaster = await prisma.dataMaster.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DataMasters and only return the `id`
     * const dataMasterWithIdOnly = await prisma.dataMaster.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DataMasterCreateManyAndReturnArgs>(args?: SelectSubset<T, DataMasterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DataMaster.
     * @param {DataMasterDeleteArgs} args - Arguments to delete one DataMaster.
     * @example
     * // Delete one DataMaster
     * const DataMaster = await prisma.dataMaster.delete({
     *   where: {
     *     // ... filter to delete one DataMaster
     *   }
     * })
     * 
     */
    delete<T extends DataMasterDeleteArgs>(args: SelectSubset<T, DataMasterDeleteArgs<ExtArgs>>): Prisma__DataMasterClient<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DataMaster.
     * @param {DataMasterUpdateArgs} args - Arguments to update one DataMaster.
     * @example
     * // Update one DataMaster
     * const dataMaster = await prisma.dataMaster.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DataMasterUpdateArgs>(args: SelectSubset<T, DataMasterUpdateArgs<ExtArgs>>): Prisma__DataMasterClient<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DataMasters.
     * @param {DataMasterDeleteManyArgs} args - Arguments to filter DataMasters to delete.
     * @example
     * // Delete a few DataMasters
     * const { count } = await prisma.dataMaster.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DataMasterDeleteManyArgs>(args?: SelectSubset<T, DataMasterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataMasters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMasterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DataMasters
     * const dataMaster = await prisma.dataMaster.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DataMasterUpdateManyArgs>(args: SelectSubset<T, DataMasterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataMasters and returns the data updated in the database.
     * @param {DataMasterUpdateManyAndReturnArgs} args - Arguments to update many DataMasters.
     * @example
     * // Update many DataMasters
     * const dataMaster = await prisma.dataMaster.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DataMasters and only return the `id`
     * const dataMasterWithIdOnly = await prisma.dataMaster.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DataMasterUpdateManyAndReturnArgs>(args: SelectSubset<T, DataMasterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DataMaster.
     * @param {DataMasterUpsertArgs} args - Arguments to update or create a DataMaster.
     * @example
     * // Update or create a DataMaster
     * const dataMaster = await prisma.dataMaster.upsert({
     *   create: {
     *     // ... data to create a DataMaster
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DataMaster we want to update
     *   }
     * })
     */
    upsert<T extends DataMasterUpsertArgs>(args: SelectSubset<T, DataMasterUpsertArgs<ExtArgs>>): Prisma__DataMasterClient<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DataMasters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMasterCountArgs} args - Arguments to filter DataMasters to count.
     * @example
     * // Count the number of DataMasters
     * const count = await prisma.dataMaster.count({
     *   where: {
     *     // ... the filter for the DataMasters we want to count
     *   }
     * })
    **/
    count<T extends DataMasterCountArgs>(
      args?: Subset<T, DataMasterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DataMasterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DataMaster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMasterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DataMasterAggregateArgs>(args: Subset<T, DataMasterAggregateArgs>): Prisma.PrismaPromise<GetDataMasterAggregateType<T>>

    /**
     * Group by DataMaster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataMasterGroupByArgs} args - Group by arguments.
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
      T extends DataMasterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DataMasterGroupByArgs['orderBy'] }
        : { orderBy?: DataMasterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DataMasterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDataMasterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DataMaster model
   */
  readonly fields: DataMasterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DataMaster.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DataMasterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domainIsu<T extends DomainIsuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DomainIsuDefaultArgs<ExtArgs>>): Prisma__DomainIsuClient<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DataMaster model
   */
  interface DataMasterFieldRefs {
    readonly id: FieldRef<"DataMaster", 'String'>
    readonly domainIsuId: FieldRef<"DataMaster", 'String'>
    readonly namaAtribut: FieldRef<"DataMaster", 'String'>
    readonly nilai: FieldRef<"DataMaster", 'String'>
    readonly jumlah: FieldRef<"DataMaster", 'Int'>
    readonly lokasiRt: FieldRef<"DataMaster", 'Int'>
    readonly lokasiRw: FieldRef<"DataMaster", 'Int'>
    readonly sumberData: FieldRef<"DataMaster", 'String'>
    readonly createdAt: FieldRef<"DataMaster", 'DateTime'>
    readonly updatedAt: FieldRef<"DataMaster", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DataMaster findUnique
   */
  export type DataMasterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterInclude<ExtArgs> | null
    /**
     * Filter, which DataMaster to fetch.
     */
    where: DataMasterWhereUniqueInput
  }

  /**
   * DataMaster findUniqueOrThrow
   */
  export type DataMasterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterInclude<ExtArgs> | null
    /**
     * Filter, which DataMaster to fetch.
     */
    where: DataMasterWhereUniqueInput
  }

  /**
   * DataMaster findFirst
   */
  export type DataMasterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterInclude<ExtArgs> | null
    /**
     * Filter, which DataMaster to fetch.
     */
    where?: DataMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataMasters to fetch.
     */
    orderBy?: DataMasterOrderByWithRelationInput | DataMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataMasters.
     */
    cursor?: DataMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataMasters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataMasters.
     */
    distinct?: DataMasterScalarFieldEnum | DataMasterScalarFieldEnum[]
  }

  /**
   * DataMaster findFirstOrThrow
   */
  export type DataMasterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterInclude<ExtArgs> | null
    /**
     * Filter, which DataMaster to fetch.
     */
    where?: DataMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataMasters to fetch.
     */
    orderBy?: DataMasterOrderByWithRelationInput | DataMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataMasters.
     */
    cursor?: DataMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataMasters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataMasters.
     */
    distinct?: DataMasterScalarFieldEnum | DataMasterScalarFieldEnum[]
  }

  /**
   * DataMaster findMany
   */
  export type DataMasterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterInclude<ExtArgs> | null
    /**
     * Filter, which DataMasters to fetch.
     */
    where?: DataMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataMasters to fetch.
     */
    orderBy?: DataMasterOrderByWithRelationInput | DataMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DataMasters.
     */
    cursor?: DataMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataMasters.
     */
    skip?: number
    distinct?: DataMasterScalarFieldEnum | DataMasterScalarFieldEnum[]
  }

  /**
   * DataMaster create
   */
  export type DataMasterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterInclude<ExtArgs> | null
    /**
     * The data needed to create a DataMaster.
     */
    data: XOR<DataMasterCreateInput, DataMasterUncheckedCreateInput>
  }

  /**
   * DataMaster createMany
   */
  export type DataMasterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DataMasters.
     */
    data: DataMasterCreateManyInput | DataMasterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DataMaster createManyAndReturn
   */
  export type DataMasterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * The data used to create many DataMasters.
     */
    data: DataMasterCreateManyInput | DataMasterCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DataMaster update
   */
  export type DataMasterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterInclude<ExtArgs> | null
    /**
     * The data needed to update a DataMaster.
     */
    data: XOR<DataMasterUpdateInput, DataMasterUncheckedUpdateInput>
    /**
     * Choose, which DataMaster to update.
     */
    where: DataMasterWhereUniqueInput
  }

  /**
   * DataMaster updateMany
   */
  export type DataMasterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DataMasters.
     */
    data: XOR<DataMasterUpdateManyMutationInput, DataMasterUncheckedUpdateManyInput>
    /**
     * Filter which DataMasters to update
     */
    where?: DataMasterWhereInput
    /**
     * Limit how many DataMasters to update.
     */
    limit?: number
  }

  /**
   * DataMaster updateManyAndReturn
   */
  export type DataMasterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * The data used to update DataMasters.
     */
    data: XOR<DataMasterUpdateManyMutationInput, DataMasterUncheckedUpdateManyInput>
    /**
     * Filter which DataMasters to update
     */
    where?: DataMasterWhereInput
    /**
     * Limit how many DataMasters to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DataMaster upsert
   */
  export type DataMasterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterInclude<ExtArgs> | null
    /**
     * The filter to search for the DataMaster to update in case it exists.
     */
    where: DataMasterWhereUniqueInput
    /**
     * In case the DataMaster found by the `where` argument doesn't exist, create a new DataMaster with this data.
     */
    create: XOR<DataMasterCreateInput, DataMasterUncheckedCreateInput>
    /**
     * In case the DataMaster was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DataMasterUpdateInput, DataMasterUncheckedUpdateInput>
  }

  /**
   * DataMaster delete
   */
  export type DataMasterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterInclude<ExtArgs> | null
    /**
     * Filter which DataMaster to delete.
     */
    where: DataMasterWhereUniqueInput
  }

  /**
   * DataMaster deleteMany
   */
  export type DataMasterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataMasters to delete
     */
    where?: DataMasterWhereInput
    /**
     * Limit how many DataMasters to delete.
     */
    limit?: number
  }

  /**
   * DataMaster without action
   */
  export type DataMasterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataMaster
     */
    select?: DataMasterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataMaster
     */
    omit?: DataMasterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataMasterInclude<ExtArgs> | null
  }


  /**
   * Model Rekomendasi
   */

  export type AggregateRekomendasi = {
    _count: RekomendasiCountAggregateOutputType | null
    _avg: RekomendasiAvgAggregateOutputType | null
    _sum: RekomendasiSumAggregateOutputType | null
    _min: RekomendasiMinAggregateOutputType | null
    _max: RekomendasiMaxAggregateOutputType | null
  }

  export type RekomendasiAvgAggregateOutputType = {
    skorPrioritas: number | null
  }

  export type RekomendasiSumAggregateOutputType = {
    skorPrioritas: number | null
  }

  export type RekomendasiMinAggregateOutputType = {
    id: string | null
    kegiatanRapatId: string | null
    domainIsuId: string | null
    judul: string | null
    ringkasan: string | null
    deskripsi: string | null
    skorPrioritas: number | null
    status: $Enums.StatusRekomendasi | null
    diprosesOlehId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RekomendasiMaxAggregateOutputType = {
    id: string | null
    kegiatanRapatId: string | null
    domainIsuId: string | null
    judul: string | null
    ringkasan: string | null
    deskripsi: string | null
    skorPrioritas: number | null
    status: $Enums.StatusRekomendasi | null
    diprosesOlehId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RekomendasiCountAggregateOutputType = {
    id: number
    kegiatanRapatId: number
    domainIsuId: number
    judul: number
    ringkasan: number
    deskripsi: number
    skorPrioritas: number
    status: number
    laporanLengkap: number
    diprosesOlehId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RekomendasiAvgAggregateInputType = {
    skorPrioritas?: true
  }

  export type RekomendasiSumAggregateInputType = {
    skorPrioritas?: true
  }

  export type RekomendasiMinAggregateInputType = {
    id?: true
    kegiatanRapatId?: true
    domainIsuId?: true
    judul?: true
    ringkasan?: true
    deskripsi?: true
    skorPrioritas?: true
    status?: true
    diprosesOlehId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RekomendasiMaxAggregateInputType = {
    id?: true
    kegiatanRapatId?: true
    domainIsuId?: true
    judul?: true
    ringkasan?: true
    deskripsi?: true
    skorPrioritas?: true
    status?: true
    diprosesOlehId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RekomendasiCountAggregateInputType = {
    id?: true
    kegiatanRapatId?: true
    domainIsuId?: true
    judul?: true
    ringkasan?: true
    deskripsi?: true
    skorPrioritas?: true
    status?: true
    laporanLengkap?: true
    diprosesOlehId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RekomendasiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rekomendasi to aggregate.
     */
    where?: RekomendasiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rekomendasis to fetch.
     */
    orderBy?: RekomendasiOrderByWithRelationInput | RekomendasiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RekomendasiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rekomendasis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rekomendasis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rekomendasis
    **/
    _count?: true | RekomendasiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RekomendasiAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RekomendasiSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RekomendasiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RekomendasiMaxAggregateInputType
  }

  export type GetRekomendasiAggregateType<T extends RekomendasiAggregateArgs> = {
        [P in keyof T & keyof AggregateRekomendasi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRekomendasi[P]>
      : GetScalarType<T[P], AggregateRekomendasi[P]>
  }




  export type RekomendasiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekomendasiWhereInput
    orderBy?: RekomendasiOrderByWithAggregationInput | RekomendasiOrderByWithAggregationInput[]
    by: RekomendasiScalarFieldEnum[] | RekomendasiScalarFieldEnum
    having?: RekomendasiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RekomendasiCountAggregateInputType | true
    _avg?: RekomendasiAvgAggregateInputType
    _sum?: RekomendasiSumAggregateInputType
    _min?: RekomendasiMinAggregateInputType
    _max?: RekomendasiMaxAggregateInputType
  }

  export type RekomendasiGroupByOutputType = {
    id: string
    kegiatanRapatId: string
    domainIsuId: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status: $Enums.StatusRekomendasi
    laporanLengkap: JsonValue
    diprosesOlehId: string | null
    createdAt: Date
    updatedAt: Date
    _count: RekomendasiCountAggregateOutputType | null
    _avg: RekomendasiAvgAggregateOutputType | null
    _sum: RekomendasiSumAggregateOutputType | null
    _min: RekomendasiMinAggregateOutputType | null
    _max: RekomendasiMaxAggregateOutputType | null
  }

  type GetRekomendasiGroupByPayload<T extends RekomendasiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RekomendasiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RekomendasiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RekomendasiGroupByOutputType[P]>
            : GetScalarType<T[P], RekomendasiGroupByOutputType[P]>
        }
      >
    >


  export type RekomendasiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kegiatanRapatId?: boolean
    domainIsuId?: boolean
    judul?: boolean
    ringkasan?: boolean
    deskripsi?: boolean
    skorPrioritas?: boolean
    status?: boolean
    laporanLengkap?: boolean
    diprosesOlehId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    kegiatanRapat?: boolean | KegiatanRapatDefaultArgs<ExtArgs>
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
    diprosesOleh?: boolean | Rekomendasi$diprosesOlehArgs<ExtArgs>
    masukanLinks?: boolean | Rekomendasi$masukanLinksArgs<ExtArgs>
    _count?: boolean | RekomendasiCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rekomendasi"]>

  export type RekomendasiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kegiatanRapatId?: boolean
    domainIsuId?: boolean
    judul?: boolean
    ringkasan?: boolean
    deskripsi?: boolean
    skorPrioritas?: boolean
    status?: boolean
    laporanLengkap?: boolean
    diprosesOlehId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    kegiatanRapat?: boolean | KegiatanRapatDefaultArgs<ExtArgs>
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
    diprosesOleh?: boolean | Rekomendasi$diprosesOlehArgs<ExtArgs>
  }, ExtArgs["result"]["rekomendasi"]>

  export type RekomendasiSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kegiatanRapatId?: boolean
    domainIsuId?: boolean
    judul?: boolean
    ringkasan?: boolean
    deskripsi?: boolean
    skorPrioritas?: boolean
    status?: boolean
    laporanLengkap?: boolean
    diprosesOlehId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    kegiatanRapat?: boolean | KegiatanRapatDefaultArgs<ExtArgs>
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
    diprosesOleh?: boolean | Rekomendasi$diprosesOlehArgs<ExtArgs>
  }, ExtArgs["result"]["rekomendasi"]>

  export type RekomendasiSelectScalar = {
    id?: boolean
    kegiatanRapatId?: boolean
    domainIsuId?: boolean
    judul?: boolean
    ringkasan?: boolean
    deskripsi?: boolean
    skorPrioritas?: boolean
    status?: boolean
    laporanLengkap?: boolean
    diprosesOlehId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RekomendasiOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "kegiatanRapatId" | "domainIsuId" | "judul" | "ringkasan" | "deskripsi" | "skorPrioritas" | "status" | "laporanLengkap" | "diprosesOlehId" | "createdAt" | "updatedAt", ExtArgs["result"]["rekomendasi"]>
  export type RekomendasiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kegiatanRapat?: boolean | KegiatanRapatDefaultArgs<ExtArgs>
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
    diprosesOleh?: boolean | Rekomendasi$diprosesOlehArgs<ExtArgs>
    masukanLinks?: boolean | Rekomendasi$masukanLinksArgs<ExtArgs>
    _count?: boolean | RekomendasiCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RekomendasiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kegiatanRapat?: boolean | KegiatanRapatDefaultArgs<ExtArgs>
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
    diprosesOleh?: boolean | Rekomendasi$diprosesOlehArgs<ExtArgs>
  }
  export type RekomendasiIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kegiatanRapat?: boolean | KegiatanRapatDefaultArgs<ExtArgs>
    domainIsu?: boolean | DomainIsuDefaultArgs<ExtArgs>
    diprosesOleh?: boolean | Rekomendasi$diprosesOlehArgs<ExtArgs>
  }

  export type $RekomendasiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rekomendasi"
    objects: {
      kegiatanRapat: Prisma.$KegiatanRapatPayload<ExtArgs>
      domainIsu: Prisma.$DomainIsuPayload<ExtArgs>
      diprosesOleh: Prisma.$UserPayload<ExtArgs> | null
      masukanLinks: Prisma.$RekomendasiMasukanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kegiatanRapatId: string
      domainIsuId: string
      judul: string
      ringkasan: string
      deskripsi: string
      skorPrioritas: number
      status: $Enums.StatusRekomendasi
      laporanLengkap: Prisma.JsonValue
      diprosesOlehId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rekomendasi"]>
    composites: {}
  }

  type RekomendasiGetPayload<S extends boolean | null | undefined | RekomendasiDefaultArgs> = $Result.GetResult<Prisma.$RekomendasiPayload, S>

  type RekomendasiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RekomendasiFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RekomendasiCountAggregateInputType | true
    }

  export interface RekomendasiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rekomendasi'], meta: { name: 'Rekomendasi' } }
    /**
     * Find zero or one Rekomendasi that matches the filter.
     * @param {RekomendasiFindUniqueArgs} args - Arguments to find a Rekomendasi
     * @example
     * // Get one Rekomendasi
     * const rekomendasi = await prisma.rekomendasi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RekomendasiFindUniqueArgs>(args: SelectSubset<T, RekomendasiFindUniqueArgs<ExtArgs>>): Prisma__RekomendasiClient<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rekomendasi that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RekomendasiFindUniqueOrThrowArgs} args - Arguments to find a Rekomendasi
     * @example
     * // Get one Rekomendasi
     * const rekomendasi = await prisma.rekomendasi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RekomendasiFindUniqueOrThrowArgs>(args: SelectSubset<T, RekomendasiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RekomendasiClient<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rekomendasi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiFindFirstArgs} args - Arguments to find a Rekomendasi
     * @example
     * // Get one Rekomendasi
     * const rekomendasi = await prisma.rekomendasi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RekomendasiFindFirstArgs>(args?: SelectSubset<T, RekomendasiFindFirstArgs<ExtArgs>>): Prisma__RekomendasiClient<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rekomendasi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiFindFirstOrThrowArgs} args - Arguments to find a Rekomendasi
     * @example
     * // Get one Rekomendasi
     * const rekomendasi = await prisma.rekomendasi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RekomendasiFindFirstOrThrowArgs>(args?: SelectSubset<T, RekomendasiFindFirstOrThrowArgs<ExtArgs>>): Prisma__RekomendasiClient<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rekomendasis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rekomendasis
     * const rekomendasis = await prisma.rekomendasi.findMany()
     * 
     * // Get first 10 Rekomendasis
     * const rekomendasis = await prisma.rekomendasi.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rekomendasiWithIdOnly = await prisma.rekomendasi.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RekomendasiFindManyArgs>(args?: SelectSubset<T, RekomendasiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rekomendasi.
     * @param {RekomendasiCreateArgs} args - Arguments to create a Rekomendasi.
     * @example
     * // Create one Rekomendasi
     * const Rekomendasi = await prisma.rekomendasi.create({
     *   data: {
     *     // ... data to create a Rekomendasi
     *   }
     * })
     * 
     */
    create<T extends RekomendasiCreateArgs>(args: SelectSubset<T, RekomendasiCreateArgs<ExtArgs>>): Prisma__RekomendasiClient<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rekomendasis.
     * @param {RekomendasiCreateManyArgs} args - Arguments to create many Rekomendasis.
     * @example
     * // Create many Rekomendasis
     * const rekomendasi = await prisma.rekomendasi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RekomendasiCreateManyArgs>(args?: SelectSubset<T, RekomendasiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rekomendasis and returns the data saved in the database.
     * @param {RekomendasiCreateManyAndReturnArgs} args - Arguments to create many Rekomendasis.
     * @example
     * // Create many Rekomendasis
     * const rekomendasi = await prisma.rekomendasi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rekomendasis and only return the `id`
     * const rekomendasiWithIdOnly = await prisma.rekomendasi.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RekomendasiCreateManyAndReturnArgs>(args?: SelectSubset<T, RekomendasiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rekomendasi.
     * @param {RekomendasiDeleteArgs} args - Arguments to delete one Rekomendasi.
     * @example
     * // Delete one Rekomendasi
     * const Rekomendasi = await prisma.rekomendasi.delete({
     *   where: {
     *     // ... filter to delete one Rekomendasi
     *   }
     * })
     * 
     */
    delete<T extends RekomendasiDeleteArgs>(args: SelectSubset<T, RekomendasiDeleteArgs<ExtArgs>>): Prisma__RekomendasiClient<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rekomendasi.
     * @param {RekomendasiUpdateArgs} args - Arguments to update one Rekomendasi.
     * @example
     * // Update one Rekomendasi
     * const rekomendasi = await prisma.rekomendasi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RekomendasiUpdateArgs>(args: SelectSubset<T, RekomendasiUpdateArgs<ExtArgs>>): Prisma__RekomendasiClient<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rekomendasis.
     * @param {RekomendasiDeleteManyArgs} args - Arguments to filter Rekomendasis to delete.
     * @example
     * // Delete a few Rekomendasis
     * const { count } = await prisma.rekomendasi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RekomendasiDeleteManyArgs>(args?: SelectSubset<T, RekomendasiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rekomendasis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rekomendasis
     * const rekomendasi = await prisma.rekomendasi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RekomendasiUpdateManyArgs>(args: SelectSubset<T, RekomendasiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rekomendasis and returns the data updated in the database.
     * @param {RekomendasiUpdateManyAndReturnArgs} args - Arguments to update many Rekomendasis.
     * @example
     * // Update many Rekomendasis
     * const rekomendasi = await prisma.rekomendasi.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rekomendasis and only return the `id`
     * const rekomendasiWithIdOnly = await prisma.rekomendasi.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RekomendasiUpdateManyAndReturnArgs>(args: SelectSubset<T, RekomendasiUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rekomendasi.
     * @param {RekomendasiUpsertArgs} args - Arguments to update or create a Rekomendasi.
     * @example
     * // Update or create a Rekomendasi
     * const rekomendasi = await prisma.rekomendasi.upsert({
     *   create: {
     *     // ... data to create a Rekomendasi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rekomendasi we want to update
     *   }
     * })
     */
    upsert<T extends RekomendasiUpsertArgs>(args: SelectSubset<T, RekomendasiUpsertArgs<ExtArgs>>): Prisma__RekomendasiClient<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rekomendasis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiCountArgs} args - Arguments to filter Rekomendasis to count.
     * @example
     * // Count the number of Rekomendasis
     * const count = await prisma.rekomendasi.count({
     *   where: {
     *     // ... the filter for the Rekomendasis we want to count
     *   }
     * })
    **/
    count<T extends RekomendasiCountArgs>(
      args?: Subset<T, RekomendasiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RekomendasiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rekomendasi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RekomendasiAggregateArgs>(args: Subset<T, RekomendasiAggregateArgs>): Prisma.PrismaPromise<GetRekomendasiAggregateType<T>>

    /**
     * Group by Rekomendasi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiGroupByArgs} args - Group by arguments.
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
      T extends RekomendasiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RekomendasiGroupByArgs['orderBy'] }
        : { orderBy?: RekomendasiGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RekomendasiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRekomendasiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rekomendasi model
   */
  readonly fields: RekomendasiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rekomendasi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RekomendasiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    kegiatanRapat<T extends KegiatanRapatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KegiatanRapatDefaultArgs<ExtArgs>>): Prisma__KegiatanRapatClient<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    domainIsu<T extends DomainIsuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DomainIsuDefaultArgs<ExtArgs>>): Prisma__DomainIsuClient<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    diprosesOleh<T extends Rekomendasi$diprosesOlehArgs<ExtArgs> = {}>(args?: Subset<T, Rekomendasi$diprosesOlehArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    masukanLinks<T extends Rekomendasi$masukanLinksArgs<ExtArgs> = {}>(args?: Subset<T, Rekomendasi$masukanLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Rekomendasi model
   */
  interface RekomendasiFieldRefs {
    readonly id: FieldRef<"Rekomendasi", 'String'>
    readonly kegiatanRapatId: FieldRef<"Rekomendasi", 'String'>
    readonly domainIsuId: FieldRef<"Rekomendasi", 'String'>
    readonly judul: FieldRef<"Rekomendasi", 'String'>
    readonly ringkasan: FieldRef<"Rekomendasi", 'String'>
    readonly deskripsi: FieldRef<"Rekomendasi", 'String'>
    readonly skorPrioritas: FieldRef<"Rekomendasi", 'Float'>
    readonly status: FieldRef<"Rekomendasi", 'StatusRekomendasi'>
    readonly laporanLengkap: FieldRef<"Rekomendasi", 'Json'>
    readonly diprosesOlehId: FieldRef<"Rekomendasi", 'String'>
    readonly createdAt: FieldRef<"Rekomendasi", 'DateTime'>
    readonly updatedAt: FieldRef<"Rekomendasi", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Rekomendasi findUnique
   */
  export type RekomendasiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
    /**
     * Filter, which Rekomendasi to fetch.
     */
    where: RekomendasiWhereUniqueInput
  }

  /**
   * Rekomendasi findUniqueOrThrow
   */
  export type RekomendasiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
    /**
     * Filter, which Rekomendasi to fetch.
     */
    where: RekomendasiWhereUniqueInput
  }

  /**
   * Rekomendasi findFirst
   */
  export type RekomendasiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
    /**
     * Filter, which Rekomendasi to fetch.
     */
    where?: RekomendasiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rekomendasis to fetch.
     */
    orderBy?: RekomendasiOrderByWithRelationInput | RekomendasiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rekomendasis.
     */
    cursor?: RekomendasiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rekomendasis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rekomendasis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rekomendasis.
     */
    distinct?: RekomendasiScalarFieldEnum | RekomendasiScalarFieldEnum[]
  }

  /**
   * Rekomendasi findFirstOrThrow
   */
  export type RekomendasiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
    /**
     * Filter, which Rekomendasi to fetch.
     */
    where?: RekomendasiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rekomendasis to fetch.
     */
    orderBy?: RekomendasiOrderByWithRelationInput | RekomendasiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rekomendasis.
     */
    cursor?: RekomendasiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rekomendasis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rekomendasis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rekomendasis.
     */
    distinct?: RekomendasiScalarFieldEnum | RekomendasiScalarFieldEnum[]
  }

  /**
   * Rekomendasi findMany
   */
  export type RekomendasiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
    /**
     * Filter, which Rekomendasis to fetch.
     */
    where?: RekomendasiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rekomendasis to fetch.
     */
    orderBy?: RekomendasiOrderByWithRelationInput | RekomendasiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rekomendasis.
     */
    cursor?: RekomendasiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rekomendasis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rekomendasis.
     */
    skip?: number
    distinct?: RekomendasiScalarFieldEnum | RekomendasiScalarFieldEnum[]
  }

  /**
   * Rekomendasi create
   */
  export type RekomendasiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
    /**
     * The data needed to create a Rekomendasi.
     */
    data: XOR<RekomendasiCreateInput, RekomendasiUncheckedCreateInput>
  }

  /**
   * Rekomendasi createMany
   */
  export type RekomendasiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rekomendasis.
     */
    data: RekomendasiCreateManyInput | RekomendasiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rekomendasi createManyAndReturn
   */
  export type RekomendasiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * The data used to create many Rekomendasis.
     */
    data: RekomendasiCreateManyInput | RekomendasiCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rekomendasi update
   */
  export type RekomendasiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
    /**
     * The data needed to update a Rekomendasi.
     */
    data: XOR<RekomendasiUpdateInput, RekomendasiUncheckedUpdateInput>
    /**
     * Choose, which Rekomendasi to update.
     */
    where: RekomendasiWhereUniqueInput
  }

  /**
   * Rekomendasi updateMany
   */
  export type RekomendasiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rekomendasis.
     */
    data: XOR<RekomendasiUpdateManyMutationInput, RekomendasiUncheckedUpdateManyInput>
    /**
     * Filter which Rekomendasis to update
     */
    where?: RekomendasiWhereInput
    /**
     * Limit how many Rekomendasis to update.
     */
    limit?: number
  }

  /**
   * Rekomendasi updateManyAndReturn
   */
  export type RekomendasiUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * The data used to update Rekomendasis.
     */
    data: XOR<RekomendasiUpdateManyMutationInput, RekomendasiUncheckedUpdateManyInput>
    /**
     * Filter which Rekomendasis to update
     */
    where?: RekomendasiWhereInput
    /**
     * Limit how many Rekomendasis to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rekomendasi upsert
   */
  export type RekomendasiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
    /**
     * The filter to search for the Rekomendasi to update in case it exists.
     */
    where: RekomendasiWhereUniqueInput
    /**
     * In case the Rekomendasi found by the `where` argument doesn't exist, create a new Rekomendasi with this data.
     */
    create: XOR<RekomendasiCreateInput, RekomendasiUncheckedCreateInput>
    /**
     * In case the Rekomendasi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RekomendasiUpdateInput, RekomendasiUncheckedUpdateInput>
  }

  /**
   * Rekomendasi delete
   */
  export type RekomendasiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
    /**
     * Filter which Rekomendasi to delete.
     */
    where: RekomendasiWhereUniqueInput
  }

  /**
   * Rekomendasi deleteMany
   */
  export type RekomendasiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rekomendasis to delete
     */
    where?: RekomendasiWhereInput
    /**
     * Limit how many Rekomendasis to delete.
     */
    limit?: number
  }

  /**
   * Rekomendasi.diprosesOleh
   */
  export type Rekomendasi$diprosesOlehArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Rekomendasi.masukanLinks
   */
  export type Rekomendasi$masukanLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanInclude<ExtArgs> | null
    where?: RekomendasiMasukanWhereInput
    orderBy?: RekomendasiMasukanOrderByWithRelationInput | RekomendasiMasukanOrderByWithRelationInput[]
    cursor?: RekomendasiMasukanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RekomendasiMasukanScalarFieldEnum | RekomendasiMasukanScalarFieldEnum[]
  }

  /**
   * Rekomendasi without action
   */
  export type RekomendasiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
  }


  /**
   * Model RekomendasiMasukan
   */

  export type AggregateRekomendasiMasukan = {
    _count: RekomendasiMasukanCountAggregateOutputType | null
    _min: RekomendasiMasukanMinAggregateOutputType | null
    _max: RekomendasiMasukanMaxAggregateOutputType | null
  }

  export type RekomendasiMasukanMinAggregateOutputType = {
    rekomendasiId: string | null
    masukanId: string | null
  }

  export type RekomendasiMasukanMaxAggregateOutputType = {
    rekomendasiId: string | null
    masukanId: string | null
  }

  export type RekomendasiMasukanCountAggregateOutputType = {
    rekomendasiId: number
    masukanId: number
    _all: number
  }


  export type RekomendasiMasukanMinAggregateInputType = {
    rekomendasiId?: true
    masukanId?: true
  }

  export type RekomendasiMasukanMaxAggregateInputType = {
    rekomendasiId?: true
    masukanId?: true
  }

  export type RekomendasiMasukanCountAggregateInputType = {
    rekomendasiId?: true
    masukanId?: true
    _all?: true
  }

  export type RekomendasiMasukanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RekomendasiMasukan to aggregate.
     */
    where?: RekomendasiMasukanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RekomendasiMasukans to fetch.
     */
    orderBy?: RekomendasiMasukanOrderByWithRelationInput | RekomendasiMasukanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RekomendasiMasukanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RekomendasiMasukans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RekomendasiMasukans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RekomendasiMasukans
    **/
    _count?: true | RekomendasiMasukanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RekomendasiMasukanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RekomendasiMasukanMaxAggregateInputType
  }

  export type GetRekomendasiMasukanAggregateType<T extends RekomendasiMasukanAggregateArgs> = {
        [P in keyof T & keyof AggregateRekomendasiMasukan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRekomendasiMasukan[P]>
      : GetScalarType<T[P], AggregateRekomendasiMasukan[P]>
  }




  export type RekomendasiMasukanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekomendasiMasukanWhereInput
    orderBy?: RekomendasiMasukanOrderByWithAggregationInput | RekomendasiMasukanOrderByWithAggregationInput[]
    by: RekomendasiMasukanScalarFieldEnum[] | RekomendasiMasukanScalarFieldEnum
    having?: RekomendasiMasukanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RekomendasiMasukanCountAggregateInputType | true
    _min?: RekomendasiMasukanMinAggregateInputType
    _max?: RekomendasiMasukanMaxAggregateInputType
  }

  export type RekomendasiMasukanGroupByOutputType = {
    rekomendasiId: string
    masukanId: string
    _count: RekomendasiMasukanCountAggregateOutputType | null
    _min: RekomendasiMasukanMinAggregateOutputType | null
    _max: RekomendasiMasukanMaxAggregateOutputType | null
  }

  type GetRekomendasiMasukanGroupByPayload<T extends RekomendasiMasukanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RekomendasiMasukanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RekomendasiMasukanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RekomendasiMasukanGroupByOutputType[P]>
            : GetScalarType<T[P], RekomendasiMasukanGroupByOutputType[P]>
        }
      >
    >


  export type RekomendasiMasukanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    rekomendasiId?: boolean
    masukanId?: boolean
    rekomendasi?: boolean | RekomendasiDefaultArgs<ExtArgs>
    masukan?: boolean | MasukanWargaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rekomendasiMasukan"]>

  export type RekomendasiMasukanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    rekomendasiId?: boolean
    masukanId?: boolean
    rekomendasi?: boolean | RekomendasiDefaultArgs<ExtArgs>
    masukan?: boolean | MasukanWargaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rekomendasiMasukan"]>

  export type RekomendasiMasukanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    rekomendasiId?: boolean
    masukanId?: boolean
    rekomendasi?: boolean | RekomendasiDefaultArgs<ExtArgs>
    masukan?: boolean | MasukanWargaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rekomendasiMasukan"]>

  export type RekomendasiMasukanSelectScalar = {
    rekomendasiId?: boolean
    masukanId?: boolean
  }

  export type RekomendasiMasukanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"rekomendasiId" | "masukanId", ExtArgs["result"]["rekomendasiMasukan"]>
  export type RekomendasiMasukanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rekomendasi?: boolean | RekomendasiDefaultArgs<ExtArgs>
    masukan?: boolean | MasukanWargaDefaultArgs<ExtArgs>
  }
  export type RekomendasiMasukanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rekomendasi?: boolean | RekomendasiDefaultArgs<ExtArgs>
    masukan?: boolean | MasukanWargaDefaultArgs<ExtArgs>
  }
  export type RekomendasiMasukanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rekomendasi?: boolean | RekomendasiDefaultArgs<ExtArgs>
    masukan?: boolean | MasukanWargaDefaultArgs<ExtArgs>
  }

  export type $RekomendasiMasukanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RekomendasiMasukan"
    objects: {
      rekomendasi: Prisma.$RekomendasiPayload<ExtArgs>
      masukan: Prisma.$MasukanWargaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      rekomendasiId: string
      masukanId: string
    }, ExtArgs["result"]["rekomendasiMasukan"]>
    composites: {}
  }

  type RekomendasiMasukanGetPayload<S extends boolean | null | undefined | RekomendasiMasukanDefaultArgs> = $Result.GetResult<Prisma.$RekomendasiMasukanPayload, S>

  type RekomendasiMasukanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RekomendasiMasukanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RekomendasiMasukanCountAggregateInputType | true
    }

  export interface RekomendasiMasukanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RekomendasiMasukan'], meta: { name: 'RekomendasiMasukan' } }
    /**
     * Find zero or one RekomendasiMasukan that matches the filter.
     * @param {RekomendasiMasukanFindUniqueArgs} args - Arguments to find a RekomendasiMasukan
     * @example
     * // Get one RekomendasiMasukan
     * const rekomendasiMasukan = await prisma.rekomendasiMasukan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RekomendasiMasukanFindUniqueArgs>(args: SelectSubset<T, RekomendasiMasukanFindUniqueArgs<ExtArgs>>): Prisma__RekomendasiMasukanClient<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RekomendasiMasukan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RekomendasiMasukanFindUniqueOrThrowArgs} args - Arguments to find a RekomendasiMasukan
     * @example
     * // Get one RekomendasiMasukan
     * const rekomendasiMasukan = await prisma.rekomendasiMasukan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RekomendasiMasukanFindUniqueOrThrowArgs>(args: SelectSubset<T, RekomendasiMasukanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RekomendasiMasukanClient<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RekomendasiMasukan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiMasukanFindFirstArgs} args - Arguments to find a RekomendasiMasukan
     * @example
     * // Get one RekomendasiMasukan
     * const rekomendasiMasukan = await prisma.rekomendasiMasukan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RekomendasiMasukanFindFirstArgs>(args?: SelectSubset<T, RekomendasiMasukanFindFirstArgs<ExtArgs>>): Prisma__RekomendasiMasukanClient<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RekomendasiMasukan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiMasukanFindFirstOrThrowArgs} args - Arguments to find a RekomendasiMasukan
     * @example
     * // Get one RekomendasiMasukan
     * const rekomendasiMasukan = await prisma.rekomendasiMasukan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RekomendasiMasukanFindFirstOrThrowArgs>(args?: SelectSubset<T, RekomendasiMasukanFindFirstOrThrowArgs<ExtArgs>>): Prisma__RekomendasiMasukanClient<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RekomendasiMasukans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiMasukanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RekomendasiMasukans
     * const rekomendasiMasukans = await prisma.rekomendasiMasukan.findMany()
     * 
     * // Get first 10 RekomendasiMasukans
     * const rekomendasiMasukans = await prisma.rekomendasiMasukan.findMany({ take: 10 })
     * 
     * // Only select the `rekomendasiId`
     * const rekomendasiMasukanWithRekomendasiIdOnly = await prisma.rekomendasiMasukan.findMany({ select: { rekomendasiId: true } })
     * 
     */
    findMany<T extends RekomendasiMasukanFindManyArgs>(args?: SelectSubset<T, RekomendasiMasukanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RekomendasiMasukan.
     * @param {RekomendasiMasukanCreateArgs} args - Arguments to create a RekomendasiMasukan.
     * @example
     * // Create one RekomendasiMasukan
     * const RekomendasiMasukan = await prisma.rekomendasiMasukan.create({
     *   data: {
     *     // ... data to create a RekomendasiMasukan
     *   }
     * })
     * 
     */
    create<T extends RekomendasiMasukanCreateArgs>(args: SelectSubset<T, RekomendasiMasukanCreateArgs<ExtArgs>>): Prisma__RekomendasiMasukanClient<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RekomendasiMasukans.
     * @param {RekomendasiMasukanCreateManyArgs} args - Arguments to create many RekomendasiMasukans.
     * @example
     * // Create many RekomendasiMasukans
     * const rekomendasiMasukan = await prisma.rekomendasiMasukan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RekomendasiMasukanCreateManyArgs>(args?: SelectSubset<T, RekomendasiMasukanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RekomendasiMasukans and returns the data saved in the database.
     * @param {RekomendasiMasukanCreateManyAndReturnArgs} args - Arguments to create many RekomendasiMasukans.
     * @example
     * // Create many RekomendasiMasukans
     * const rekomendasiMasukan = await prisma.rekomendasiMasukan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RekomendasiMasukans and only return the `rekomendasiId`
     * const rekomendasiMasukanWithRekomendasiIdOnly = await prisma.rekomendasiMasukan.createManyAndReturn({
     *   select: { rekomendasiId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RekomendasiMasukanCreateManyAndReturnArgs>(args?: SelectSubset<T, RekomendasiMasukanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RekomendasiMasukan.
     * @param {RekomendasiMasukanDeleteArgs} args - Arguments to delete one RekomendasiMasukan.
     * @example
     * // Delete one RekomendasiMasukan
     * const RekomendasiMasukan = await prisma.rekomendasiMasukan.delete({
     *   where: {
     *     // ... filter to delete one RekomendasiMasukan
     *   }
     * })
     * 
     */
    delete<T extends RekomendasiMasukanDeleteArgs>(args: SelectSubset<T, RekomendasiMasukanDeleteArgs<ExtArgs>>): Prisma__RekomendasiMasukanClient<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RekomendasiMasukan.
     * @param {RekomendasiMasukanUpdateArgs} args - Arguments to update one RekomendasiMasukan.
     * @example
     * // Update one RekomendasiMasukan
     * const rekomendasiMasukan = await prisma.rekomendasiMasukan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RekomendasiMasukanUpdateArgs>(args: SelectSubset<T, RekomendasiMasukanUpdateArgs<ExtArgs>>): Prisma__RekomendasiMasukanClient<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RekomendasiMasukans.
     * @param {RekomendasiMasukanDeleteManyArgs} args - Arguments to filter RekomendasiMasukans to delete.
     * @example
     * // Delete a few RekomendasiMasukans
     * const { count } = await prisma.rekomendasiMasukan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RekomendasiMasukanDeleteManyArgs>(args?: SelectSubset<T, RekomendasiMasukanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RekomendasiMasukans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiMasukanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RekomendasiMasukans
     * const rekomendasiMasukan = await prisma.rekomendasiMasukan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RekomendasiMasukanUpdateManyArgs>(args: SelectSubset<T, RekomendasiMasukanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RekomendasiMasukans and returns the data updated in the database.
     * @param {RekomendasiMasukanUpdateManyAndReturnArgs} args - Arguments to update many RekomendasiMasukans.
     * @example
     * // Update many RekomendasiMasukans
     * const rekomendasiMasukan = await prisma.rekomendasiMasukan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RekomendasiMasukans and only return the `rekomendasiId`
     * const rekomendasiMasukanWithRekomendasiIdOnly = await prisma.rekomendasiMasukan.updateManyAndReturn({
     *   select: { rekomendasiId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RekomendasiMasukanUpdateManyAndReturnArgs>(args: SelectSubset<T, RekomendasiMasukanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RekomendasiMasukan.
     * @param {RekomendasiMasukanUpsertArgs} args - Arguments to update or create a RekomendasiMasukan.
     * @example
     * // Update or create a RekomendasiMasukan
     * const rekomendasiMasukan = await prisma.rekomendasiMasukan.upsert({
     *   create: {
     *     // ... data to create a RekomendasiMasukan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RekomendasiMasukan we want to update
     *   }
     * })
     */
    upsert<T extends RekomendasiMasukanUpsertArgs>(args: SelectSubset<T, RekomendasiMasukanUpsertArgs<ExtArgs>>): Prisma__RekomendasiMasukanClient<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RekomendasiMasukans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiMasukanCountArgs} args - Arguments to filter RekomendasiMasukans to count.
     * @example
     * // Count the number of RekomendasiMasukans
     * const count = await prisma.rekomendasiMasukan.count({
     *   where: {
     *     // ... the filter for the RekomendasiMasukans we want to count
     *   }
     * })
    **/
    count<T extends RekomendasiMasukanCountArgs>(
      args?: Subset<T, RekomendasiMasukanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RekomendasiMasukanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RekomendasiMasukan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiMasukanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RekomendasiMasukanAggregateArgs>(args: Subset<T, RekomendasiMasukanAggregateArgs>): Prisma.PrismaPromise<GetRekomendasiMasukanAggregateType<T>>

    /**
     * Group by RekomendasiMasukan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RekomendasiMasukanGroupByArgs} args - Group by arguments.
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
      T extends RekomendasiMasukanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RekomendasiMasukanGroupByArgs['orderBy'] }
        : { orderBy?: RekomendasiMasukanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RekomendasiMasukanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRekomendasiMasukanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RekomendasiMasukan model
   */
  readonly fields: RekomendasiMasukanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RekomendasiMasukan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RekomendasiMasukanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rekomendasi<T extends RekomendasiDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RekomendasiDefaultArgs<ExtArgs>>): Prisma__RekomendasiClient<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    masukan<T extends MasukanWargaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MasukanWargaDefaultArgs<ExtArgs>>): Prisma__MasukanWargaClient<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RekomendasiMasukan model
   */
  interface RekomendasiMasukanFieldRefs {
    readonly rekomendasiId: FieldRef<"RekomendasiMasukan", 'String'>
    readonly masukanId: FieldRef<"RekomendasiMasukan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RekomendasiMasukan findUnique
   */
  export type RekomendasiMasukanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanInclude<ExtArgs> | null
    /**
     * Filter, which RekomendasiMasukan to fetch.
     */
    where: RekomendasiMasukanWhereUniqueInput
  }

  /**
   * RekomendasiMasukan findUniqueOrThrow
   */
  export type RekomendasiMasukanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanInclude<ExtArgs> | null
    /**
     * Filter, which RekomendasiMasukan to fetch.
     */
    where: RekomendasiMasukanWhereUniqueInput
  }

  /**
   * RekomendasiMasukan findFirst
   */
  export type RekomendasiMasukanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanInclude<ExtArgs> | null
    /**
     * Filter, which RekomendasiMasukan to fetch.
     */
    where?: RekomendasiMasukanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RekomendasiMasukans to fetch.
     */
    orderBy?: RekomendasiMasukanOrderByWithRelationInput | RekomendasiMasukanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RekomendasiMasukans.
     */
    cursor?: RekomendasiMasukanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RekomendasiMasukans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RekomendasiMasukans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RekomendasiMasukans.
     */
    distinct?: RekomendasiMasukanScalarFieldEnum | RekomendasiMasukanScalarFieldEnum[]
  }

  /**
   * RekomendasiMasukan findFirstOrThrow
   */
  export type RekomendasiMasukanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanInclude<ExtArgs> | null
    /**
     * Filter, which RekomendasiMasukan to fetch.
     */
    where?: RekomendasiMasukanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RekomendasiMasukans to fetch.
     */
    orderBy?: RekomendasiMasukanOrderByWithRelationInput | RekomendasiMasukanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RekomendasiMasukans.
     */
    cursor?: RekomendasiMasukanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RekomendasiMasukans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RekomendasiMasukans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RekomendasiMasukans.
     */
    distinct?: RekomendasiMasukanScalarFieldEnum | RekomendasiMasukanScalarFieldEnum[]
  }

  /**
   * RekomendasiMasukan findMany
   */
  export type RekomendasiMasukanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanInclude<ExtArgs> | null
    /**
     * Filter, which RekomendasiMasukans to fetch.
     */
    where?: RekomendasiMasukanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RekomendasiMasukans to fetch.
     */
    orderBy?: RekomendasiMasukanOrderByWithRelationInput | RekomendasiMasukanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RekomendasiMasukans.
     */
    cursor?: RekomendasiMasukanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RekomendasiMasukans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RekomendasiMasukans.
     */
    skip?: number
    distinct?: RekomendasiMasukanScalarFieldEnum | RekomendasiMasukanScalarFieldEnum[]
  }

  /**
   * RekomendasiMasukan create
   */
  export type RekomendasiMasukanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanInclude<ExtArgs> | null
    /**
     * The data needed to create a RekomendasiMasukan.
     */
    data: XOR<RekomendasiMasukanCreateInput, RekomendasiMasukanUncheckedCreateInput>
  }

  /**
   * RekomendasiMasukan createMany
   */
  export type RekomendasiMasukanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RekomendasiMasukans.
     */
    data: RekomendasiMasukanCreateManyInput | RekomendasiMasukanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RekomendasiMasukan createManyAndReturn
   */
  export type RekomendasiMasukanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * The data used to create many RekomendasiMasukans.
     */
    data: RekomendasiMasukanCreateManyInput | RekomendasiMasukanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RekomendasiMasukan update
   */
  export type RekomendasiMasukanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanInclude<ExtArgs> | null
    /**
     * The data needed to update a RekomendasiMasukan.
     */
    data: XOR<RekomendasiMasukanUpdateInput, RekomendasiMasukanUncheckedUpdateInput>
    /**
     * Choose, which RekomendasiMasukan to update.
     */
    where: RekomendasiMasukanWhereUniqueInput
  }

  /**
   * RekomendasiMasukan updateMany
   */
  export type RekomendasiMasukanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RekomendasiMasukans.
     */
    data: XOR<RekomendasiMasukanUpdateManyMutationInput, RekomendasiMasukanUncheckedUpdateManyInput>
    /**
     * Filter which RekomendasiMasukans to update
     */
    where?: RekomendasiMasukanWhereInput
    /**
     * Limit how many RekomendasiMasukans to update.
     */
    limit?: number
  }

  /**
   * RekomendasiMasukan updateManyAndReturn
   */
  export type RekomendasiMasukanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * The data used to update RekomendasiMasukans.
     */
    data: XOR<RekomendasiMasukanUpdateManyMutationInput, RekomendasiMasukanUncheckedUpdateManyInput>
    /**
     * Filter which RekomendasiMasukans to update
     */
    where?: RekomendasiMasukanWhereInput
    /**
     * Limit how many RekomendasiMasukans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RekomendasiMasukan upsert
   */
  export type RekomendasiMasukanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanInclude<ExtArgs> | null
    /**
     * The filter to search for the RekomendasiMasukan to update in case it exists.
     */
    where: RekomendasiMasukanWhereUniqueInput
    /**
     * In case the RekomendasiMasukan found by the `where` argument doesn't exist, create a new RekomendasiMasukan with this data.
     */
    create: XOR<RekomendasiMasukanCreateInput, RekomendasiMasukanUncheckedCreateInput>
    /**
     * In case the RekomendasiMasukan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RekomendasiMasukanUpdateInput, RekomendasiMasukanUncheckedUpdateInput>
  }

  /**
   * RekomendasiMasukan delete
   */
  export type RekomendasiMasukanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanInclude<ExtArgs> | null
    /**
     * Filter which RekomendasiMasukan to delete.
     */
    where: RekomendasiMasukanWhereUniqueInput
  }

  /**
   * RekomendasiMasukan deleteMany
   */
  export type RekomendasiMasukanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RekomendasiMasukans to delete
     */
    where?: RekomendasiMasukanWhereInput
    /**
     * Limit how many RekomendasiMasukans to delete.
     */
    limit?: number
  }

  /**
   * RekomendasiMasukan without action
   */
  export type RekomendasiMasukanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RekomendasiMasukan
     */
    select?: RekomendasiMasukanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RekomendasiMasukan
     */
    omit?: RekomendasiMasukanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiMasukanInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
    role: string | null
    phoneNumber: string | null
    jabatan: string | null
    isActive: boolean | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
    role: string | null
    phoneNumber: string | null
    jabatan: string | null
    isActive: boolean | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    role: number
    phoneNumber: number
    jabatan: number
    isActive: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    role?: true
    phoneNumber?: true
    jabatan?: true
    isActive?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    role?: true
    phoneNumber?: true
    jabatan?: true
    isActive?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    role?: true
    phoneNumber?: true
    jabatan?: true
    isActive?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    role: string | null
    phoneNumber: string | null
    jabatan: string | null
    isActive: boolean | null
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    role?: boolean
    phoneNumber?: boolean
    jabatan?: boolean
    isActive?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    role?: boolean
    phoneNumber?: boolean
    jabatan?: boolean
    isActive?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    role?: boolean
    phoneNumber?: boolean
    jabatan?: boolean
    isActive?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    role?: boolean
    phoneNumber?: boolean
    jabatan?: boolean
    isActive?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId" | "role" | "phoneNumber" | "jabatan" | "isActive", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
      role: string | null
      phoneNumber: string | null
      jabatan: string | null
      isActive: boolean | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly role: FieldRef<"Session", 'String'>
    readonly phoneNumber: FieldRef<"Session", 'String'>
    readonly jabatan: FieldRef<"Session", 'String'>
    readonly isActive: FieldRef<"Session", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
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
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model KegiatanRapat
   */

  export type AggregateKegiatanRapat = {
    _count: KegiatanRapatCountAggregateOutputType | null
    _min: KegiatanRapatMinAggregateOutputType | null
    _max: KegiatanRapatMaxAggregateOutputType | null
  }

  export type KegiatanRapatMinAggregateOutputType = {
    id: string | null
    judul: string | null
    deskripsi: string | null
    tanggal: Date | null
    lokasi: string | null
    domainIsuId: string | null
    dibuatOlehId: string | null
    aiModel: string | null
    aiPromptHash: string | null
    aiProcessedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KegiatanRapatMaxAggregateOutputType = {
    id: string | null
    judul: string | null
    deskripsi: string | null
    tanggal: Date | null
    lokasi: string | null
    domainIsuId: string | null
    dibuatOlehId: string | null
    aiModel: string | null
    aiPromptHash: string | null
    aiProcessedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KegiatanRapatCountAggregateOutputType = {
    id: number
    judul: number
    deskripsi: number
    tanggal: number
    lokasi: number
    domainIsuId: number
    dibuatOlehId: number
    aiModel: number
    aiPromptHash: number
    aiProcessedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type KegiatanRapatMinAggregateInputType = {
    id?: true
    judul?: true
    deskripsi?: true
    tanggal?: true
    lokasi?: true
    domainIsuId?: true
    dibuatOlehId?: true
    aiModel?: true
    aiPromptHash?: true
    aiProcessedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KegiatanRapatMaxAggregateInputType = {
    id?: true
    judul?: true
    deskripsi?: true
    tanggal?: true
    lokasi?: true
    domainIsuId?: true
    dibuatOlehId?: true
    aiModel?: true
    aiPromptHash?: true
    aiProcessedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KegiatanRapatCountAggregateInputType = {
    id?: true
    judul?: true
    deskripsi?: true
    tanggal?: true
    lokasi?: true
    domainIsuId?: true
    dibuatOlehId?: true
    aiModel?: true
    aiPromptHash?: true
    aiProcessedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type KegiatanRapatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KegiatanRapat to aggregate.
     */
    where?: KegiatanRapatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KegiatanRapats to fetch.
     */
    orderBy?: KegiatanRapatOrderByWithRelationInput | KegiatanRapatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KegiatanRapatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KegiatanRapats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KegiatanRapats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KegiatanRapats
    **/
    _count?: true | KegiatanRapatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KegiatanRapatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KegiatanRapatMaxAggregateInputType
  }

  export type GetKegiatanRapatAggregateType<T extends KegiatanRapatAggregateArgs> = {
        [P in keyof T & keyof AggregateKegiatanRapat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKegiatanRapat[P]>
      : GetScalarType<T[P], AggregateKegiatanRapat[P]>
  }




  export type KegiatanRapatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KegiatanRapatWhereInput
    orderBy?: KegiatanRapatOrderByWithAggregationInput | KegiatanRapatOrderByWithAggregationInput[]
    by: KegiatanRapatScalarFieldEnum[] | KegiatanRapatScalarFieldEnum
    having?: KegiatanRapatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KegiatanRapatCountAggregateInputType | true
    _min?: KegiatanRapatMinAggregateInputType
    _max?: KegiatanRapatMaxAggregateInputType
  }

  export type KegiatanRapatGroupByOutputType = {
    id: string
    judul: string
    deskripsi: string
    tanggal: Date
    lokasi: string | null
    domainIsuId: string | null
    dibuatOlehId: string
    aiModel: string | null
    aiPromptHash: string | null
    aiProcessedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: KegiatanRapatCountAggregateOutputType | null
    _min: KegiatanRapatMinAggregateOutputType | null
    _max: KegiatanRapatMaxAggregateOutputType | null
  }

  type GetKegiatanRapatGroupByPayload<T extends KegiatanRapatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KegiatanRapatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KegiatanRapatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KegiatanRapatGroupByOutputType[P]>
            : GetScalarType<T[P], KegiatanRapatGroupByOutputType[P]>
        }
      >
    >


  export type KegiatanRapatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    judul?: boolean
    deskripsi?: boolean
    tanggal?: boolean
    lokasi?: boolean
    domainIsuId?: boolean
    dibuatOlehId?: boolean
    aiModel?: boolean
    aiPromptHash?: boolean
    aiProcessedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domainIsu?: boolean | KegiatanRapat$domainIsuArgs<ExtArgs>
    dibuatOleh?: boolean | UserDefaultArgs<ExtArgs>
    rekomendasi?: boolean | KegiatanRapat$rekomendasiArgs<ExtArgs>
    _count?: boolean | KegiatanRapatCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kegiatanRapat"]>

  export type KegiatanRapatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    judul?: boolean
    deskripsi?: boolean
    tanggal?: boolean
    lokasi?: boolean
    domainIsuId?: boolean
    dibuatOlehId?: boolean
    aiModel?: boolean
    aiPromptHash?: boolean
    aiProcessedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domainIsu?: boolean | KegiatanRapat$domainIsuArgs<ExtArgs>
    dibuatOleh?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kegiatanRapat"]>

  export type KegiatanRapatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    judul?: boolean
    deskripsi?: boolean
    tanggal?: boolean
    lokasi?: boolean
    domainIsuId?: boolean
    dibuatOlehId?: boolean
    aiModel?: boolean
    aiPromptHash?: boolean
    aiProcessedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domainIsu?: boolean | KegiatanRapat$domainIsuArgs<ExtArgs>
    dibuatOleh?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kegiatanRapat"]>

  export type KegiatanRapatSelectScalar = {
    id?: boolean
    judul?: boolean
    deskripsi?: boolean
    tanggal?: boolean
    lokasi?: boolean
    domainIsuId?: boolean
    dibuatOlehId?: boolean
    aiModel?: boolean
    aiPromptHash?: boolean
    aiProcessedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type KegiatanRapatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "judul" | "deskripsi" | "tanggal" | "lokasi" | "domainIsuId" | "dibuatOlehId" | "aiModel" | "aiPromptHash" | "aiProcessedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["kegiatanRapat"]>
  export type KegiatanRapatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domainIsu?: boolean | KegiatanRapat$domainIsuArgs<ExtArgs>
    dibuatOleh?: boolean | UserDefaultArgs<ExtArgs>
    rekomendasi?: boolean | KegiatanRapat$rekomendasiArgs<ExtArgs>
    _count?: boolean | KegiatanRapatCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KegiatanRapatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domainIsu?: boolean | KegiatanRapat$domainIsuArgs<ExtArgs>
    dibuatOleh?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type KegiatanRapatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domainIsu?: boolean | KegiatanRapat$domainIsuArgs<ExtArgs>
    dibuatOleh?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $KegiatanRapatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KegiatanRapat"
    objects: {
      domainIsu: Prisma.$DomainIsuPayload<ExtArgs> | null
      dibuatOleh: Prisma.$UserPayload<ExtArgs>
      rekomendasi: Prisma.$RekomendasiPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      judul: string
      deskripsi: string
      tanggal: Date
      lokasi: string | null
      domainIsuId: string | null
      dibuatOlehId: string
      aiModel: string | null
      aiPromptHash: string | null
      aiProcessedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["kegiatanRapat"]>
    composites: {}
  }

  type KegiatanRapatGetPayload<S extends boolean | null | undefined | KegiatanRapatDefaultArgs> = $Result.GetResult<Prisma.$KegiatanRapatPayload, S>

  type KegiatanRapatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KegiatanRapatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KegiatanRapatCountAggregateInputType | true
    }

  export interface KegiatanRapatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KegiatanRapat'], meta: { name: 'KegiatanRapat' } }
    /**
     * Find zero or one KegiatanRapat that matches the filter.
     * @param {KegiatanRapatFindUniqueArgs} args - Arguments to find a KegiatanRapat
     * @example
     * // Get one KegiatanRapat
     * const kegiatanRapat = await prisma.kegiatanRapat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KegiatanRapatFindUniqueArgs>(args: SelectSubset<T, KegiatanRapatFindUniqueArgs<ExtArgs>>): Prisma__KegiatanRapatClient<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KegiatanRapat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KegiatanRapatFindUniqueOrThrowArgs} args - Arguments to find a KegiatanRapat
     * @example
     * // Get one KegiatanRapat
     * const kegiatanRapat = await prisma.kegiatanRapat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KegiatanRapatFindUniqueOrThrowArgs>(args: SelectSubset<T, KegiatanRapatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KegiatanRapatClient<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KegiatanRapat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KegiatanRapatFindFirstArgs} args - Arguments to find a KegiatanRapat
     * @example
     * // Get one KegiatanRapat
     * const kegiatanRapat = await prisma.kegiatanRapat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KegiatanRapatFindFirstArgs>(args?: SelectSubset<T, KegiatanRapatFindFirstArgs<ExtArgs>>): Prisma__KegiatanRapatClient<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KegiatanRapat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KegiatanRapatFindFirstOrThrowArgs} args - Arguments to find a KegiatanRapat
     * @example
     * // Get one KegiatanRapat
     * const kegiatanRapat = await prisma.kegiatanRapat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KegiatanRapatFindFirstOrThrowArgs>(args?: SelectSubset<T, KegiatanRapatFindFirstOrThrowArgs<ExtArgs>>): Prisma__KegiatanRapatClient<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KegiatanRapats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KegiatanRapatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KegiatanRapats
     * const kegiatanRapats = await prisma.kegiatanRapat.findMany()
     * 
     * // Get first 10 KegiatanRapats
     * const kegiatanRapats = await prisma.kegiatanRapat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kegiatanRapatWithIdOnly = await prisma.kegiatanRapat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KegiatanRapatFindManyArgs>(args?: SelectSubset<T, KegiatanRapatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KegiatanRapat.
     * @param {KegiatanRapatCreateArgs} args - Arguments to create a KegiatanRapat.
     * @example
     * // Create one KegiatanRapat
     * const KegiatanRapat = await prisma.kegiatanRapat.create({
     *   data: {
     *     // ... data to create a KegiatanRapat
     *   }
     * })
     * 
     */
    create<T extends KegiatanRapatCreateArgs>(args: SelectSubset<T, KegiatanRapatCreateArgs<ExtArgs>>): Prisma__KegiatanRapatClient<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KegiatanRapats.
     * @param {KegiatanRapatCreateManyArgs} args - Arguments to create many KegiatanRapats.
     * @example
     * // Create many KegiatanRapats
     * const kegiatanRapat = await prisma.kegiatanRapat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KegiatanRapatCreateManyArgs>(args?: SelectSubset<T, KegiatanRapatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KegiatanRapats and returns the data saved in the database.
     * @param {KegiatanRapatCreateManyAndReturnArgs} args - Arguments to create many KegiatanRapats.
     * @example
     * // Create many KegiatanRapats
     * const kegiatanRapat = await prisma.kegiatanRapat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KegiatanRapats and only return the `id`
     * const kegiatanRapatWithIdOnly = await prisma.kegiatanRapat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KegiatanRapatCreateManyAndReturnArgs>(args?: SelectSubset<T, KegiatanRapatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KegiatanRapat.
     * @param {KegiatanRapatDeleteArgs} args - Arguments to delete one KegiatanRapat.
     * @example
     * // Delete one KegiatanRapat
     * const KegiatanRapat = await prisma.kegiatanRapat.delete({
     *   where: {
     *     // ... filter to delete one KegiatanRapat
     *   }
     * })
     * 
     */
    delete<T extends KegiatanRapatDeleteArgs>(args: SelectSubset<T, KegiatanRapatDeleteArgs<ExtArgs>>): Prisma__KegiatanRapatClient<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KegiatanRapat.
     * @param {KegiatanRapatUpdateArgs} args - Arguments to update one KegiatanRapat.
     * @example
     * // Update one KegiatanRapat
     * const kegiatanRapat = await prisma.kegiatanRapat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KegiatanRapatUpdateArgs>(args: SelectSubset<T, KegiatanRapatUpdateArgs<ExtArgs>>): Prisma__KegiatanRapatClient<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KegiatanRapats.
     * @param {KegiatanRapatDeleteManyArgs} args - Arguments to filter KegiatanRapats to delete.
     * @example
     * // Delete a few KegiatanRapats
     * const { count } = await prisma.kegiatanRapat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KegiatanRapatDeleteManyArgs>(args?: SelectSubset<T, KegiatanRapatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KegiatanRapats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KegiatanRapatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KegiatanRapats
     * const kegiatanRapat = await prisma.kegiatanRapat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KegiatanRapatUpdateManyArgs>(args: SelectSubset<T, KegiatanRapatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KegiatanRapats and returns the data updated in the database.
     * @param {KegiatanRapatUpdateManyAndReturnArgs} args - Arguments to update many KegiatanRapats.
     * @example
     * // Update many KegiatanRapats
     * const kegiatanRapat = await prisma.kegiatanRapat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KegiatanRapats and only return the `id`
     * const kegiatanRapatWithIdOnly = await prisma.kegiatanRapat.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KegiatanRapatUpdateManyAndReturnArgs>(args: SelectSubset<T, KegiatanRapatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KegiatanRapat.
     * @param {KegiatanRapatUpsertArgs} args - Arguments to update or create a KegiatanRapat.
     * @example
     * // Update or create a KegiatanRapat
     * const kegiatanRapat = await prisma.kegiatanRapat.upsert({
     *   create: {
     *     // ... data to create a KegiatanRapat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KegiatanRapat we want to update
     *   }
     * })
     */
    upsert<T extends KegiatanRapatUpsertArgs>(args: SelectSubset<T, KegiatanRapatUpsertArgs<ExtArgs>>): Prisma__KegiatanRapatClient<$Result.GetResult<Prisma.$KegiatanRapatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KegiatanRapats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KegiatanRapatCountArgs} args - Arguments to filter KegiatanRapats to count.
     * @example
     * // Count the number of KegiatanRapats
     * const count = await prisma.kegiatanRapat.count({
     *   where: {
     *     // ... the filter for the KegiatanRapats we want to count
     *   }
     * })
    **/
    count<T extends KegiatanRapatCountArgs>(
      args?: Subset<T, KegiatanRapatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KegiatanRapatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KegiatanRapat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KegiatanRapatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KegiatanRapatAggregateArgs>(args: Subset<T, KegiatanRapatAggregateArgs>): Prisma.PrismaPromise<GetKegiatanRapatAggregateType<T>>

    /**
     * Group by KegiatanRapat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KegiatanRapatGroupByArgs} args - Group by arguments.
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
      T extends KegiatanRapatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KegiatanRapatGroupByArgs['orderBy'] }
        : { orderBy?: KegiatanRapatGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KegiatanRapatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKegiatanRapatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KegiatanRapat model
   */
  readonly fields: KegiatanRapatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KegiatanRapat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KegiatanRapatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domainIsu<T extends KegiatanRapat$domainIsuArgs<ExtArgs> = {}>(args?: Subset<T, KegiatanRapat$domainIsuArgs<ExtArgs>>): Prisma__DomainIsuClient<$Result.GetResult<Prisma.$DomainIsuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    dibuatOleh<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rekomendasi<T extends KegiatanRapat$rekomendasiArgs<ExtArgs> = {}>(args?: Subset<T, KegiatanRapat$rekomendasiArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the KegiatanRapat model
   */
  interface KegiatanRapatFieldRefs {
    readonly id: FieldRef<"KegiatanRapat", 'String'>
    readonly judul: FieldRef<"KegiatanRapat", 'String'>
    readonly deskripsi: FieldRef<"KegiatanRapat", 'String'>
    readonly tanggal: FieldRef<"KegiatanRapat", 'DateTime'>
    readonly lokasi: FieldRef<"KegiatanRapat", 'String'>
    readonly domainIsuId: FieldRef<"KegiatanRapat", 'String'>
    readonly dibuatOlehId: FieldRef<"KegiatanRapat", 'String'>
    readonly aiModel: FieldRef<"KegiatanRapat", 'String'>
    readonly aiPromptHash: FieldRef<"KegiatanRapat", 'String'>
    readonly aiProcessedAt: FieldRef<"KegiatanRapat", 'DateTime'>
    readonly createdAt: FieldRef<"KegiatanRapat", 'DateTime'>
    readonly updatedAt: FieldRef<"KegiatanRapat", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KegiatanRapat findUnique
   */
  export type KegiatanRapatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatInclude<ExtArgs> | null
    /**
     * Filter, which KegiatanRapat to fetch.
     */
    where: KegiatanRapatWhereUniqueInput
  }

  /**
   * KegiatanRapat findUniqueOrThrow
   */
  export type KegiatanRapatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatInclude<ExtArgs> | null
    /**
     * Filter, which KegiatanRapat to fetch.
     */
    where: KegiatanRapatWhereUniqueInput
  }

  /**
   * KegiatanRapat findFirst
   */
  export type KegiatanRapatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatInclude<ExtArgs> | null
    /**
     * Filter, which KegiatanRapat to fetch.
     */
    where?: KegiatanRapatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KegiatanRapats to fetch.
     */
    orderBy?: KegiatanRapatOrderByWithRelationInput | KegiatanRapatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KegiatanRapats.
     */
    cursor?: KegiatanRapatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KegiatanRapats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KegiatanRapats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KegiatanRapats.
     */
    distinct?: KegiatanRapatScalarFieldEnum | KegiatanRapatScalarFieldEnum[]
  }

  /**
   * KegiatanRapat findFirstOrThrow
   */
  export type KegiatanRapatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatInclude<ExtArgs> | null
    /**
     * Filter, which KegiatanRapat to fetch.
     */
    where?: KegiatanRapatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KegiatanRapats to fetch.
     */
    orderBy?: KegiatanRapatOrderByWithRelationInput | KegiatanRapatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KegiatanRapats.
     */
    cursor?: KegiatanRapatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KegiatanRapats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KegiatanRapats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KegiatanRapats.
     */
    distinct?: KegiatanRapatScalarFieldEnum | KegiatanRapatScalarFieldEnum[]
  }

  /**
   * KegiatanRapat findMany
   */
  export type KegiatanRapatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatInclude<ExtArgs> | null
    /**
     * Filter, which KegiatanRapats to fetch.
     */
    where?: KegiatanRapatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KegiatanRapats to fetch.
     */
    orderBy?: KegiatanRapatOrderByWithRelationInput | KegiatanRapatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KegiatanRapats.
     */
    cursor?: KegiatanRapatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KegiatanRapats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KegiatanRapats.
     */
    skip?: number
    distinct?: KegiatanRapatScalarFieldEnum | KegiatanRapatScalarFieldEnum[]
  }

  /**
   * KegiatanRapat create
   */
  export type KegiatanRapatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatInclude<ExtArgs> | null
    /**
     * The data needed to create a KegiatanRapat.
     */
    data: XOR<KegiatanRapatCreateInput, KegiatanRapatUncheckedCreateInput>
  }

  /**
   * KegiatanRapat createMany
   */
  export type KegiatanRapatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KegiatanRapats.
     */
    data: KegiatanRapatCreateManyInput | KegiatanRapatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KegiatanRapat createManyAndReturn
   */
  export type KegiatanRapatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * The data used to create many KegiatanRapats.
     */
    data: KegiatanRapatCreateManyInput | KegiatanRapatCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KegiatanRapat update
   */
  export type KegiatanRapatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatInclude<ExtArgs> | null
    /**
     * The data needed to update a KegiatanRapat.
     */
    data: XOR<KegiatanRapatUpdateInput, KegiatanRapatUncheckedUpdateInput>
    /**
     * Choose, which KegiatanRapat to update.
     */
    where: KegiatanRapatWhereUniqueInput
  }

  /**
   * KegiatanRapat updateMany
   */
  export type KegiatanRapatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KegiatanRapats.
     */
    data: XOR<KegiatanRapatUpdateManyMutationInput, KegiatanRapatUncheckedUpdateManyInput>
    /**
     * Filter which KegiatanRapats to update
     */
    where?: KegiatanRapatWhereInput
    /**
     * Limit how many KegiatanRapats to update.
     */
    limit?: number
  }

  /**
   * KegiatanRapat updateManyAndReturn
   */
  export type KegiatanRapatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * The data used to update KegiatanRapats.
     */
    data: XOR<KegiatanRapatUpdateManyMutationInput, KegiatanRapatUncheckedUpdateManyInput>
    /**
     * Filter which KegiatanRapats to update
     */
    where?: KegiatanRapatWhereInput
    /**
     * Limit how many KegiatanRapats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * KegiatanRapat upsert
   */
  export type KegiatanRapatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatInclude<ExtArgs> | null
    /**
     * The filter to search for the KegiatanRapat to update in case it exists.
     */
    where: KegiatanRapatWhereUniqueInput
    /**
     * In case the KegiatanRapat found by the `where` argument doesn't exist, create a new KegiatanRapat with this data.
     */
    create: XOR<KegiatanRapatCreateInput, KegiatanRapatUncheckedCreateInput>
    /**
     * In case the KegiatanRapat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KegiatanRapatUpdateInput, KegiatanRapatUncheckedUpdateInput>
  }

  /**
   * KegiatanRapat delete
   */
  export type KegiatanRapatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatInclude<ExtArgs> | null
    /**
     * Filter which KegiatanRapat to delete.
     */
    where: KegiatanRapatWhereUniqueInput
  }

  /**
   * KegiatanRapat deleteMany
   */
  export type KegiatanRapatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KegiatanRapats to delete
     */
    where?: KegiatanRapatWhereInput
    /**
     * Limit how many KegiatanRapats to delete.
     */
    limit?: number
  }

  /**
   * KegiatanRapat.domainIsu
   */
  export type KegiatanRapat$domainIsuArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainIsu
     */
    select?: DomainIsuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainIsu
     */
    omit?: DomainIsuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIsuInclude<ExtArgs> | null
    where?: DomainIsuWhereInput
  }

  /**
   * KegiatanRapat.rekomendasi
   */
  export type KegiatanRapat$rekomendasiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rekomendasi
     */
    select?: RekomendasiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rekomendasi
     */
    omit?: RekomendasiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RekomendasiInclude<ExtArgs> | null
    where?: RekomendasiWhereInput
    orderBy?: RekomendasiOrderByWithRelationInput | RekomendasiOrderByWithRelationInput[]
    cursor?: RekomendasiWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RekomendasiScalarFieldEnum | RekomendasiScalarFieldEnum[]
  }

  /**
   * KegiatanRapat without action
   */
  export type KegiatanRapatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KegiatanRapat
     */
    select?: KegiatanRapatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KegiatanRapat
     */
    omit?: KegiatanRapatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KegiatanRapatInclude<ExtArgs> | null
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


  export const DomainIsuScalarFieldEnum: {
    id: 'id',
    code: 'code',
    nama: 'nama',
    deskripsi: 'deskripsi',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DomainIsuScalarFieldEnum = (typeof DomainIsuScalarFieldEnum)[keyof typeof DomainIsuScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    jabatan: 'jabatan',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    emailVerified: 'emailVerified',
    image: 'image',
    phoneNumber: 'phoneNumber'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MasukanWargaScalarFieldEnum: {
    id: 'id',
    judul: 'judul',
    deskripsi: 'deskripsi',
    lokasiRt: 'lokasiRt',
    lokasiRw: 'lokasiRw',
    domainIsuId: 'domainIsuId',
    status: 'status',
    diverifikasiOlehId: 'diverifikasiOlehId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MasukanWargaScalarFieldEnum = (typeof MasukanWargaScalarFieldEnum)[keyof typeof MasukanWargaScalarFieldEnum]


  export const DataMasterScalarFieldEnum: {
    id: 'id',
    domainIsuId: 'domainIsuId',
    namaAtribut: 'namaAtribut',
    nilai: 'nilai',
    jumlah: 'jumlah',
    lokasiRt: 'lokasiRt',
    lokasiRw: 'lokasiRw',
    sumberData: 'sumberData',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DataMasterScalarFieldEnum = (typeof DataMasterScalarFieldEnum)[keyof typeof DataMasterScalarFieldEnum]


  export const RekomendasiScalarFieldEnum: {
    id: 'id',
    kegiatanRapatId: 'kegiatanRapatId',
    domainIsuId: 'domainIsuId',
    judul: 'judul',
    ringkasan: 'ringkasan',
    deskripsi: 'deskripsi',
    skorPrioritas: 'skorPrioritas',
    status: 'status',
    laporanLengkap: 'laporanLengkap',
    diprosesOlehId: 'diprosesOlehId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RekomendasiScalarFieldEnum = (typeof RekomendasiScalarFieldEnum)[keyof typeof RekomendasiScalarFieldEnum]


  export const RekomendasiMasukanScalarFieldEnum: {
    rekomendasiId: 'rekomendasiId',
    masukanId: 'masukanId'
  };

  export type RekomendasiMasukanScalarFieldEnum = (typeof RekomendasiMasukanScalarFieldEnum)[keyof typeof RekomendasiMasukanScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId',
    role: 'role',
    phoneNumber: 'phoneNumber',
    jabatan: 'jabatan',
    isActive: 'isActive'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const KegiatanRapatScalarFieldEnum: {
    id: 'id',
    judul: 'judul',
    deskripsi: 'deskripsi',
    tanggal: 'tanggal',
    lokasi: 'lokasi',
    domainIsuId: 'domainIsuId',
    dibuatOlehId: 'dibuatOlehId',
    aiModel: 'aiModel',
    aiPromptHash: 'aiPromptHash',
    aiProcessedAt: 'aiProcessedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type KegiatanRapatScalarFieldEnum = (typeof KegiatanRapatScalarFieldEnum)[keyof typeof KegiatanRapatScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'StatusMasukan'
   */
  export type EnumStatusMasukanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusMasukan'>
    


  /**
   * Reference to a field of type 'StatusMasukan[]'
   */
  export type ListEnumStatusMasukanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusMasukan[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'StatusRekomendasi'
   */
  export type EnumStatusRekomendasiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusRekomendasi'>
    


  /**
   * Reference to a field of type 'StatusRekomendasi[]'
   */
  export type ListEnumStatusRekomendasiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusRekomendasi[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type DomainIsuWhereInput = {
    AND?: DomainIsuWhereInput | DomainIsuWhereInput[]
    OR?: DomainIsuWhereInput[]
    NOT?: DomainIsuWhereInput | DomainIsuWhereInput[]
    id?: StringFilter<"DomainIsu"> | string
    code?: StringFilter<"DomainIsu"> | string
    nama?: StringFilter<"DomainIsu"> | string
    deskripsi?: StringNullableFilter<"DomainIsu"> | string | null
    createdAt?: DateTimeFilter<"DomainIsu"> | Date | string
    updatedAt?: DateTimeFilter<"DomainIsu"> | Date | string
    masukan?: MasukanWargaListRelationFilter
    dataMaster?: DataMasterListRelationFilter
    rekomendasi?: RekomendasiListRelationFilter
    kegiatanRapat?: KegiatanRapatListRelationFilter
  }

  export type DomainIsuOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    nama?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    masukan?: MasukanWargaOrderByRelationAggregateInput
    dataMaster?: DataMasterOrderByRelationAggregateInput
    rekomendasi?: RekomendasiOrderByRelationAggregateInput
    kegiatanRapat?: KegiatanRapatOrderByRelationAggregateInput
  }

  export type DomainIsuWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: DomainIsuWhereInput | DomainIsuWhereInput[]
    OR?: DomainIsuWhereInput[]
    NOT?: DomainIsuWhereInput | DomainIsuWhereInput[]
    nama?: StringFilter<"DomainIsu"> | string
    deskripsi?: StringNullableFilter<"DomainIsu"> | string | null
    createdAt?: DateTimeFilter<"DomainIsu"> | Date | string
    updatedAt?: DateTimeFilter<"DomainIsu"> | Date | string
    masukan?: MasukanWargaListRelationFilter
    dataMaster?: DataMasterListRelationFilter
    rekomendasi?: RekomendasiListRelationFilter
    kegiatanRapat?: KegiatanRapatListRelationFilter
  }, "id" | "code">

  export type DomainIsuOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    nama?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DomainIsuCountOrderByAggregateInput
    _max?: DomainIsuMaxOrderByAggregateInput
    _min?: DomainIsuMinOrderByAggregateInput
  }

  export type DomainIsuScalarWhereWithAggregatesInput = {
    AND?: DomainIsuScalarWhereWithAggregatesInput | DomainIsuScalarWhereWithAggregatesInput[]
    OR?: DomainIsuScalarWhereWithAggregatesInput[]
    NOT?: DomainIsuScalarWhereWithAggregatesInput | DomainIsuScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DomainIsu"> | string
    code?: StringWithAggregatesFilter<"DomainIsu"> | string
    nama?: StringWithAggregatesFilter<"DomainIsu"> | string
    deskripsi?: StringNullableWithAggregatesFilter<"DomainIsu"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DomainIsu"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DomainIsu"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    jabatan?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    masukanVerifikasi?: MasukanWargaListRelationFilter
    rekomendasiDiproses?: RekomendasiListRelationFilter
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    kegiatanRapat?: KegiatanRapatListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    jabatan?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    masukanVerifikasi?: MasukanWargaOrderByRelationAggregateInput
    rekomendasiDiproses?: RekomendasiOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    kegiatanRapat?: KegiatanRapatOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    jabatan?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    masukanVerifikasi?: MasukanWargaListRelationFilter
    rekomendasiDiproses?: RekomendasiListRelationFilter
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    kegiatanRapat?: KegiatanRapatListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    jabatan?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    jabatan?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type MasukanWargaWhereInput = {
    AND?: MasukanWargaWhereInput | MasukanWargaWhereInput[]
    OR?: MasukanWargaWhereInput[]
    NOT?: MasukanWargaWhereInput | MasukanWargaWhereInput[]
    id?: StringFilter<"MasukanWarga"> | string
    judul?: StringFilter<"MasukanWarga"> | string
    deskripsi?: StringFilter<"MasukanWarga"> | string
    lokasiRt?: IntFilter<"MasukanWarga"> | number
    lokasiRw?: IntFilter<"MasukanWarga"> | number
    domainIsuId?: StringFilter<"MasukanWarga"> | string
    status?: EnumStatusMasukanFilter<"MasukanWarga"> | $Enums.StatusMasukan
    diverifikasiOlehId?: StringNullableFilter<"MasukanWarga"> | string | null
    createdAt?: DateTimeFilter<"MasukanWarga"> | Date | string
    updatedAt?: DateTimeFilter<"MasukanWarga"> | Date | string
    domainIsu?: XOR<DomainIsuScalarRelationFilter, DomainIsuWhereInput>
    diverifikasiOleh?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    rekomendasiLinks?: RekomendasiMasukanListRelationFilter
  }

  export type MasukanWargaOrderByWithRelationInput = {
    id?: SortOrder
    judul?: SortOrder
    deskripsi?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    domainIsuId?: SortOrder
    status?: SortOrder
    diverifikasiOlehId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domainIsu?: DomainIsuOrderByWithRelationInput
    diverifikasiOleh?: UserOrderByWithRelationInput
    rekomendasiLinks?: RekomendasiMasukanOrderByRelationAggregateInput
  }

  export type MasukanWargaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MasukanWargaWhereInput | MasukanWargaWhereInput[]
    OR?: MasukanWargaWhereInput[]
    NOT?: MasukanWargaWhereInput | MasukanWargaWhereInput[]
    judul?: StringFilter<"MasukanWarga"> | string
    deskripsi?: StringFilter<"MasukanWarga"> | string
    lokasiRt?: IntFilter<"MasukanWarga"> | number
    lokasiRw?: IntFilter<"MasukanWarga"> | number
    domainIsuId?: StringFilter<"MasukanWarga"> | string
    status?: EnumStatusMasukanFilter<"MasukanWarga"> | $Enums.StatusMasukan
    diverifikasiOlehId?: StringNullableFilter<"MasukanWarga"> | string | null
    createdAt?: DateTimeFilter<"MasukanWarga"> | Date | string
    updatedAt?: DateTimeFilter<"MasukanWarga"> | Date | string
    domainIsu?: XOR<DomainIsuScalarRelationFilter, DomainIsuWhereInput>
    diverifikasiOleh?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    rekomendasiLinks?: RekomendasiMasukanListRelationFilter
  }, "id">

  export type MasukanWargaOrderByWithAggregationInput = {
    id?: SortOrder
    judul?: SortOrder
    deskripsi?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    domainIsuId?: SortOrder
    status?: SortOrder
    diverifikasiOlehId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MasukanWargaCountOrderByAggregateInput
    _avg?: MasukanWargaAvgOrderByAggregateInput
    _max?: MasukanWargaMaxOrderByAggregateInput
    _min?: MasukanWargaMinOrderByAggregateInput
    _sum?: MasukanWargaSumOrderByAggregateInput
  }

  export type MasukanWargaScalarWhereWithAggregatesInput = {
    AND?: MasukanWargaScalarWhereWithAggregatesInput | MasukanWargaScalarWhereWithAggregatesInput[]
    OR?: MasukanWargaScalarWhereWithAggregatesInput[]
    NOT?: MasukanWargaScalarWhereWithAggregatesInput | MasukanWargaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MasukanWarga"> | string
    judul?: StringWithAggregatesFilter<"MasukanWarga"> | string
    deskripsi?: StringWithAggregatesFilter<"MasukanWarga"> | string
    lokasiRt?: IntWithAggregatesFilter<"MasukanWarga"> | number
    lokasiRw?: IntWithAggregatesFilter<"MasukanWarga"> | number
    domainIsuId?: StringWithAggregatesFilter<"MasukanWarga"> | string
    status?: EnumStatusMasukanWithAggregatesFilter<"MasukanWarga"> | $Enums.StatusMasukan
    diverifikasiOlehId?: StringNullableWithAggregatesFilter<"MasukanWarga"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MasukanWarga"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MasukanWarga"> | Date | string
  }

  export type DataMasterWhereInput = {
    AND?: DataMasterWhereInput | DataMasterWhereInput[]
    OR?: DataMasterWhereInput[]
    NOT?: DataMasterWhereInput | DataMasterWhereInput[]
    id?: StringFilter<"DataMaster"> | string
    domainIsuId?: StringFilter<"DataMaster"> | string
    namaAtribut?: StringFilter<"DataMaster"> | string
    nilai?: StringFilter<"DataMaster"> | string
    jumlah?: IntNullableFilter<"DataMaster"> | number | null
    lokasiRt?: IntNullableFilter<"DataMaster"> | number | null
    lokasiRw?: IntNullableFilter<"DataMaster"> | number | null
    sumberData?: StringNullableFilter<"DataMaster"> | string | null
    createdAt?: DateTimeFilter<"DataMaster"> | Date | string
    updatedAt?: DateTimeFilter<"DataMaster"> | Date | string
    domainIsu?: XOR<DomainIsuScalarRelationFilter, DomainIsuWhereInput>
  }

  export type DataMasterOrderByWithRelationInput = {
    id?: SortOrder
    domainIsuId?: SortOrder
    namaAtribut?: SortOrder
    nilai?: SortOrder
    jumlah?: SortOrderInput | SortOrder
    lokasiRt?: SortOrderInput | SortOrder
    lokasiRw?: SortOrderInput | SortOrder
    sumberData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domainIsu?: DomainIsuOrderByWithRelationInput
  }

  export type DataMasterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    domainIsuId_namaAtribut_lokasiRt_lokasiRw?: DataMasterDomainIsuIdNamaAtributLokasiRtLokasiRwCompoundUniqueInput
    AND?: DataMasterWhereInput | DataMasterWhereInput[]
    OR?: DataMasterWhereInput[]
    NOT?: DataMasterWhereInput | DataMasterWhereInput[]
    domainIsuId?: StringFilter<"DataMaster"> | string
    namaAtribut?: StringFilter<"DataMaster"> | string
    nilai?: StringFilter<"DataMaster"> | string
    jumlah?: IntNullableFilter<"DataMaster"> | number | null
    lokasiRt?: IntNullableFilter<"DataMaster"> | number | null
    lokasiRw?: IntNullableFilter<"DataMaster"> | number | null
    sumberData?: StringNullableFilter<"DataMaster"> | string | null
    createdAt?: DateTimeFilter<"DataMaster"> | Date | string
    updatedAt?: DateTimeFilter<"DataMaster"> | Date | string
    domainIsu?: XOR<DomainIsuScalarRelationFilter, DomainIsuWhereInput>
  }, "id" | "domainIsuId_namaAtribut_lokasiRt_lokasiRw">

  export type DataMasterOrderByWithAggregationInput = {
    id?: SortOrder
    domainIsuId?: SortOrder
    namaAtribut?: SortOrder
    nilai?: SortOrder
    jumlah?: SortOrderInput | SortOrder
    lokasiRt?: SortOrderInput | SortOrder
    lokasiRw?: SortOrderInput | SortOrder
    sumberData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DataMasterCountOrderByAggregateInput
    _avg?: DataMasterAvgOrderByAggregateInput
    _max?: DataMasterMaxOrderByAggregateInput
    _min?: DataMasterMinOrderByAggregateInput
    _sum?: DataMasterSumOrderByAggregateInput
  }

  export type DataMasterScalarWhereWithAggregatesInput = {
    AND?: DataMasterScalarWhereWithAggregatesInput | DataMasterScalarWhereWithAggregatesInput[]
    OR?: DataMasterScalarWhereWithAggregatesInput[]
    NOT?: DataMasterScalarWhereWithAggregatesInput | DataMasterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DataMaster"> | string
    domainIsuId?: StringWithAggregatesFilter<"DataMaster"> | string
    namaAtribut?: StringWithAggregatesFilter<"DataMaster"> | string
    nilai?: StringWithAggregatesFilter<"DataMaster"> | string
    jumlah?: IntNullableWithAggregatesFilter<"DataMaster"> | number | null
    lokasiRt?: IntNullableWithAggregatesFilter<"DataMaster"> | number | null
    lokasiRw?: IntNullableWithAggregatesFilter<"DataMaster"> | number | null
    sumberData?: StringNullableWithAggregatesFilter<"DataMaster"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DataMaster"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DataMaster"> | Date | string
  }

  export type RekomendasiWhereInput = {
    AND?: RekomendasiWhereInput | RekomendasiWhereInput[]
    OR?: RekomendasiWhereInput[]
    NOT?: RekomendasiWhereInput | RekomendasiWhereInput[]
    id?: StringFilter<"Rekomendasi"> | string
    kegiatanRapatId?: StringFilter<"Rekomendasi"> | string
    domainIsuId?: StringFilter<"Rekomendasi"> | string
    judul?: StringFilter<"Rekomendasi"> | string
    ringkasan?: StringFilter<"Rekomendasi"> | string
    deskripsi?: StringFilter<"Rekomendasi"> | string
    skorPrioritas?: FloatFilter<"Rekomendasi"> | number
    status?: EnumStatusRekomendasiFilter<"Rekomendasi"> | $Enums.StatusRekomendasi
    laporanLengkap?: JsonFilter<"Rekomendasi">
    diprosesOlehId?: StringNullableFilter<"Rekomendasi"> | string | null
    createdAt?: DateTimeFilter<"Rekomendasi"> | Date | string
    updatedAt?: DateTimeFilter<"Rekomendasi"> | Date | string
    kegiatanRapat?: XOR<KegiatanRapatScalarRelationFilter, KegiatanRapatWhereInput>
    domainIsu?: XOR<DomainIsuScalarRelationFilter, DomainIsuWhereInput>
    diprosesOleh?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    masukanLinks?: RekomendasiMasukanListRelationFilter
  }

  export type RekomendasiOrderByWithRelationInput = {
    id?: SortOrder
    kegiatanRapatId?: SortOrder
    domainIsuId?: SortOrder
    judul?: SortOrder
    ringkasan?: SortOrder
    deskripsi?: SortOrder
    skorPrioritas?: SortOrder
    status?: SortOrder
    laporanLengkap?: SortOrder
    diprosesOlehId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    kegiatanRapat?: KegiatanRapatOrderByWithRelationInput
    domainIsu?: DomainIsuOrderByWithRelationInput
    diprosesOleh?: UserOrderByWithRelationInput
    masukanLinks?: RekomendasiMasukanOrderByRelationAggregateInput
  }

  export type RekomendasiWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RekomendasiWhereInput | RekomendasiWhereInput[]
    OR?: RekomendasiWhereInput[]
    NOT?: RekomendasiWhereInput | RekomendasiWhereInput[]
    kegiatanRapatId?: StringFilter<"Rekomendasi"> | string
    domainIsuId?: StringFilter<"Rekomendasi"> | string
    judul?: StringFilter<"Rekomendasi"> | string
    ringkasan?: StringFilter<"Rekomendasi"> | string
    deskripsi?: StringFilter<"Rekomendasi"> | string
    skorPrioritas?: FloatFilter<"Rekomendasi"> | number
    status?: EnumStatusRekomendasiFilter<"Rekomendasi"> | $Enums.StatusRekomendasi
    laporanLengkap?: JsonFilter<"Rekomendasi">
    diprosesOlehId?: StringNullableFilter<"Rekomendasi"> | string | null
    createdAt?: DateTimeFilter<"Rekomendasi"> | Date | string
    updatedAt?: DateTimeFilter<"Rekomendasi"> | Date | string
    kegiatanRapat?: XOR<KegiatanRapatScalarRelationFilter, KegiatanRapatWhereInput>
    domainIsu?: XOR<DomainIsuScalarRelationFilter, DomainIsuWhereInput>
    diprosesOleh?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    masukanLinks?: RekomendasiMasukanListRelationFilter
  }, "id">

  export type RekomendasiOrderByWithAggregationInput = {
    id?: SortOrder
    kegiatanRapatId?: SortOrder
    domainIsuId?: SortOrder
    judul?: SortOrder
    ringkasan?: SortOrder
    deskripsi?: SortOrder
    skorPrioritas?: SortOrder
    status?: SortOrder
    laporanLengkap?: SortOrder
    diprosesOlehId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RekomendasiCountOrderByAggregateInput
    _avg?: RekomendasiAvgOrderByAggregateInput
    _max?: RekomendasiMaxOrderByAggregateInput
    _min?: RekomendasiMinOrderByAggregateInput
    _sum?: RekomendasiSumOrderByAggregateInput
  }

  export type RekomendasiScalarWhereWithAggregatesInput = {
    AND?: RekomendasiScalarWhereWithAggregatesInput | RekomendasiScalarWhereWithAggregatesInput[]
    OR?: RekomendasiScalarWhereWithAggregatesInput[]
    NOT?: RekomendasiScalarWhereWithAggregatesInput | RekomendasiScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Rekomendasi"> | string
    kegiatanRapatId?: StringWithAggregatesFilter<"Rekomendasi"> | string
    domainIsuId?: StringWithAggregatesFilter<"Rekomendasi"> | string
    judul?: StringWithAggregatesFilter<"Rekomendasi"> | string
    ringkasan?: StringWithAggregatesFilter<"Rekomendasi"> | string
    deskripsi?: StringWithAggregatesFilter<"Rekomendasi"> | string
    skorPrioritas?: FloatWithAggregatesFilter<"Rekomendasi"> | number
    status?: EnumStatusRekomendasiWithAggregatesFilter<"Rekomendasi"> | $Enums.StatusRekomendasi
    laporanLengkap?: JsonWithAggregatesFilter<"Rekomendasi">
    diprosesOlehId?: StringNullableWithAggregatesFilter<"Rekomendasi"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Rekomendasi"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Rekomendasi"> | Date | string
  }

  export type RekomendasiMasukanWhereInput = {
    AND?: RekomendasiMasukanWhereInput | RekomendasiMasukanWhereInput[]
    OR?: RekomendasiMasukanWhereInput[]
    NOT?: RekomendasiMasukanWhereInput | RekomendasiMasukanWhereInput[]
    rekomendasiId?: StringFilter<"RekomendasiMasukan"> | string
    masukanId?: StringFilter<"RekomendasiMasukan"> | string
    rekomendasi?: XOR<RekomendasiScalarRelationFilter, RekomendasiWhereInput>
    masukan?: XOR<MasukanWargaScalarRelationFilter, MasukanWargaWhereInput>
  }

  export type RekomendasiMasukanOrderByWithRelationInput = {
    rekomendasiId?: SortOrder
    masukanId?: SortOrder
    rekomendasi?: RekomendasiOrderByWithRelationInput
    masukan?: MasukanWargaOrderByWithRelationInput
  }

  export type RekomendasiMasukanWhereUniqueInput = Prisma.AtLeast<{
    rekomendasiId_masukanId?: RekomendasiMasukanRekomendasiIdMasukanIdCompoundUniqueInput
    AND?: RekomendasiMasukanWhereInput | RekomendasiMasukanWhereInput[]
    OR?: RekomendasiMasukanWhereInput[]
    NOT?: RekomendasiMasukanWhereInput | RekomendasiMasukanWhereInput[]
    rekomendasiId?: StringFilter<"RekomendasiMasukan"> | string
    masukanId?: StringFilter<"RekomendasiMasukan"> | string
    rekomendasi?: XOR<RekomendasiScalarRelationFilter, RekomendasiWhereInput>
    masukan?: XOR<MasukanWargaScalarRelationFilter, MasukanWargaWhereInput>
  }, "rekomendasiId_masukanId">

  export type RekomendasiMasukanOrderByWithAggregationInput = {
    rekomendasiId?: SortOrder
    masukanId?: SortOrder
    _count?: RekomendasiMasukanCountOrderByAggregateInput
    _max?: RekomendasiMasukanMaxOrderByAggregateInput
    _min?: RekomendasiMasukanMinOrderByAggregateInput
  }

  export type RekomendasiMasukanScalarWhereWithAggregatesInput = {
    AND?: RekomendasiMasukanScalarWhereWithAggregatesInput | RekomendasiMasukanScalarWhereWithAggregatesInput[]
    OR?: RekomendasiMasukanScalarWhereWithAggregatesInput[]
    NOT?: RekomendasiMasukanScalarWhereWithAggregatesInput | RekomendasiMasukanScalarWhereWithAggregatesInput[]
    rekomendasiId?: StringWithAggregatesFilter<"RekomendasiMasukan"> | string
    masukanId?: StringWithAggregatesFilter<"RekomendasiMasukan"> | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    role?: StringNullableFilter<"Session"> | string | null
    phoneNumber?: StringNullableFilter<"Session"> | string | null
    jabatan?: StringNullableFilter<"Session"> | string | null
    isActive?: BoolNullableFilter<"Session"> | boolean | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    role?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    jabatan?: SortOrderInput | SortOrder
    isActive?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    role?: StringNullableFilter<"Session"> | string | null
    phoneNumber?: StringNullableFilter<"Session"> | string | null
    jabatan?: StringNullableFilter<"Session"> | string | null
    isActive?: BoolNullableFilter<"Session"> | boolean | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    role?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    jabatan?: SortOrderInput | SortOrder
    isActive?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
    role?: StringNullableWithAggregatesFilter<"Session"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"Session"> | string | null
    jabatan?: StringNullableWithAggregatesFilter<"Session"> | string | null
    isActive?: BoolNullableWithAggregatesFilter<"Session"> | boolean | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type KegiatanRapatWhereInput = {
    AND?: KegiatanRapatWhereInput | KegiatanRapatWhereInput[]
    OR?: KegiatanRapatWhereInput[]
    NOT?: KegiatanRapatWhereInput | KegiatanRapatWhereInput[]
    id?: StringFilter<"KegiatanRapat"> | string
    judul?: StringFilter<"KegiatanRapat"> | string
    deskripsi?: StringFilter<"KegiatanRapat"> | string
    tanggal?: DateTimeFilter<"KegiatanRapat"> | Date | string
    lokasi?: StringNullableFilter<"KegiatanRapat"> | string | null
    domainIsuId?: StringNullableFilter<"KegiatanRapat"> | string | null
    dibuatOlehId?: StringFilter<"KegiatanRapat"> | string
    aiModel?: StringNullableFilter<"KegiatanRapat"> | string | null
    aiPromptHash?: StringNullableFilter<"KegiatanRapat"> | string | null
    aiProcessedAt?: DateTimeNullableFilter<"KegiatanRapat"> | Date | string | null
    createdAt?: DateTimeFilter<"KegiatanRapat"> | Date | string
    updatedAt?: DateTimeFilter<"KegiatanRapat"> | Date | string
    domainIsu?: XOR<DomainIsuNullableScalarRelationFilter, DomainIsuWhereInput> | null
    dibuatOleh?: XOR<UserScalarRelationFilter, UserWhereInput>
    rekomendasi?: RekomendasiListRelationFilter
  }

  export type KegiatanRapatOrderByWithRelationInput = {
    id?: SortOrder
    judul?: SortOrder
    deskripsi?: SortOrder
    tanggal?: SortOrder
    lokasi?: SortOrderInput | SortOrder
    domainIsuId?: SortOrderInput | SortOrder
    dibuatOlehId?: SortOrder
    aiModel?: SortOrderInput | SortOrder
    aiPromptHash?: SortOrderInput | SortOrder
    aiProcessedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domainIsu?: DomainIsuOrderByWithRelationInput
    dibuatOleh?: UserOrderByWithRelationInput
    rekomendasi?: RekomendasiOrderByRelationAggregateInput
  }

  export type KegiatanRapatWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: KegiatanRapatWhereInput | KegiatanRapatWhereInput[]
    OR?: KegiatanRapatWhereInput[]
    NOT?: KegiatanRapatWhereInput | KegiatanRapatWhereInput[]
    judul?: StringFilter<"KegiatanRapat"> | string
    deskripsi?: StringFilter<"KegiatanRapat"> | string
    tanggal?: DateTimeFilter<"KegiatanRapat"> | Date | string
    lokasi?: StringNullableFilter<"KegiatanRapat"> | string | null
    domainIsuId?: StringNullableFilter<"KegiatanRapat"> | string | null
    dibuatOlehId?: StringFilter<"KegiatanRapat"> | string
    aiModel?: StringNullableFilter<"KegiatanRapat"> | string | null
    aiPromptHash?: StringNullableFilter<"KegiatanRapat"> | string | null
    aiProcessedAt?: DateTimeNullableFilter<"KegiatanRapat"> | Date | string | null
    createdAt?: DateTimeFilter<"KegiatanRapat"> | Date | string
    updatedAt?: DateTimeFilter<"KegiatanRapat"> | Date | string
    domainIsu?: XOR<DomainIsuNullableScalarRelationFilter, DomainIsuWhereInput> | null
    dibuatOleh?: XOR<UserScalarRelationFilter, UserWhereInput>
    rekomendasi?: RekomendasiListRelationFilter
  }, "id">

  export type KegiatanRapatOrderByWithAggregationInput = {
    id?: SortOrder
    judul?: SortOrder
    deskripsi?: SortOrder
    tanggal?: SortOrder
    lokasi?: SortOrderInput | SortOrder
    domainIsuId?: SortOrderInput | SortOrder
    dibuatOlehId?: SortOrder
    aiModel?: SortOrderInput | SortOrder
    aiPromptHash?: SortOrderInput | SortOrder
    aiProcessedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: KegiatanRapatCountOrderByAggregateInput
    _max?: KegiatanRapatMaxOrderByAggregateInput
    _min?: KegiatanRapatMinOrderByAggregateInput
  }

  export type KegiatanRapatScalarWhereWithAggregatesInput = {
    AND?: KegiatanRapatScalarWhereWithAggregatesInput | KegiatanRapatScalarWhereWithAggregatesInput[]
    OR?: KegiatanRapatScalarWhereWithAggregatesInput[]
    NOT?: KegiatanRapatScalarWhereWithAggregatesInput | KegiatanRapatScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KegiatanRapat"> | string
    judul?: StringWithAggregatesFilter<"KegiatanRapat"> | string
    deskripsi?: StringWithAggregatesFilter<"KegiatanRapat"> | string
    tanggal?: DateTimeWithAggregatesFilter<"KegiatanRapat"> | Date | string
    lokasi?: StringNullableWithAggregatesFilter<"KegiatanRapat"> | string | null
    domainIsuId?: StringNullableWithAggregatesFilter<"KegiatanRapat"> | string | null
    dibuatOlehId?: StringWithAggregatesFilter<"KegiatanRapat"> | string
    aiModel?: StringNullableWithAggregatesFilter<"KegiatanRapat"> | string | null
    aiPromptHash?: StringNullableWithAggregatesFilter<"KegiatanRapat"> | string | null
    aiProcessedAt?: DateTimeNullableWithAggregatesFilter<"KegiatanRapat"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"KegiatanRapat"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"KegiatanRapat"> | Date | string
  }

  export type DomainIsuCreateInput = {
    id?: string
    code: string
    nama: string
    deskripsi?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    masukan?: MasukanWargaCreateNestedManyWithoutDomainIsuInput
    dataMaster?: DataMasterCreateNestedManyWithoutDomainIsuInput
    rekomendasi?: RekomendasiCreateNestedManyWithoutDomainIsuInput
    kegiatanRapat?: KegiatanRapatCreateNestedManyWithoutDomainIsuInput
  }

  export type DomainIsuUncheckedCreateInput = {
    id?: string
    code: string
    nama: string
    deskripsi?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    masukan?: MasukanWargaUncheckedCreateNestedManyWithoutDomainIsuInput
    dataMaster?: DataMasterUncheckedCreateNestedManyWithoutDomainIsuInput
    rekomendasi?: RekomendasiUncheckedCreateNestedManyWithoutDomainIsuInput
    kegiatanRapat?: KegiatanRapatUncheckedCreateNestedManyWithoutDomainIsuInput
  }

  export type DomainIsuUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukan?: MasukanWargaUpdateManyWithoutDomainIsuNestedInput
    dataMaster?: DataMasterUpdateManyWithoutDomainIsuNestedInput
    rekomendasi?: RekomendasiUpdateManyWithoutDomainIsuNestedInput
    kegiatanRapat?: KegiatanRapatUpdateManyWithoutDomainIsuNestedInput
  }

  export type DomainIsuUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukan?: MasukanWargaUncheckedUpdateManyWithoutDomainIsuNestedInput
    dataMaster?: DataMasterUncheckedUpdateManyWithoutDomainIsuNestedInput
    rekomendasi?: RekomendasiUncheckedUpdateManyWithoutDomainIsuNestedInput
    kegiatanRapat?: KegiatanRapatUncheckedUpdateManyWithoutDomainIsuNestedInput
  }

  export type DomainIsuCreateManyInput = {
    id?: string
    code: string
    nama: string
    deskripsi?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DomainIsuUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainIsuUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
    masukanVerifikasi?: MasukanWargaCreateNestedManyWithoutDiverifikasiOlehInput
    rekomendasiDiproses?: RekomendasiCreateNestedManyWithoutDiprosesOlehInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    kegiatanRapat?: KegiatanRapatCreateNestedManyWithoutDibuatOlehInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
    masukanVerifikasi?: MasukanWargaUncheckedCreateNestedManyWithoutDiverifikasiOlehInput
    rekomendasiDiproses?: RekomendasiUncheckedCreateNestedManyWithoutDiprosesOlehInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    kegiatanRapat?: KegiatanRapatUncheckedCreateNestedManyWithoutDibuatOlehInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    masukanVerifikasi?: MasukanWargaUpdateManyWithoutDiverifikasiOlehNestedInput
    rekomendasiDiproses?: RekomendasiUpdateManyWithoutDiprosesOlehNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    kegiatanRapat?: KegiatanRapatUpdateManyWithoutDibuatOlehNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    masukanVerifikasi?: MasukanWargaUncheckedUpdateManyWithoutDiverifikasiOlehNestedInput
    rekomendasiDiproses?: RekomendasiUncheckedUpdateManyWithoutDiprosesOlehNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    kegiatanRapat?: KegiatanRapatUncheckedUpdateManyWithoutDibuatOlehNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MasukanWargaCreateInput = {
    id?: string
    judul: string
    deskripsi: string
    lokasiRt: number
    lokasiRw: number
    status?: $Enums.StatusMasukan
    createdAt?: Date | string
    updatedAt?: Date | string
    domainIsu: DomainIsuCreateNestedOneWithoutMasukanInput
    diverifikasiOleh?: UserCreateNestedOneWithoutMasukanVerifikasiInput
    rekomendasiLinks?: RekomendasiMasukanCreateNestedManyWithoutMasukanInput
  }

  export type MasukanWargaUncheckedCreateInput = {
    id?: string
    judul: string
    deskripsi: string
    lokasiRt: number
    lokasiRw: number
    domainIsuId: string
    status?: $Enums.StatusMasukan
    diverifikasiOlehId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rekomendasiLinks?: RekomendasiMasukanUncheckedCreateNestedManyWithoutMasukanInput
  }

  export type MasukanWargaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    lokasiRt?: IntFieldUpdateOperationsInput | number
    lokasiRw?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusMasukanFieldUpdateOperationsInput | $Enums.StatusMasukan
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainIsu?: DomainIsuUpdateOneRequiredWithoutMasukanNestedInput
    diverifikasiOleh?: UserUpdateOneWithoutMasukanVerifikasiNestedInput
    rekomendasiLinks?: RekomendasiMasukanUpdateManyWithoutMasukanNestedInput
  }

  export type MasukanWargaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    lokasiRt?: IntFieldUpdateOperationsInput | number
    lokasiRw?: IntFieldUpdateOperationsInput | number
    domainIsuId?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusMasukanFieldUpdateOperationsInput | $Enums.StatusMasukan
    diverifikasiOlehId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rekomendasiLinks?: RekomendasiMasukanUncheckedUpdateManyWithoutMasukanNestedInput
  }

  export type MasukanWargaCreateManyInput = {
    id?: string
    judul: string
    deskripsi: string
    lokasiRt: number
    lokasiRw: number
    domainIsuId: string
    status?: $Enums.StatusMasukan
    diverifikasiOlehId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MasukanWargaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    lokasiRt?: IntFieldUpdateOperationsInput | number
    lokasiRw?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusMasukanFieldUpdateOperationsInput | $Enums.StatusMasukan
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasukanWargaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    lokasiRt?: IntFieldUpdateOperationsInput | number
    lokasiRw?: IntFieldUpdateOperationsInput | number
    domainIsuId?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusMasukanFieldUpdateOperationsInput | $Enums.StatusMasukan
    diverifikasiOlehId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataMasterCreateInput = {
    id?: string
    namaAtribut: string
    nilai: string
    jumlah?: number | null
    lokasiRt?: number | null
    lokasiRw?: number | null
    sumberData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domainIsu: DomainIsuCreateNestedOneWithoutDataMasterInput
  }

  export type DataMasterUncheckedCreateInput = {
    id?: string
    domainIsuId: string
    namaAtribut: string
    nilai: string
    jumlah?: number | null
    lokasiRt?: number | null
    lokasiRw?: number | null
    sumberData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DataMasterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRt?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRw?: NullableIntFieldUpdateOperationsInput | number | null
    sumberData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainIsu?: DomainIsuUpdateOneRequiredWithoutDataMasterNestedInput
  }

  export type DataMasterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    domainIsuId?: StringFieldUpdateOperationsInput | string
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRt?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRw?: NullableIntFieldUpdateOperationsInput | number | null
    sumberData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataMasterCreateManyInput = {
    id?: string
    domainIsuId: string
    namaAtribut: string
    nilai: string
    jumlah?: number | null
    lokasiRt?: number | null
    lokasiRw?: number | null
    sumberData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DataMasterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRt?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRw?: NullableIntFieldUpdateOperationsInput | number | null
    sumberData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataMasterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    domainIsuId?: StringFieldUpdateOperationsInput | string
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRt?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRw?: NullableIntFieldUpdateOperationsInput | number | null
    sumberData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RekomendasiCreateInput = {
    id?: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    kegiatanRapat: KegiatanRapatCreateNestedOneWithoutRekomendasiInput
    domainIsu: DomainIsuCreateNestedOneWithoutRekomendasiInput
    diprosesOleh?: UserCreateNestedOneWithoutRekomendasiDiprosesInput
    masukanLinks?: RekomendasiMasukanCreateNestedManyWithoutRekomendasiInput
  }

  export type RekomendasiUncheckedCreateInput = {
    id?: string
    kegiatanRapatId: string
    domainIsuId: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    masukanLinks?: RekomendasiMasukanUncheckedCreateNestedManyWithoutRekomendasiInput
  }

  export type RekomendasiUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kegiatanRapat?: KegiatanRapatUpdateOneRequiredWithoutRekomendasiNestedInput
    domainIsu?: DomainIsuUpdateOneRequiredWithoutRekomendasiNestedInput
    diprosesOleh?: UserUpdateOneWithoutRekomendasiDiprosesNestedInput
    masukanLinks?: RekomendasiMasukanUpdateManyWithoutRekomendasiNestedInput
  }

  export type RekomendasiUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kegiatanRapatId?: StringFieldUpdateOperationsInput | string
    domainIsuId?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukanLinks?: RekomendasiMasukanUncheckedUpdateManyWithoutRekomendasiNestedInput
  }

  export type RekomendasiCreateManyInput = {
    id?: string
    kegiatanRapatId: string
    domainIsuId: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RekomendasiUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RekomendasiUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kegiatanRapatId?: StringFieldUpdateOperationsInput | string
    domainIsuId?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RekomendasiMasukanCreateInput = {
    rekomendasi: RekomendasiCreateNestedOneWithoutMasukanLinksInput
    masukan: MasukanWargaCreateNestedOneWithoutRekomendasiLinksInput
  }

  export type RekomendasiMasukanUncheckedCreateInput = {
    rekomendasiId: string
    masukanId: string
  }

  export type RekomendasiMasukanUpdateInput = {
    rekomendasi?: RekomendasiUpdateOneRequiredWithoutMasukanLinksNestedInput
    masukan?: MasukanWargaUpdateOneRequiredWithoutRekomendasiLinksNestedInput
  }

  export type RekomendasiMasukanUncheckedUpdateInput = {
    rekomendasiId?: StringFieldUpdateOperationsInput | string
    masukanId?: StringFieldUpdateOperationsInput | string
  }

  export type RekomendasiMasukanCreateManyInput = {
    rekomendasiId: string
    masukanId: string
  }

  export type RekomendasiMasukanUpdateManyMutationInput = {

  }

  export type RekomendasiMasukanUncheckedUpdateManyInput = {
    rekomendasiId?: StringFieldUpdateOperationsInput | string
    masukanId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    role?: string | null
    phoneNumber?: string | null
    jabatan?: string | null
    isActive?: boolean | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
    role?: string | null
    phoneNumber?: string | null
    jabatan?: string | null
    isActive?: boolean | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type SessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
    role?: string | null
    phoneNumber?: string | null
    jabatan?: string | null
    isActive?: boolean | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KegiatanRapatCreateInput = {
    id?: string
    judul: string
    deskripsi: string
    tanggal: Date | string
    lokasi?: string | null
    aiModel?: string | null
    aiPromptHash?: string | null
    aiProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domainIsu?: DomainIsuCreateNestedOneWithoutKegiatanRapatInput
    dibuatOleh: UserCreateNestedOneWithoutKegiatanRapatInput
    rekomendasi?: RekomendasiCreateNestedManyWithoutKegiatanRapatInput
  }

  export type KegiatanRapatUncheckedCreateInput = {
    id?: string
    judul: string
    deskripsi: string
    tanggal: Date | string
    lokasi?: string | null
    domainIsuId?: string | null
    dibuatOlehId: string
    aiModel?: string | null
    aiPromptHash?: string | null
    aiProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rekomendasi?: RekomendasiUncheckedCreateNestedManyWithoutKegiatanRapatInput
  }

  export type KegiatanRapatUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptHash?: NullableStringFieldUpdateOperationsInput | string | null
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainIsu?: DomainIsuUpdateOneWithoutKegiatanRapatNestedInput
    dibuatOleh?: UserUpdateOneRequiredWithoutKegiatanRapatNestedInput
    rekomendasi?: RekomendasiUpdateManyWithoutKegiatanRapatNestedInput
  }

  export type KegiatanRapatUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    domainIsuId?: NullableStringFieldUpdateOperationsInput | string | null
    dibuatOlehId?: StringFieldUpdateOperationsInput | string
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptHash?: NullableStringFieldUpdateOperationsInput | string | null
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rekomendasi?: RekomendasiUncheckedUpdateManyWithoutKegiatanRapatNestedInput
  }

  export type KegiatanRapatCreateManyInput = {
    id?: string
    judul: string
    deskripsi: string
    tanggal: Date | string
    lokasi?: string | null
    domainIsuId?: string | null
    dibuatOlehId: string
    aiModel?: string | null
    aiPromptHash?: string | null
    aiProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KegiatanRapatUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptHash?: NullableStringFieldUpdateOperationsInput | string | null
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KegiatanRapatUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    domainIsuId?: NullableStringFieldUpdateOperationsInput | string | null
    dibuatOlehId?: StringFieldUpdateOperationsInput | string
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptHash?: NullableStringFieldUpdateOperationsInput | string | null
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type MasukanWargaListRelationFilter = {
    every?: MasukanWargaWhereInput
    some?: MasukanWargaWhereInput
    none?: MasukanWargaWhereInput
  }

  export type DataMasterListRelationFilter = {
    every?: DataMasterWhereInput
    some?: DataMasterWhereInput
    none?: DataMasterWhereInput
  }

  export type RekomendasiListRelationFilter = {
    every?: RekomendasiWhereInput
    some?: RekomendasiWhereInput
    none?: RekomendasiWhereInput
  }

  export type KegiatanRapatListRelationFilter = {
    every?: KegiatanRapatWhereInput
    some?: KegiatanRapatWhereInput
    none?: KegiatanRapatWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MasukanWargaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DataMasterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RekomendasiOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KegiatanRapatOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DomainIsuCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    nama?: SortOrder
    deskripsi?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainIsuMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    nama?: SortOrder
    deskripsi?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainIsuMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    nama?: SortOrder
    deskripsi?: SortOrder
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    jabatan?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    phoneNumber?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    jabatan?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    phoneNumber?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    jabatan?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    phoneNumber?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumStatusMasukanFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusMasukan | EnumStatusMasukanFieldRefInput<$PrismaModel>
    in?: $Enums.StatusMasukan[] | ListEnumStatusMasukanFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusMasukan[] | ListEnumStatusMasukanFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusMasukanFilter<$PrismaModel> | $Enums.StatusMasukan
  }

  export type DomainIsuScalarRelationFilter = {
    is?: DomainIsuWhereInput
    isNot?: DomainIsuWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type RekomendasiMasukanListRelationFilter = {
    every?: RekomendasiMasukanWhereInput
    some?: RekomendasiMasukanWhereInput
    none?: RekomendasiMasukanWhereInput
  }

  export type RekomendasiMasukanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MasukanWargaCountOrderByAggregateInput = {
    id?: SortOrder
    judul?: SortOrder
    deskripsi?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    domainIsuId?: SortOrder
    status?: SortOrder
    diverifikasiOlehId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MasukanWargaAvgOrderByAggregateInput = {
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
  }

  export type MasukanWargaMaxOrderByAggregateInput = {
    id?: SortOrder
    judul?: SortOrder
    deskripsi?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    domainIsuId?: SortOrder
    status?: SortOrder
    diverifikasiOlehId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MasukanWargaMinOrderByAggregateInput = {
    id?: SortOrder
    judul?: SortOrder
    deskripsi?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    domainIsuId?: SortOrder
    status?: SortOrder
    diverifikasiOlehId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MasukanWargaSumOrderByAggregateInput = {
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
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

  export type EnumStatusMasukanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusMasukan | EnumStatusMasukanFieldRefInput<$PrismaModel>
    in?: $Enums.StatusMasukan[] | ListEnumStatusMasukanFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusMasukan[] | ListEnumStatusMasukanFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusMasukanWithAggregatesFilter<$PrismaModel> | $Enums.StatusMasukan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusMasukanFilter<$PrismaModel>
    _max?: NestedEnumStatusMasukanFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DataMasterDomainIsuIdNamaAtributLokasiRtLokasiRwCompoundUniqueInput = {
    domainIsuId: string
    namaAtribut: string
    lokasiRt: number
    lokasiRw: number
  }

  export type DataMasterCountOrderByAggregateInput = {
    id?: SortOrder
    domainIsuId?: SortOrder
    namaAtribut?: SortOrder
    nilai?: SortOrder
    jumlah?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    sumberData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataMasterAvgOrderByAggregateInput = {
    jumlah?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
  }

  export type DataMasterMaxOrderByAggregateInput = {
    id?: SortOrder
    domainIsuId?: SortOrder
    namaAtribut?: SortOrder
    nilai?: SortOrder
    jumlah?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    sumberData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataMasterMinOrderByAggregateInput = {
    id?: SortOrder
    domainIsuId?: SortOrder
    namaAtribut?: SortOrder
    nilai?: SortOrder
    jumlah?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    sumberData?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataMasterSumOrderByAggregateInput = {
    jumlah?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumStatusRekomendasiFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusRekomendasi | EnumStatusRekomendasiFieldRefInput<$PrismaModel>
    in?: $Enums.StatusRekomendasi[] | ListEnumStatusRekomendasiFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusRekomendasi[] | ListEnumStatusRekomendasiFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusRekomendasiFilter<$PrismaModel> | $Enums.StatusRekomendasi
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
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type KegiatanRapatScalarRelationFilter = {
    is?: KegiatanRapatWhereInput
    isNot?: KegiatanRapatWhereInput
  }

  export type RekomendasiCountOrderByAggregateInput = {
    id?: SortOrder
    kegiatanRapatId?: SortOrder
    domainIsuId?: SortOrder
    judul?: SortOrder
    ringkasan?: SortOrder
    deskripsi?: SortOrder
    skorPrioritas?: SortOrder
    status?: SortOrder
    laporanLengkap?: SortOrder
    diprosesOlehId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RekomendasiAvgOrderByAggregateInput = {
    skorPrioritas?: SortOrder
  }

  export type RekomendasiMaxOrderByAggregateInput = {
    id?: SortOrder
    kegiatanRapatId?: SortOrder
    domainIsuId?: SortOrder
    judul?: SortOrder
    ringkasan?: SortOrder
    deskripsi?: SortOrder
    skorPrioritas?: SortOrder
    status?: SortOrder
    diprosesOlehId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RekomendasiMinOrderByAggregateInput = {
    id?: SortOrder
    kegiatanRapatId?: SortOrder
    domainIsuId?: SortOrder
    judul?: SortOrder
    ringkasan?: SortOrder
    deskripsi?: SortOrder
    skorPrioritas?: SortOrder
    status?: SortOrder
    diprosesOlehId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RekomendasiSumOrderByAggregateInput = {
    skorPrioritas?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumStatusRekomendasiWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusRekomendasi | EnumStatusRekomendasiFieldRefInput<$PrismaModel>
    in?: $Enums.StatusRekomendasi[] | ListEnumStatusRekomendasiFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusRekomendasi[] | ListEnumStatusRekomendasiFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusRekomendasiWithAggregatesFilter<$PrismaModel> | $Enums.StatusRekomendasi
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusRekomendasiFilter<$PrismaModel>
    _max?: NestedEnumStatusRekomendasiFilter<$PrismaModel>
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
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type RekomendasiScalarRelationFilter = {
    is?: RekomendasiWhereInput
    isNot?: RekomendasiWhereInput
  }

  export type MasukanWargaScalarRelationFilter = {
    is?: MasukanWargaWhereInput
    isNot?: MasukanWargaWhereInput
  }

  export type RekomendasiMasukanRekomendasiIdMasukanIdCompoundUniqueInput = {
    rekomendasiId: string
    masukanId: string
  }

  export type RekomendasiMasukanCountOrderByAggregateInput = {
    rekomendasiId?: SortOrder
    masukanId?: SortOrder
  }

  export type RekomendasiMasukanMaxOrderByAggregateInput = {
    rekomendasiId?: SortOrder
    masukanId?: SortOrder
  }

  export type RekomendasiMasukanMinOrderByAggregateInput = {
    rekomendasiId?: SortOrder
    masukanId?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    phoneNumber?: SortOrder
    jabatan?: SortOrder
    isActive?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    phoneNumber?: SortOrder
    jabatan?: SortOrder
    isActive?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    phoneNumber?: SortOrder
    jabatan?: SortOrder
    isActive?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainIsuNullableScalarRelationFilter = {
    is?: DomainIsuWhereInput | null
    isNot?: DomainIsuWhereInput | null
  }

  export type KegiatanRapatCountOrderByAggregateInput = {
    id?: SortOrder
    judul?: SortOrder
    deskripsi?: SortOrder
    tanggal?: SortOrder
    lokasi?: SortOrder
    domainIsuId?: SortOrder
    dibuatOlehId?: SortOrder
    aiModel?: SortOrder
    aiPromptHash?: SortOrder
    aiProcessedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KegiatanRapatMaxOrderByAggregateInput = {
    id?: SortOrder
    judul?: SortOrder
    deskripsi?: SortOrder
    tanggal?: SortOrder
    lokasi?: SortOrder
    domainIsuId?: SortOrder
    dibuatOlehId?: SortOrder
    aiModel?: SortOrder
    aiPromptHash?: SortOrder
    aiProcessedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KegiatanRapatMinOrderByAggregateInput = {
    id?: SortOrder
    judul?: SortOrder
    deskripsi?: SortOrder
    tanggal?: SortOrder
    lokasi?: SortOrder
    domainIsuId?: SortOrder
    dibuatOlehId?: SortOrder
    aiModel?: SortOrder
    aiPromptHash?: SortOrder
    aiProcessedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MasukanWargaCreateNestedManyWithoutDomainIsuInput = {
    create?: XOR<MasukanWargaCreateWithoutDomainIsuInput, MasukanWargaUncheckedCreateWithoutDomainIsuInput> | MasukanWargaCreateWithoutDomainIsuInput[] | MasukanWargaUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutDomainIsuInput | MasukanWargaCreateOrConnectWithoutDomainIsuInput[]
    createMany?: MasukanWargaCreateManyDomainIsuInputEnvelope
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
  }

  export type DataMasterCreateNestedManyWithoutDomainIsuInput = {
    create?: XOR<DataMasterCreateWithoutDomainIsuInput, DataMasterUncheckedCreateWithoutDomainIsuInput> | DataMasterCreateWithoutDomainIsuInput[] | DataMasterUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: DataMasterCreateOrConnectWithoutDomainIsuInput | DataMasterCreateOrConnectWithoutDomainIsuInput[]
    createMany?: DataMasterCreateManyDomainIsuInputEnvelope
    connect?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
  }

  export type RekomendasiCreateNestedManyWithoutDomainIsuInput = {
    create?: XOR<RekomendasiCreateWithoutDomainIsuInput, RekomendasiUncheckedCreateWithoutDomainIsuInput> | RekomendasiCreateWithoutDomainIsuInput[] | RekomendasiUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutDomainIsuInput | RekomendasiCreateOrConnectWithoutDomainIsuInput[]
    createMany?: RekomendasiCreateManyDomainIsuInputEnvelope
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
  }

  export type KegiatanRapatCreateNestedManyWithoutDomainIsuInput = {
    create?: XOR<KegiatanRapatCreateWithoutDomainIsuInput, KegiatanRapatUncheckedCreateWithoutDomainIsuInput> | KegiatanRapatCreateWithoutDomainIsuInput[] | KegiatanRapatUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: KegiatanRapatCreateOrConnectWithoutDomainIsuInput | KegiatanRapatCreateOrConnectWithoutDomainIsuInput[]
    createMany?: KegiatanRapatCreateManyDomainIsuInputEnvelope
    connect?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
  }

  export type MasukanWargaUncheckedCreateNestedManyWithoutDomainIsuInput = {
    create?: XOR<MasukanWargaCreateWithoutDomainIsuInput, MasukanWargaUncheckedCreateWithoutDomainIsuInput> | MasukanWargaCreateWithoutDomainIsuInput[] | MasukanWargaUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutDomainIsuInput | MasukanWargaCreateOrConnectWithoutDomainIsuInput[]
    createMany?: MasukanWargaCreateManyDomainIsuInputEnvelope
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
  }

  export type DataMasterUncheckedCreateNestedManyWithoutDomainIsuInput = {
    create?: XOR<DataMasterCreateWithoutDomainIsuInput, DataMasterUncheckedCreateWithoutDomainIsuInput> | DataMasterCreateWithoutDomainIsuInput[] | DataMasterUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: DataMasterCreateOrConnectWithoutDomainIsuInput | DataMasterCreateOrConnectWithoutDomainIsuInput[]
    createMany?: DataMasterCreateManyDomainIsuInputEnvelope
    connect?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
  }

  export type RekomendasiUncheckedCreateNestedManyWithoutDomainIsuInput = {
    create?: XOR<RekomendasiCreateWithoutDomainIsuInput, RekomendasiUncheckedCreateWithoutDomainIsuInput> | RekomendasiCreateWithoutDomainIsuInput[] | RekomendasiUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutDomainIsuInput | RekomendasiCreateOrConnectWithoutDomainIsuInput[]
    createMany?: RekomendasiCreateManyDomainIsuInputEnvelope
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
  }

  export type KegiatanRapatUncheckedCreateNestedManyWithoutDomainIsuInput = {
    create?: XOR<KegiatanRapatCreateWithoutDomainIsuInput, KegiatanRapatUncheckedCreateWithoutDomainIsuInput> | KegiatanRapatCreateWithoutDomainIsuInput[] | KegiatanRapatUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: KegiatanRapatCreateOrConnectWithoutDomainIsuInput | KegiatanRapatCreateOrConnectWithoutDomainIsuInput[]
    createMany?: KegiatanRapatCreateManyDomainIsuInputEnvelope
    connect?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
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

  export type MasukanWargaUpdateManyWithoutDomainIsuNestedInput = {
    create?: XOR<MasukanWargaCreateWithoutDomainIsuInput, MasukanWargaUncheckedCreateWithoutDomainIsuInput> | MasukanWargaCreateWithoutDomainIsuInput[] | MasukanWargaUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutDomainIsuInput | MasukanWargaCreateOrConnectWithoutDomainIsuInput[]
    upsert?: MasukanWargaUpsertWithWhereUniqueWithoutDomainIsuInput | MasukanWargaUpsertWithWhereUniqueWithoutDomainIsuInput[]
    createMany?: MasukanWargaCreateManyDomainIsuInputEnvelope
    set?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    disconnect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    delete?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    update?: MasukanWargaUpdateWithWhereUniqueWithoutDomainIsuInput | MasukanWargaUpdateWithWhereUniqueWithoutDomainIsuInput[]
    updateMany?: MasukanWargaUpdateManyWithWhereWithoutDomainIsuInput | MasukanWargaUpdateManyWithWhereWithoutDomainIsuInput[]
    deleteMany?: MasukanWargaScalarWhereInput | MasukanWargaScalarWhereInput[]
  }

  export type DataMasterUpdateManyWithoutDomainIsuNestedInput = {
    create?: XOR<DataMasterCreateWithoutDomainIsuInput, DataMasterUncheckedCreateWithoutDomainIsuInput> | DataMasterCreateWithoutDomainIsuInput[] | DataMasterUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: DataMasterCreateOrConnectWithoutDomainIsuInput | DataMasterCreateOrConnectWithoutDomainIsuInput[]
    upsert?: DataMasterUpsertWithWhereUniqueWithoutDomainIsuInput | DataMasterUpsertWithWhereUniqueWithoutDomainIsuInput[]
    createMany?: DataMasterCreateManyDomainIsuInputEnvelope
    set?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    disconnect?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    delete?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    connect?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    update?: DataMasterUpdateWithWhereUniqueWithoutDomainIsuInput | DataMasterUpdateWithWhereUniqueWithoutDomainIsuInput[]
    updateMany?: DataMasterUpdateManyWithWhereWithoutDomainIsuInput | DataMasterUpdateManyWithWhereWithoutDomainIsuInput[]
    deleteMany?: DataMasterScalarWhereInput | DataMasterScalarWhereInput[]
  }

  export type RekomendasiUpdateManyWithoutDomainIsuNestedInput = {
    create?: XOR<RekomendasiCreateWithoutDomainIsuInput, RekomendasiUncheckedCreateWithoutDomainIsuInput> | RekomendasiCreateWithoutDomainIsuInput[] | RekomendasiUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutDomainIsuInput | RekomendasiCreateOrConnectWithoutDomainIsuInput[]
    upsert?: RekomendasiUpsertWithWhereUniqueWithoutDomainIsuInput | RekomendasiUpsertWithWhereUniqueWithoutDomainIsuInput[]
    createMany?: RekomendasiCreateManyDomainIsuInputEnvelope
    set?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    disconnect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    delete?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    update?: RekomendasiUpdateWithWhereUniqueWithoutDomainIsuInput | RekomendasiUpdateWithWhereUniqueWithoutDomainIsuInput[]
    updateMany?: RekomendasiUpdateManyWithWhereWithoutDomainIsuInput | RekomendasiUpdateManyWithWhereWithoutDomainIsuInput[]
    deleteMany?: RekomendasiScalarWhereInput | RekomendasiScalarWhereInput[]
  }

  export type KegiatanRapatUpdateManyWithoutDomainIsuNestedInput = {
    create?: XOR<KegiatanRapatCreateWithoutDomainIsuInput, KegiatanRapatUncheckedCreateWithoutDomainIsuInput> | KegiatanRapatCreateWithoutDomainIsuInput[] | KegiatanRapatUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: KegiatanRapatCreateOrConnectWithoutDomainIsuInput | KegiatanRapatCreateOrConnectWithoutDomainIsuInput[]
    upsert?: KegiatanRapatUpsertWithWhereUniqueWithoutDomainIsuInput | KegiatanRapatUpsertWithWhereUniqueWithoutDomainIsuInput[]
    createMany?: KegiatanRapatCreateManyDomainIsuInputEnvelope
    set?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    disconnect?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    delete?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    connect?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    update?: KegiatanRapatUpdateWithWhereUniqueWithoutDomainIsuInput | KegiatanRapatUpdateWithWhereUniqueWithoutDomainIsuInput[]
    updateMany?: KegiatanRapatUpdateManyWithWhereWithoutDomainIsuInput | KegiatanRapatUpdateManyWithWhereWithoutDomainIsuInput[]
    deleteMany?: KegiatanRapatScalarWhereInput | KegiatanRapatScalarWhereInput[]
  }

  export type MasukanWargaUncheckedUpdateManyWithoutDomainIsuNestedInput = {
    create?: XOR<MasukanWargaCreateWithoutDomainIsuInput, MasukanWargaUncheckedCreateWithoutDomainIsuInput> | MasukanWargaCreateWithoutDomainIsuInput[] | MasukanWargaUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutDomainIsuInput | MasukanWargaCreateOrConnectWithoutDomainIsuInput[]
    upsert?: MasukanWargaUpsertWithWhereUniqueWithoutDomainIsuInput | MasukanWargaUpsertWithWhereUniqueWithoutDomainIsuInput[]
    createMany?: MasukanWargaCreateManyDomainIsuInputEnvelope
    set?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    disconnect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    delete?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    update?: MasukanWargaUpdateWithWhereUniqueWithoutDomainIsuInput | MasukanWargaUpdateWithWhereUniqueWithoutDomainIsuInput[]
    updateMany?: MasukanWargaUpdateManyWithWhereWithoutDomainIsuInput | MasukanWargaUpdateManyWithWhereWithoutDomainIsuInput[]
    deleteMany?: MasukanWargaScalarWhereInput | MasukanWargaScalarWhereInput[]
  }

  export type DataMasterUncheckedUpdateManyWithoutDomainIsuNestedInput = {
    create?: XOR<DataMasterCreateWithoutDomainIsuInput, DataMasterUncheckedCreateWithoutDomainIsuInput> | DataMasterCreateWithoutDomainIsuInput[] | DataMasterUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: DataMasterCreateOrConnectWithoutDomainIsuInput | DataMasterCreateOrConnectWithoutDomainIsuInput[]
    upsert?: DataMasterUpsertWithWhereUniqueWithoutDomainIsuInput | DataMasterUpsertWithWhereUniqueWithoutDomainIsuInput[]
    createMany?: DataMasterCreateManyDomainIsuInputEnvelope
    set?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    disconnect?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    delete?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    connect?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    update?: DataMasterUpdateWithWhereUniqueWithoutDomainIsuInput | DataMasterUpdateWithWhereUniqueWithoutDomainIsuInput[]
    updateMany?: DataMasterUpdateManyWithWhereWithoutDomainIsuInput | DataMasterUpdateManyWithWhereWithoutDomainIsuInput[]
    deleteMany?: DataMasterScalarWhereInput | DataMasterScalarWhereInput[]
  }

  export type RekomendasiUncheckedUpdateManyWithoutDomainIsuNestedInput = {
    create?: XOR<RekomendasiCreateWithoutDomainIsuInput, RekomendasiUncheckedCreateWithoutDomainIsuInput> | RekomendasiCreateWithoutDomainIsuInput[] | RekomendasiUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutDomainIsuInput | RekomendasiCreateOrConnectWithoutDomainIsuInput[]
    upsert?: RekomendasiUpsertWithWhereUniqueWithoutDomainIsuInput | RekomendasiUpsertWithWhereUniqueWithoutDomainIsuInput[]
    createMany?: RekomendasiCreateManyDomainIsuInputEnvelope
    set?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    disconnect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    delete?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    update?: RekomendasiUpdateWithWhereUniqueWithoutDomainIsuInput | RekomendasiUpdateWithWhereUniqueWithoutDomainIsuInput[]
    updateMany?: RekomendasiUpdateManyWithWhereWithoutDomainIsuInput | RekomendasiUpdateManyWithWhereWithoutDomainIsuInput[]
    deleteMany?: RekomendasiScalarWhereInput | RekomendasiScalarWhereInput[]
  }

  export type KegiatanRapatUncheckedUpdateManyWithoutDomainIsuNestedInput = {
    create?: XOR<KegiatanRapatCreateWithoutDomainIsuInput, KegiatanRapatUncheckedCreateWithoutDomainIsuInput> | KegiatanRapatCreateWithoutDomainIsuInput[] | KegiatanRapatUncheckedCreateWithoutDomainIsuInput[]
    connectOrCreate?: KegiatanRapatCreateOrConnectWithoutDomainIsuInput | KegiatanRapatCreateOrConnectWithoutDomainIsuInput[]
    upsert?: KegiatanRapatUpsertWithWhereUniqueWithoutDomainIsuInput | KegiatanRapatUpsertWithWhereUniqueWithoutDomainIsuInput[]
    createMany?: KegiatanRapatCreateManyDomainIsuInputEnvelope
    set?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    disconnect?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    delete?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    connect?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    update?: KegiatanRapatUpdateWithWhereUniqueWithoutDomainIsuInput | KegiatanRapatUpdateWithWhereUniqueWithoutDomainIsuInput[]
    updateMany?: KegiatanRapatUpdateManyWithWhereWithoutDomainIsuInput | KegiatanRapatUpdateManyWithWhereWithoutDomainIsuInput[]
    deleteMany?: KegiatanRapatScalarWhereInput | KegiatanRapatScalarWhereInput[]
  }

  export type MasukanWargaCreateNestedManyWithoutDiverifikasiOlehInput = {
    create?: XOR<MasukanWargaCreateWithoutDiverifikasiOlehInput, MasukanWargaUncheckedCreateWithoutDiverifikasiOlehInput> | MasukanWargaCreateWithoutDiverifikasiOlehInput[] | MasukanWargaUncheckedCreateWithoutDiverifikasiOlehInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutDiverifikasiOlehInput | MasukanWargaCreateOrConnectWithoutDiverifikasiOlehInput[]
    createMany?: MasukanWargaCreateManyDiverifikasiOlehInputEnvelope
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
  }

  export type RekomendasiCreateNestedManyWithoutDiprosesOlehInput = {
    create?: XOR<RekomendasiCreateWithoutDiprosesOlehInput, RekomendasiUncheckedCreateWithoutDiprosesOlehInput> | RekomendasiCreateWithoutDiprosesOlehInput[] | RekomendasiUncheckedCreateWithoutDiprosesOlehInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutDiprosesOlehInput | RekomendasiCreateOrConnectWithoutDiprosesOlehInput[]
    createMany?: RekomendasiCreateManyDiprosesOlehInputEnvelope
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type KegiatanRapatCreateNestedManyWithoutDibuatOlehInput = {
    create?: XOR<KegiatanRapatCreateWithoutDibuatOlehInput, KegiatanRapatUncheckedCreateWithoutDibuatOlehInput> | KegiatanRapatCreateWithoutDibuatOlehInput[] | KegiatanRapatUncheckedCreateWithoutDibuatOlehInput[]
    connectOrCreate?: KegiatanRapatCreateOrConnectWithoutDibuatOlehInput | KegiatanRapatCreateOrConnectWithoutDibuatOlehInput[]
    createMany?: KegiatanRapatCreateManyDibuatOlehInputEnvelope
    connect?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
  }

  export type MasukanWargaUncheckedCreateNestedManyWithoutDiverifikasiOlehInput = {
    create?: XOR<MasukanWargaCreateWithoutDiverifikasiOlehInput, MasukanWargaUncheckedCreateWithoutDiverifikasiOlehInput> | MasukanWargaCreateWithoutDiverifikasiOlehInput[] | MasukanWargaUncheckedCreateWithoutDiverifikasiOlehInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutDiverifikasiOlehInput | MasukanWargaCreateOrConnectWithoutDiverifikasiOlehInput[]
    createMany?: MasukanWargaCreateManyDiverifikasiOlehInputEnvelope
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
  }

  export type RekomendasiUncheckedCreateNestedManyWithoutDiprosesOlehInput = {
    create?: XOR<RekomendasiCreateWithoutDiprosesOlehInput, RekomendasiUncheckedCreateWithoutDiprosesOlehInput> | RekomendasiCreateWithoutDiprosesOlehInput[] | RekomendasiUncheckedCreateWithoutDiprosesOlehInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutDiprosesOlehInput | RekomendasiCreateOrConnectWithoutDiprosesOlehInput[]
    createMany?: RekomendasiCreateManyDiprosesOlehInputEnvelope
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type KegiatanRapatUncheckedCreateNestedManyWithoutDibuatOlehInput = {
    create?: XOR<KegiatanRapatCreateWithoutDibuatOlehInput, KegiatanRapatUncheckedCreateWithoutDibuatOlehInput> | KegiatanRapatCreateWithoutDibuatOlehInput[] | KegiatanRapatUncheckedCreateWithoutDibuatOlehInput[]
    connectOrCreate?: KegiatanRapatCreateOrConnectWithoutDibuatOlehInput | KegiatanRapatCreateOrConnectWithoutDibuatOlehInput[]
    createMany?: KegiatanRapatCreateManyDibuatOlehInputEnvelope
    connect?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MasukanWargaUpdateManyWithoutDiverifikasiOlehNestedInput = {
    create?: XOR<MasukanWargaCreateWithoutDiverifikasiOlehInput, MasukanWargaUncheckedCreateWithoutDiverifikasiOlehInput> | MasukanWargaCreateWithoutDiverifikasiOlehInput[] | MasukanWargaUncheckedCreateWithoutDiverifikasiOlehInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutDiverifikasiOlehInput | MasukanWargaCreateOrConnectWithoutDiverifikasiOlehInput[]
    upsert?: MasukanWargaUpsertWithWhereUniqueWithoutDiverifikasiOlehInput | MasukanWargaUpsertWithWhereUniqueWithoutDiverifikasiOlehInput[]
    createMany?: MasukanWargaCreateManyDiverifikasiOlehInputEnvelope
    set?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    disconnect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    delete?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    update?: MasukanWargaUpdateWithWhereUniqueWithoutDiverifikasiOlehInput | MasukanWargaUpdateWithWhereUniqueWithoutDiverifikasiOlehInput[]
    updateMany?: MasukanWargaUpdateManyWithWhereWithoutDiverifikasiOlehInput | MasukanWargaUpdateManyWithWhereWithoutDiverifikasiOlehInput[]
    deleteMany?: MasukanWargaScalarWhereInput | MasukanWargaScalarWhereInput[]
  }

  export type RekomendasiUpdateManyWithoutDiprosesOlehNestedInput = {
    create?: XOR<RekomendasiCreateWithoutDiprosesOlehInput, RekomendasiUncheckedCreateWithoutDiprosesOlehInput> | RekomendasiCreateWithoutDiprosesOlehInput[] | RekomendasiUncheckedCreateWithoutDiprosesOlehInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutDiprosesOlehInput | RekomendasiCreateOrConnectWithoutDiprosesOlehInput[]
    upsert?: RekomendasiUpsertWithWhereUniqueWithoutDiprosesOlehInput | RekomendasiUpsertWithWhereUniqueWithoutDiprosesOlehInput[]
    createMany?: RekomendasiCreateManyDiprosesOlehInputEnvelope
    set?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    disconnect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    delete?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    update?: RekomendasiUpdateWithWhereUniqueWithoutDiprosesOlehInput | RekomendasiUpdateWithWhereUniqueWithoutDiprosesOlehInput[]
    updateMany?: RekomendasiUpdateManyWithWhereWithoutDiprosesOlehInput | RekomendasiUpdateManyWithWhereWithoutDiprosesOlehInput[]
    deleteMany?: RekomendasiScalarWhereInput | RekomendasiScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type KegiatanRapatUpdateManyWithoutDibuatOlehNestedInput = {
    create?: XOR<KegiatanRapatCreateWithoutDibuatOlehInput, KegiatanRapatUncheckedCreateWithoutDibuatOlehInput> | KegiatanRapatCreateWithoutDibuatOlehInput[] | KegiatanRapatUncheckedCreateWithoutDibuatOlehInput[]
    connectOrCreate?: KegiatanRapatCreateOrConnectWithoutDibuatOlehInput | KegiatanRapatCreateOrConnectWithoutDibuatOlehInput[]
    upsert?: KegiatanRapatUpsertWithWhereUniqueWithoutDibuatOlehInput | KegiatanRapatUpsertWithWhereUniqueWithoutDibuatOlehInput[]
    createMany?: KegiatanRapatCreateManyDibuatOlehInputEnvelope
    set?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    disconnect?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    delete?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    connect?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    update?: KegiatanRapatUpdateWithWhereUniqueWithoutDibuatOlehInput | KegiatanRapatUpdateWithWhereUniqueWithoutDibuatOlehInput[]
    updateMany?: KegiatanRapatUpdateManyWithWhereWithoutDibuatOlehInput | KegiatanRapatUpdateManyWithWhereWithoutDibuatOlehInput[]
    deleteMany?: KegiatanRapatScalarWhereInput | KegiatanRapatScalarWhereInput[]
  }

  export type MasukanWargaUncheckedUpdateManyWithoutDiverifikasiOlehNestedInput = {
    create?: XOR<MasukanWargaCreateWithoutDiverifikasiOlehInput, MasukanWargaUncheckedCreateWithoutDiverifikasiOlehInput> | MasukanWargaCreateWithoutDiverifikasiOlehInput[] | MasukanWargaUncheckedCreateWithoutDiverifikasiOlehInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutDiverifikasiOlehInput | MasukanWargaCreateOrConnectWithoutDiverifikasiOlehInput[]
    upsert?: MasukanWargaUpsertWithWhereUniqueWithoutDiverifikasiOlehInput | MasukanWargaUpsertWithWhereUniqueWithoutDiverifikasiOlehInput[]
    createMany?: MasukanWargaCreateManyDiverifikasiOlehInputEnvelope
    set?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    disconnect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    delete?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    update?: MasukanWargaUpdateWithWhereUniqueWithoutDiverifikasiOlehInput | MasukanWargaUpdateWithWhereUniqueWithoutDiverifikasiOlehInput[]
    updateMany?: MasukanWargaUpdateManyWithWhereWithoutDiverifikasiOlehInput | MasukanWargaUpdateManyWithWhereWithoutDiverifikasiOlehInput[]
    deleteMany?: MasukanWargaScalarWhereInput | MasukanWargaScalarWhereInput[]
  }

  export type RekomendasiUncheckedUpdateManyWithoutDiprosesOlehNestedInput = {
    create?: XOR<RekomendasiCreateWithoutDiprosesOlehInput, RekomendasiUncheckedCreateWithoutDiprosesOlehInput> | RekomendasiCreateWithoutDiprosesOlehInput[] | RekomendasiUncheckedCreateWithoutDiprosesOlehInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutDiprosesOlehInput | RekomendasiCreateOrConnectWithoutDiprosesOlehInput[]
    upsert?: RekomendasiUpsertWithWhereUniqueWithoutDiprosesOlehInput | RekomendasiUpsertWithWhereUniqueWithoutDiprosesOlehInput[]
    createMany?: RekomendasiCreateManyDiprosesOlehInputEnvelope
    set?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    disconnect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    delete?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    update?: RekomendasiUpdateWithWhereUniqueWithoutDiprosesOlehInput | RekomendasiUpdateWithWhereUniqueWithoutDiprosesOlehInput[]
    updateMany?: RekomendasiUpdateManyWithWhereWithoutDiprosesOlehInput | RekomendasiUpdateManyWithWhereWithoutDiprosesOlehInput[]
    deleteMany?: RekomendasiScalarWhereInput | RekomendasiScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type KegiatanRapatUncheckedUpdateManyWithoutDibuatOlehNestedInput = {
    create?: XOR<KegiatanRapatCreateWithoutDibuatOlehInput, KegiatanRapatUncheckedCreateWithoutDibuatOlehInput> | KegiatanRapatCreateWithoutDibuatOlehInput[] | KegiatanRapatUncheckedCreateWithoutDibuatOlehInput[]
    connectOrCreate?: KegiatanRapatCreateOrConnectWithoutDibuatOlehInput | KegiatanRapatCreateOrConnectWithoutDibuatOlehInput[]
    upsert?: KegiatanRapatUpsertWithWhereUniqueWithoutDibuatOlehInput | KegiatanRapatUpsertWithWhereUniqueWithoutDibuatOlehInput[]
    createMany?: KegiatanRapatCreateManyDibuatOlehInputEnvelope
    set?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    disconnect?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    delete?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    connect?: KegiatanRapatWhereUniqueInput | KegiatanRapatWhereUniqueInput[]
    update?: KegiatanRapatUpdateWithWhereUniqueWithoutDibuatOlehInput | KegiatanRapatUpdateWithWhereUniqueWithoutDibuatOlehInput[]
    updateMany?: KegiatanRapatUpdateManyWithWhereWithoutDibuatOlehInput | KegiatanRapatUpdateManyWithWhereWithoutDibuatOlehInput[]
    deleteMany?: KegiatanRapatScalarWhereInput | KegiatanRapatScalarWhereInput[]
  }

  export type DomainIsuCreateNestedOneWithoutMasukanInput = {
    create?: XOR<DomainIsuCreateWithoutMasukanInput, DomainIsuUncheckedCreateWithoutMasukanInput>
    connectOrCreate?: DomainIsuCreateOrConnectWithoutMasukanInput
    connect?: DomainIsuWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMasukanVerifikasiInput = {
    create?: XOR<UserCreateWithoutMasukanVerifikasiInput, UserUncheckedCreateWithoutMasukanVerifikasiInput>
    connectOrCreate?: UserCreateOrConnectWithoutMasukanVerifikasiInput
    connect?: UserWhereUniqueInput
  }

  export type RekomendasiMasukanCreateNestedManyWithoutMasukanInput = {
    create?: XOR<RekomendasiMasukanCreateWithoutMasukanInput, RekomendasiMasukanUncheckedCreateWithoutMasukanInput> | RekomendasiMasukanCreateWithoutMasukanInput[] | RekomendasiMasukanUncheckedCreateWithoutMasukanInput[]
    connectOrCreate?: RekomendasiMasukanCreateOrConnectWithoutMasukanInput | RekomendasiMasukanCreateOrConnectWithoutMasukanInput[]
    createMany?: RekomendasiMasukanCreateManyMasukanInputEnvelope
    connect?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
  }

  export type RekomendasiMasukanUncheckedCreateNestedManyWithoutMasukanInput = {
    create?: XOR<RekomendasiMasukanCreateWithoutMasukanInput, RekomendasiMasukanUncheckedCreateWithoutMasukanInput> | RekomendasiMasukanCreateWithoutMasukanInput[] | RekomendasiMasukanUncheckedCreateWithoutMasukanInput[]
    connectOrCreate?: RekomendasiMasukanCreateOrConnectWithoutMasukanInput | RekomendasiMasukanCreateOrConnectWithoutMasukanInput[]
    createMany?: RekomendasiMasukanCreateManyMasukanInputEnvelope
    connect?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStatusMasukanFieldUpdateOperationsInput = {
    set?: $Enums.StatusMasukan
  }

  export type DomainIsuUpdateOneRequiredWithoutMasukanNestedInput = {
    create?: XOR<DomainIsuCreateWithoutMasukanInput, DomainIsuUncheckedCreateWithoutMasukanInput>
    connectOrCreate?: DomainIsuCreateOrConnectWithoutMasukanInput
    upsert?: DomainIsuUpsertWithoutMasukanInput
    connect?: DomainIsuWhereUniqueInput
    update?: XOR<XOR<DomainIsuUpdateToOneWithWhereWithoutMasukanInput, DomainIsuUpdateWithoutMasukanInput>, DomainIsuUncheckedUpdateWithoutMasukanInput>
  }

  export type UserUpdateOneWithoutMasukanVerifikasiNestedInput = {
    create?: XOR<UserCreateWithoutMasukanVerifikasiInput, UserUncheckedCreateWithoutMasukanVerifikasiInput>
    connectOrCreate?: UserCreateOrConnectWithoutMasukanVerifikasiInput
    upsert?: UserUpsertWithoutMasukanVerifikasiInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMasukanVerifikasiInput, UserUpdateWithoutMasukanVerifikasiInput>, UserUncheckedUpdateWithoutMasukanVerifikasiInput>
  }

  export type RekomendasiMasukanUpdateManyWithoutMasukanNestedInput = {
    create?: XOR<RekomendasiMasukanCreateWithoutMasukanInput, RekomendasiMasukanUncheckedCreateWithoutMasukanInput> | RekomendasiMasukanCreateWithoutMasukanInput[] | RekomendasiMasukanUncheckedCreateWithoutMasukanInput[]
    connectOrCreate?: RekomendasiMasukanCreateOrConnectWithoutMasukanInput | RekomendasiMasukanCreateOrConnectWithoutMasukanInput[]
    upsert?: RekomendasiMasukanUpsertWithWhereUniqueWithoutMasukanInput | RekomendasiMasukanUpsertWithWhereUniqueWithoutMasukanInput[]
    createMany?: RekomendasiMasukanCreateManyMasukanInputEnvelope
    set?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    disconnect?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    delete?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    connect?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    update?: RekomendasiMasukanUpdateWithWhereUniqueWithoutMasukanInput | RekomendasiMasukanUpdateWithWhereUniqueWithoutMasukanInput[]
    updateMany?: RekomendasiMasukanUpdateManyWithWhereWithoutMasukanInput | RekomendasiMasukanUpdateManyWithWhereWithoutMasukanInput[]
    deleteMany?: RekomendasiMasukanScalarWhereInput | RekomendasiMasukanScalarWhereInput[]
  }

  export type RekomendasiMasukanUncheckedUpdateManyWithoutMasukanNestedInput = {
    create?: XOR<RekomendasiMasukanCreateWithoutMasukanInput, RekomendasiMasukanUncheckedCreateWithoutMasukanInput> | RekomendasiMasukanCreateWithoutMasukanInput[] | RekomendasiMasukanUncheckedCreateWithoutMasukanInput[]
    connectOrCreate?: RekomendasiMasukanCreateOrConnectWithoutMasukanInput | RekomendasiMasukanCreateOrConnectWithoutMasukanInput[]
    upsert?: RekomendasiMasukanUpsertWithWhereUniqueWithoutMasukanInput | RekomendasiMasukanUpsertWithWhereUniqueWithoutMasukanInput[]
    createMany?: RekomendasiMasukanCreateManyMasukanInputEnvelope
    set?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    disconnect?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    delete?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    connect?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    update?: RekomendasiMasukanUpdateWithWhereUniqueWithoutMasukanInput | RekomendasiMasukanUpdateWithWhereUniqueWithoutMasukanInput[]
    updateMany?: RekomendasiMasukanUpdateManyWithWhereWithoutMasukanInput | RekomendasiMasukanUpdateManyWithWhereWithoutMasukanInput[]
    deleteMany?: RekomendasiMasukanScalarWhereInput | RekomendasiMasukanScalarWhereInput[]
  }

  export type DomainIsuCreateNestedOneWithoutDataMasterInput = {
    create?: XOR<DomainIsuCreateWithoutDataMasterInput, DomainIsuUncheckedCreateWithoutDataMasterInput>
    connectOrCreate?: DomainIsuCreateOrConnectWithoutDataMasterInput
    connect?: DomainIsuWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DomainIsuUpdateOneRequiredWithoutDataMasterNestedInput = {
    create?: XOR<DomainIsuCreateWithoutDataMasterInput, DomainIsuUncheckedCreateWithoutDataMasterInput>
    connectOrCreate?: DomainIsuCreateOrConnectWithoutDataMasterInput
    upsert?: DomainIsuUpsertWithoutDataMasterInput
    connect?: DomainIsuWhereUniqueInput
    update?: XOR<XOR<DomainIsuUpdateToOneWithWhereWithoutDataMasterInput, DomainIsuUpdateWithoutDataMasterInput>, DomainIsuUncheckedUpdateWithoutDataMasterInput>
  }

  export type KegiatanRapatCreateNestedOneWithoutRekomendasiInput = {
    create?: XOR<KegiatanRapatCreateWithoutRekomendasiInput, KegiatanRapatUncheckedCreateWithoutRekomendasiInput>
    connectOrCreate?: KegiatanRapatCreateOrConnectWithoutRekomendasiInput
    connect?: KegiatanRapatWhereUniqueInput
  }

  export type DomainIsuCreateNestedOneWithoutRekomendasiInput = {
    create?: XOR<DomainIsuCreateWithoutRekomendasiInput, DomainIsuUncheckedCreateWithoutRekomendasiInput>
    connectOrCreate?: DomainIsuCreateOrConnectWithoutRekomendasiInput
    connect?: DomainIsuWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRekomendasiDiprosesInput = {
    create?: XOR<UserCreateWithoutRekomendasiDiprosesInput, UserUncheckedCreateWithoutRekomendasiDiprosesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRekomendasiDiprosesInput
    connect?: UserWhereUniqueInput
  }

  export type RekomendasiMasukanCreateNestedManyWithoutRekomendasiInput = {
    create?: XOR<RekomendasiMasukanCreateWithoutRekomendasiInput, RekomendasiMasukanUncheckedCreateWithoutRekomendasiInput> | RekomendasiMasukanCreateWithoutRekomendasiInput[] | RekomendasiMasukanUncheckedCreateWithoutRekomendasiInput[]
    connectOrCreate?: RekomendasiMasukanCreateOrConnectWithoutRekomendasiInput | RekomendasiMasukanCreateOrConnectWithoutRekomendasiInput[]
    createMany?: RekomendasiMasukanCreateManyRekomendasiInputEnvelope
    connect?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
  }

  export type RekomendasiMasukanUncheckedCreateNestedManyWithoutRekomendasiInput = {
    create?: XOR<RekomendasiMasukanCreateWithoutRekomendasiInput, RekomendasiMasukanUncheckedCreateWithoutRekomendasiInput> | RekomendasiMasukanCreateWithoutRekomendasiInput[] | RekomendasiMasukanUncheckedCreateWithoutRekomendasiInput[]
    connectOrCreate?: RekomendasiMasukanCreateOrConnectWithoutRekomendasiInput | RekomendasiMasukanCreateOrConnectWithoutRekomendasiInput[]
    createMany?: RekomendasiMasukanCreateManyRekomendasiInputEnvelope
    connect?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStatusRekomendasiFieldUpdateOperationsInput = {
    set?: $Enums.StatusRekomendasi
  }

  export type KegiatanRapatUpdateOneRequiredWithoutRekomendasiNestedInput = {
    create?: XOR<KegiatanRapatCreateWithoutRekomendasiInput, KegiatanRapatUncheckedCreateWithoutRekomendasiInput>
    connectOrCreate?: KegiatanRapatCreateOrConnectWithoutRekomendasiInput
    upsert?: KegiatanRapatUpsertWithoutRekomendasiInput
    connect?: KegiatanRapatWhereUniqueInput
    update?: XOR<XOR<KegiatanRapatUpdateToOneWithWhereWithoutRekomendasiInput, KegiatanRapatUpdateWithoutRekomendasiInput>, KegiatanRapatUncheckedUpdateWithoutRekomendasiInput>
  }

  export type DomainIsuUpdateOneRequiredWithoutRekomendasiNestedInput = {
    create?: XOR<DomainIsuCreateWithoutRekomendasiInput, DomainIsuUncheckedCreateWithoutRekomendasiInput>
    connectOrCreate?: DomainIsuCreateOrConnectWithoutRekomendasiInput
    upsert?: DomainIsuUpsertWithoutRekomendasiInput
    connect?: DomainIsuWhereUniqueInput
    update?: XOR<XOR<DomainIsuUpdateToOneWithWhereWithoutRekomendasiInput, DomainIsuUpdateWithoutRekomendasiInput>, DomainIsuUncheckedUpdateWithoutRekomendasiInput>
  }

  export type UserUpdateOneWithoutRekomendasiDiprosesNestedInput = {
    create?: XOR<UserCreateWithoutRekomendasiDiprosesInput, UserUncheckedCreateWithoutRekomendasiDiprosesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRekomendasiDiprosesInput
    upsert?: UserUpsertWithoutRekomendasiDiprosesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRekomendasiDiprosesInput, UserUpdateWithoutRekomendasiDiprosesInput>, UserUncheckedUpdateWithoutRekomendasiDiprosesInput>
  }

  export type RekomendasiMasukanUpdateManyWithoutRekomendasiNestedInput = {
    create?: XOR<RekomendasiMasukanCreateWithoutRekomendasiInput, RekomendasiMasukanUncheckedCreateWithoutRekomendasiInput> | RekomendasiMasukanCreateWithoutRekomendasiInput[] | RekomendasiMasukanUncheckedCreateWithoutRekomendasiInput[]
    connectOrCreate?: RekomendasiMasukanCreateOrConnectWithoutRekomendasiInput | RekomendasiMasukanCreateOrConnectWithoutRekomendasiInput[]
    upsert?: RekomendasiMasukanUpsertWithWhereUniqueWithoutRekomendasiInput | RekomendasiMasukanUpsertWithWhereUniqueWithoutRekomendasiInput[]
    createMany?: RekomendasiMasukanCreateManyRekomendasiInputEnvelope
    set?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    disconnect?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    delete?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    connect?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    update?: RekomendasiMasukanUpdateWithWhereUniqueWithoutRekomendasiInput | RekomendasiMasukanUpdateWithWhereUniqueWithoutRekomendasiInput[]
    updateMany?: RekomendasiMasukanUpdateManyWithWhereWithoutRekomendasiInput | RekomendasiMasukanUpdateManyWithWhereWithoutRekomendasiInput[]
    deleteMany?: RekomendasiMasukanScalarWhereInput | RekomendasiMasukanScalarWhereInput[]
  }

  export type RekomendasiMasukanUncheckedUpdateManyWithoutRekomendasiNestedInput = {
    create?: XOR<RekomendasiMasukanCreateWithoutRekomendasiInput, RekomendasiMasukanUncheckedCreateWithoutRekomendasiInput> | RekomendasiMasukanCreateWithoutRekomendasiInput[] | RekomendasiMasukanUncheckedCreateWithoutRekomendasiInput[]
    connectOrCreate?: RekomendasiMasukanCreateOrConnectWithoutRekomendasiInput | RekomendasiMasukanCreateOrConnectWithoutRekomendasiInput[]
    upsert?: RekomendasiMasukanUpsertWithWhereUniqueWithoutRekomendasiInput | RekomendasiMasukanUpsertWithWhereUniqueWithoutRekomendasiInput[]
    createMany?: RekomendasiMasukanCreateManyRekomendasiInputEnvelope
    set?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    disconnect?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    delete?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    connect?: RekomendasiMasukanWhereUniqueInput | RekomendasiMasukanWhereUniqueInput[]
    update?: RekomendasiMasukanUpdateWithWhereUniqueWithoutRekomendasiInput | RekomendasiMasukanUpdateWithWhereUniqueWithoutRekomendasiInput[]
    updateMany?: RekomendasiMasukanUpdateManyWithWhereWithoutRekomendasiInput | RekomendasiMasukanUpdateManyWithWhereWithoutRekomendasiInput[]
    deleteMany?: RekomendasiMasukanScalarWhereInput | RekomendasiMasukanScalarWhereInput[]
  }

  export type RekomendasiCreateNestedOneWithoutMasukanLinksInput = {
    create?: XOR<RekomendasiCreateWithoutMasukanLinksInput, RekomendasiUncheckedCreateWithoutMasukanLinksInput>
    connectOrCreate?: RekomendasiCreateOrConnectWithoutMasukanLinksInput
    connect?: RekomendasiWhereUniqueInput
  }

  export type MasukanWargaCreateNestedOneWithoutRekomendasiLinksInput = {
    create?: XOR<MasukanWargaCreateWithoutRekomendasiLinksInput, MasukanWargaUncheckedCreateWithoutRekomendasiLinksInput>
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutRekomendasiLinksInput
    connect?: MasukanWargaWhereUniqueInput
  }

  export type RekomendasiUpdateOneRequiredWithoutMasukanLinksNestedInput = {
    create?: XOR<RekomendasiCreateWithoutMasukanLinksInput, RekomendasiUncheckedCreateWithoutMasukanLinksInput>
    connectOrCreate?: RekomendasiCreateOrConnectWithoutMasukanLinksInput
    upsert?: RekomendasiUpsertWithoutMasukanLinksInput
    connect?: RekomendasiWhereUniqueInput
    update?: XOR<XOR<RekomendasiUpdateToOneWithWhereWithoutMasukanLinksInput, RekomendasiUpdateWithoutMasukanLinksInput>, RekomendasiUncheckedUpdateWithoutMasukanLinksInput>
  }

  export type MasukanWargaUpdateOneRequiredWithoutRekomendasiLinksNestedInput = {
    create?: XOR<MasukanWargaCreateWithoutRekomendasiLinksInput, MasukanWargaUncheckedCreateWithoutRekomendasiLinksInput>
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutRekomendasiLinksInput
    upsert?: MasukanWargaUpsertWithoutRekomendasiLinksInput
    connect?: MasukanWargaWhereUniqueInput
    update?: XOR<XOR<MasukanWargaUpdateToOneWithWhereWithoutRekomendasiLinksInput, MasukanWargaUpdateWithoutRekomendasiLinksInput>, MasukanWargaUncheckedUpdateWithoutRekomendasiLinksInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type DomainIsuCreateNestedOneWithoutKegiatanRapatInput = {
    create?: XOR<DomainIsuCreateWithoutKegiatanRapatInput, DomainIsuUncheckedCreateWithoutKegiatanRapatInput>
    connectOrCreate?: DomainIsuCreateOrConnectWithoutKegiatanRapatInput
    connect?: DomainIsuWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutKegiatanRapatInput = {
    create?: XOR<UserCreateWithoutKegiatanRapatInput, UserUncheckedCreateWithoutKegiatanRapatInput>
    connectOrCreate?: UserCreateOrConnectWithoutKegiatanRapatInput
    connect?: UserWhereUniqueInput
  }

  export type RekomendasiCreateNestedManyWithoutKegiatanRapatInput = {
    create?: XOR<RekomendasiCreateWithoutKegiatanRapatInput, RekomendasiUncheckedCreateWithoutKegiatanRapatInput> | RekomendasiCreateWithoutKegiatanRapatInput[] | RekomendasiUncheckedCreateWithoutKegiatanRapatInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutKegiatanRapatInput | RekomendasiCreateOrConnectWithoutKegiatanRapatInput[]
    createMany?: RekomendasiCreateManyKegiatanRapatInputEnvelope
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
  }

  export type RekomendasiUncheckedCreateNestedManyWithoutKegiatanRapatInput = {
    create?: XOR<RekomendasiCreateWithoutKegiatanRapatInput, RekomendasiUncheckedCreateWithoutKegiatanRapatInput> | RekomendasiCreateWithoutKegiatanRapatInput[] | RekomendasiUncheckedCreateWithoutKegiatanRapatInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutKegiatanRapatInput | RekomendasiCreateOrConnectWithoutKegiatanRapatInput[]
    createMany?: RekomendasiCreateManyKegiatanRapatInputEnvelope
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
  }

  export type DomainIsuUpdateOneWithoutKegiatanRapatNestedInput = {
    create?: XOR<DomainIsuCreateWithoutKegiatanRapatInput, DomainIsuUncheckedCreateWithoutKegiatanRapatInput>
    connectOrCreate?: DomainIsuCreateOrConnectWithoutKegiatanRapatInput
    upsert?: DomainIsuUpsertWithoutKegiatanRapatInput
    disconnect?: DomainIsuWhereInput | boolean
    delete?: DomainIsuWhereInput | boolean
    connect?: DomainIsuWhereUniqueInput
    update?: XOR<XOR<DomainIsuUpdateToOneWithWhereWithoutKegiatanRapatInput, DomainIsuUpdateWithoutKegiatanRapatInput>, DomainIsuUncheckedUpdateWithoutKegiatanRapatInput>
  }

  export type UserUpdateOneRequiredWithoutKegiatanRapatNestedInput = {
    create?: XOR<UserCreateWithoutKegiatanRapatInput, UserUncheckedCreateWithoutKegiatanRapatInput>
    connectOrCreate?: UserCreateOrConnectWithoutKegiatanRapatInput
    upsert?: UserUpsertWithoutKegiatanRapatInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutKegiatanRapatInput, UserUpdateWithoutKegiatanRapatInput>, UserUncheckedUpdateWithoutKegiatanRapatInput>
  }

  export type RekomendasiUpdateManyWithoutKegiatanRapatNestedInput = {
    create?: XOR<RekomendasiCreateWithoutKegiatanRapatInput, RekomendasiUncheckedCreateWithoutKegiatanRapatInput> | RekomendasiCreateWithoutKegiatanRapatInput[] | RekomendasiUncheckedCreateWithoutKegiatanRapatInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutKegiatanRapatInput | RekomendasiCreateOrConnectWithoutKegiatanRapatInput[]
    upsert?: RekomendasiUpsertWithWhereUniqueWithoutKegiatanRapatInput | RekomendasiUpsertWithWhereUniqueWithoutKegiatanRapatInput[]
    createMany?: RekomendasiCreateManyKegiatanRapatInputEnvelope
    set?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    disconnect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    delete?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    update?: RekomendasiUpdateWithWhereUniqueWithoutKegiatanRapatInput | RekomendasiUpdateWithWhereUniqueWithoutKegiatanRapatInput[]
    updateMany?: RekomendasiUpdateManyWithWhereWithoutKegiatanRapatInput | RekomendasiUpdateManyWithWhereWithoutKegiatanRapatInput[]
    deleteMany?: RekomendasiScalarWhereInput | RekomendasiScalarWhereInput[]
  }

  export type RekomendasiUncheckedUpdateManyWithoutKegiatanRapatNestedInput = {
    create?: XOR<RekomendasiCreateWithoutKegiatanRapatInput, RekomendasiUncheckedCreateWithoutKegiatanRapatInput> | RekomendasiCreateWithoutKegiatanRapatInput[] | RekomendasiUncheckedCreateWithoutKegiatanRapatInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutKegiatanRapatInput | RekomendasiCreateOrConnectWithoutKegiatanRapatInput[]
    upsert?: RekomendasiUpsertWithWhereUniqueWithoutKegiatanRapatInput | RekomendasiUpsertWithWhereUniqueWithoutKegiatanRapatInput[]
    createMany?: RekomendasiCreateManyKegiatanRapatInputEnvelope
    set?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    disconnect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    delete?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    update?: RekomendasiUpdateWithWhereUniqueWithoutKegiatanRapatInput | RekomendasiUpdateWithWhereUniqueWithoutKegiatanRapatInput[]
    updateMany?: RekomendasiUpdateManyWithWhereWithoutKegiatanRapatInput | RekomendasiUpdateManyWithWhereWithoutKegiatanRapatInput[]
    deleteMany?: RekomendasiScalarWhereInput | RekomendasiScalarWhereInput[]
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumStatusMasukanFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusMasukan | EnumStatusMasukanFieldRefInput<$PrismaModel>
    in?: $Enums.StatusMasukan[] | ListEnumStatusMasukanFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusMasukan[] | ListEnumStatusMasukanFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusMasukanFilter<$PrismaModel> | $Enums.StatusMasukan
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

  export type NestedEnumStatusMasukanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusMasukan | EnumStatusMasukanFieldRefInput<$PrismaModel>
    in?: $Enums.StatusMasukan[] | ListEnumStatusMasukanFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusMasukan[] | ListEnumStatusMasukanFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusMasukanWithAggregatesFilter<$PrismaModel> | $Enums.StatusMasukan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusMasukanFilter<$PrismaModel>
    _max?: NestedEnumStatusMasukanFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumStatusRekomendasiFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusRekomendasi | EnumStatusRekomendasiFieldRefInput<$PrismaModel>
    in?: $Enums.StatusRekomendasi[] | ListEnumStatusRekomendasiFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusRekomendasi[] | ListEnumStatusRekomendasiFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusRekomendasiFilter<$PrismaModel> | $Enums.StatusRekomendasi
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumStatusRekomendasiWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusRekomendasi | EnumStatusRekomendasiFieldRefInput<$PrismaModel>
    in?: $Enums.StatusRekomendasi[] | ListEnumStatusRekomendasiFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusRekomendasi[] | ListEnumStatusRekomendasiFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusRekomendasiWithAggregatesFilter<$PrismaModel> | $Enums.StatusRekomendasi
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusRekomendasiFilter<$PrismaModel>
    _max?: NestedEnumStatusRekomendasiFilter<$PrismaModel>
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
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type MasukanWargaCreateWithoutDomainIsuInput = {
    id?: string
    judul: string
    deskripsi: string
    lokasiRt: number
    lokasiRw: number
    status?: $Enums.StatusMasukan
    createdAt?: Date | string
    updatedAt?: Date | string
    diverifikasiOleh?: UserCreateNestedOneWithoutMasukanVerifikasiInput
    rekomendasiLinks?: RekomendasiMasukanCreateNestedManyWithoutMasukanInput
  }

  export type MasukanWargaUncheckedCreateWithoutDomainIsuInput = {
    id?: string
    judul: string
    deskripsi: string
    lokasiRt: number
    lokasiRw: number
    status?: $Enums.StatusMasukan
    diverifikasiOlehId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rekomendasiLinks?: RekomendasiMasukanUncheckedCreateNestedManyWithoutMasukanInput
  }

  export type MasukanWargaCreateOrConnectWithoutDomainIsuInput = {
    where: MasukanWargaWhereUniqueInput
    create: XOR<MasukanWargaCreateWithoutDomainIsuInput, MasukanWargaUncheckedCreateWithoutDomainIsuInput>
  }

  export type MasukanWargaCreateManyDomainIsuInputEnvelope = {
    data: MasukanWargaCreateManyDomainIsuInput | MasukanWargaCreateManyDomainIsuInput[]
    skipDuplicates?: boolean
  }

  export type DataMasterCreateWithoutDomainIsuInput = {
    id?: string
    namaAtribut: string
    nilai: string
    jumlah?: number | null
    lokasiRt?: number | null
    lokasiRw?: number | null
    sumberData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DataMasterUncheckedCreateWithoutDomainIsuInput = {
    id?: string
    namaAtribut: string
    nilai: string
    jumlah?: number | null
    lokasiRt?: number | null
    lokasiRw?: number | null
    sumberData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DataMasterCreateOrConnectWithoutDomainIsuInput = {
    where: DataMasterWhereUniqueInput
    create: XOR<DataMasterCreateWithoutDomainIsuInput, DataMasterUncheckedCreateWithoutDomainIsuInput>
  }

  export type DataMasterCreateManyDomainIsuInputEnvelope = {
    data: DataMasterCreateManyDomainIsuInput | DataMasterCreateManyDomainIsuInput[]
    skipDuplicates?: boolean
  }

  export type RekomendasiCreateWithoutDomainIsuInput = {
    id?: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    kegiatanRapat: KegiatanRapatCreateNestedOneWithoutRekomendasiInput
    diprosesOleh?: UserCreateNestedOneWithoutRekomendasiDiprosesInput
    masukanLinks?: RekomendasiMasukanCreateNestedManyWithoutRekomendasiInput
  }

  export type RekomendasiUncheckedCreateWithoutDomainIsuInput = {
    id?: string
    kegiatanRapatId: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    masukanLinks?: RekomendasiMasukanUncheckedCreateNestedManyWithoutRekomendasiInput
  }

  export type RekomendasiCreateOrConnectWithoutDomainIsuInput = {
    where: RekomendasiWhereUniqueInput
    create: XOR<RekomendasiCreateWithoutDomainIsuInput, RekomendasiUncheckedCreateWithoutDomainIsuInput>
  }

  export type RekomendasiCreateManyDomainIsuInputEnvelope = {
    data: RekomendasiCreateManyDomainIsuInput | RekomendasiCreateManyDomainIsuInput[]
    skipDuplicates?: boolean
  }

  export type KegiatanRapatCreateWithoutDomainIsuInput = {
    id?: string
    judul: string
    deskripsi: string
    tanggal: Date | string
    lokasi?: string | null
    aiModel?: string | null
    aiPromptHash?: string | null
    aiProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dibuatOleh: UserCreateNestedOneWithoutKegiatanRapatInput
    rekomendasi?: RekomendasiCreateNestedManyWithoutKegiatanRapatInput
  }

  export type KegiatanRapatUncheckedCreateWithoutDomainIsuInput = {
    id?: string
    judul: string
    deskripsi: string
    tanggal: Date | string
    lokasi?: string | null
    dibuatOlehId: string
    aiModel?: string | null
    aiPromptHash?: string | null
    aiProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rekomendasi?: RekomendasiUncheckedCreateNestedManyWithoutKegiatanRapatInput
  }

  export type KegiatanRapatCreateOrConnectWithoutDomainIsuInput = {
    where: KegiatanRapatWhereUniqueInput
    create: XOR<KegiatanRapatCreateWithoutDomainIsuInput, KegiatanRapatUncheckedCreateWithoutDomainIsuInput>
  }

  export type KegiatanRapatCreateManyDomainIsuInputEnvelope = {
    data: KegiatanRapatCreateManyDomainIsuInput | KegiatanRapatCreateManyDomainIsuInput[]
    skipDuplicates?: boolean
  }

  export type MasukanWargaUpsertWithWhereUniqueWithoutDomainIsuInput = {
    where: MasukanWargaWhereUniqueInput
    update: XOR<MasukanWargaUpdateWithoutDomainIsuInput, MasukanWargaUncheckedUpdateWithoutDomainIsuInput>
    create: XOR<MasukanWargaCreateWithoutDomainIsuInput, MasukanWargaUncheckedCreateWithoutDomainIsuInput>
  }

  export type MasukanWargaUpdateWithWhereUniqueWithoutDomainIsuInput = {
    where: MasukanWargaWhereUniqueInput
    data: XOR<MasukanWargaUpdateWithoutDomainIsuInput, MasukanWargaUncheckedUpdateWithoutDomainIsuInput>
  }

  export type MasukanWargaUpdateManyWithWhereWithoutDomainIsuInput = {
    where: MasukanWargaScalarWhereInput
    data: XOR<MasukanWargaUpdateManyMutationInput, MasukanWargaUncheckedUpdateManyWithoutDomainIsuInput>
  }

  export type MasukanWargaScalarWhereInput = {
    AND?: MasukanWargaScalarWhereInput | MasukanWargaScalarWhereInput[]
    OR?: MasukanWargaScalarWhereInput[]
    NOT?: MasukanWargaScalarWhereInput | MasukanWargaScalarWhereInput[]
    id?: StringFilter<"MasukanWarga"> | string
    judul?: StringFilter<"MasukanWarga"> | string
    deskripsi?: StringFilter<"MasukanWarga"> | string
    lokasiRt?: IntFilter<"MasukanWarga"> | number
    lokasiRw?: IntFilter<"MasukanWarga"> | number
    domainIsuId?: StringFilter<"MasukanWarga"> | string
    status?: EnumStatusMasukanFilter<"MasukanWarga"> | $Enums.StatusMasukan
    diverifikasiOlehId?: StringNullableFilter<"MasukanWarga"> | string | null
    createdAt?: DateTimeFilter<"MasukanWarga"> | Date | string
    updatedAt?: DateTimeFilter<"MasukanWarga"> | Date | string
  }

  export type DataMasterUpsertWithWhereUniqueWithoutDomainIsuInput = {
    where: DataMasterWhereUniqueInput
    update: XOR<DataMasterUpdateWithoutDomainIsuInput, DataMasterUncheckedUpdateWithoutDomainIsuInput>
    create: XOR<DataMasterCreateWithoutDomainIsuInput, DataMasterUncheckedCreateWithoutDomainIsuInput>
  }

  export type DataMasterUpdateWithWhereUniqueWithoutDomainIsuInput = {
    where: DataMasterWhereUniqueInput
    data: XOR<DataMasterUpdateWithoutDomainIsuInput, DataMasterUncheckedUpdateWithoutDomainIsuInput>
  }

  export type DataMasterUpdateManyWithWhereWithoutDomainIsuInput = {
    where: DataMasterScalarWhereInput
    data: XOR<DataMasterUpdateManyMutationInput, DataMasterUncheckedUpdateManyWithoutDomainIsuInput>
  }

  export type DataMasterScalarWhereInput = {
    AND?: DataMasterScalarWhereInput | DataMasterScalarWhereInput[]
    OR?: DataMasterScalarWhereInput[]
    NOT?: DataMasterScalarWhereInput | DataMasterScalarWhereInput[]
    id?: StringFilter<"DataMaster"> | string
    domainIsuId?: StringFilter<"DataMaster"> | string
    namaAtribut?: StringFilter<"DataMaster"> | string
    nilai?: StringFilter<"DataMaster"> | string
    jumlah?: IntNullableFilter<"DataMaster"> | number | null
    lokasiRt?: IntNullableFilter<"DataMaster"> | number | null
    lokasiRw?: IntNullableFilter<"DataMaster"> | number | null
    sumberData?: StringNullableFilter<"DataMaster"> | string | null
    createdAt?: DateTimeFilter<"DataMaster"> | Date | string
    updatedAt?: DateTimeFilter<"DataMaster"> | Date | string
  }

  export type RekomendasiUpsertWithWhereUniqueWithoutDomainIsuInput = {
    where: RekomendasiWhereUniqueInput
    update: XOR<RekomendasiUpdateWithoutDomainIsuInput, RekomendasiUncheckedUpdateWithoutDomainIsuInput>
    create: XOR<RekomendasiCreateWithoutDomainIsuInput, RekomendasiUncheckedCreateWithoutDomainIsuInput>
  }

  export type RekomendasiUpdateWithWhereUniqueWithoutDomainIsuInput = {
    where: RekomendasiWhereUniqueInput
    data: XOR<RekomendasiUpdateWithoutDomainIsuInput, RekomendasiUncheckedUpdateWithoutDomainIsuInput>
  }

  export type RekomendasiUpdateManyWithWhereWithoutDomainIsuInput = {
    where: RekomendasiScalarWhereInput
    data: XOR<RekomendasiUpdateManyMutationInput, RekomendasiUncheckedUpdateManyWithoutDomainIsuInput>
  }

  export type RekomendasiScalarWhereInput = {
    AND?: RekomendasiScalarWhereInput | RekomendasiScalarWhereInput[]
    OR?: RekomendasiScalarWhereInput[]
    NOT?: RekomendasiScalarWhereInput | RekomendasiScalarWhereInput[]
    id?: StringFilter<"Rekomendasi"> | string
    kegiatanRapatId?: StringFilter<"Rekomendasi"> | string
    domainIsuId?: StringFilter<"Rekomendasi"> | string
    judul?: StringFilter<"Rekomendasi"> | string
    ringkasan?: StringFilter<"Rekomendasi"> | string
    deskripsi?: StringFilter<"Rekomendasi"> | string
    skorPrioritas?: FloatFilter<"Rekomendasi"> | number
    status?: EnumStatusRekomendasiFilter<"Rekomendasi"> | $Enums.StatusRekomendasi
    laporanLengkap?: JsonFilter<"Rekomendasi">
    diprosesOlehId?: StringNullableFilter<"Rekomendasi"> | string | null
    createdAt?: DateTimeFilter<"Rekomendasi"> | Date | string
    updatedAt?: DateTimeFilter<"Rekomendasi"> | Date | string
  }

  export type KegiatanRapatUpsertWithWhereUniqueWithoutDomainIsuInput = {
    where: KegiatanRapatWhereUniqueInput
    update: XOR<KegiatanRapatUpdateWithoutDomainIsuInput, KegiatanRapatUncheckedUpdateWithoutDomainIsuInput>
    create: XOR<KegiatanRapatCreateWithoutDomainIsuInput, KegiatanRapatUncheckedCreateWithoutDomainIsuInput>
  }

  export type KegiatanRapatUpdateWithWhereUniqueWithoutDomainIsuInput = {
    where: KegiatanRapatWhereUniqueInput
    data: XOR<KegiatanRapatUpdateWithoutDomainIsuInput, KegiatanRapatUncheckedUpdateWithoutDomainIsuInput>
  }

  export type KegiatanRapatUpdateManyWithWhereWithoutDomainIsuInput = {
    where: KegiatanRapatScalarWhereInput
    data: XOR<KegiatanRapatUpdateManyMutationInput, KegiatanRapatUncheckedUpdateManyWithoutDomainIsuInput>
  }

  export type KegiatanRapatScalarWhereInput = {
    AND?: KegiatanRapatScalarWhereInput | KegiatanRapatScalarWhereInput[]
    OR?: KegiatanRapatScalarWhereInput[]
    NOT?: KegiatanRapatScalarWhereInput | KegiatanRapatScalarWhereInput[]
    id?: StringFilter<"KegiatanRapat"> | string
    judul?: StringFilter<"KegiatanRapat"> | string
    deskripsi?: StringFilter<"KegiatanRapat"> | string
    tanggal?: DateTimeFilter<"KegiatanRapat"> | Date | string
    lokasi?: StringNullableFilter<"KegiatanRapat"> | string | null
    domainIsuId?: StringNullableFilter<"KegiatanRapat"> | string | null
    dibuatOlehId?: StringFilter<"KegiatanRapat"> | string
    aiModel?: StringNullableFilter<"KegiatanRapat"> | string | null
    aiPromptHash?: StringNullableFilter<"KegiatanRapat"> | string | null
    aiProcessedAt?: DateTimeNullableFilter<"KegiatanRapat"> | Date | string | null
    createdAt?: DateTimeFilter<"KegiatanRapat"> | Date | string
    updatedAt?: DateTimeFilter<"KegiatanRapat"> | Date | string
  }

  export type MasukanWargaCreateWithoutDiverifikasiOlehInput = {
    id?: string
    judul: string
    deskripsi: string
    lokasiRt: number
    lokasiRw: number
    status?: $Enums.StatusMasukan
    createdAt?: Date | string
    updatedAt?: Date | string
    domainIsu: DomainIsuCreateNestedOneWithoutMasukanInput
    rekomendasiLinks?: RekomendasiMasukanCreateNestedManyWithoutMasukanInput
  }

  export type MasukanWargaUncheckedCreateWithoutDiverifikasiOlehInput = {
    id?: string
    judul: string
    deskripsi: string
    lokasiRt: number
    lokasiRw: number
    domainIsuId: string
    status?: $Enums.StatusMasukan
    createdAt?: Date | string
    updatedAt?: Date | string
    rekomendasiLinks?: RekomendasiMasukanUncheckedCreateNestedManyWithoutMasukanInput
  }

  export type MasukanWargaCreateOrConnectWithoutDiverifikasiOlehInput = {
    where: MasukanWargaWhereUniqueInput
    create: XOR<MasukanWargaCreateWithoutDiverifikasiOlehInput, MasukanWargaUncheckedCreateWithoutDiverifikasiOlehInput>
  }

  export type MasukanWargaCreateManyDiverifikasiOlehInputEnvelope = {
    data: MasukanWargaCreateManyDiverifikasiOlehInput | MasukanWargaCreateManyDiverifikasiOlehInput[]
    skipDuplicates?: boolean
  }

  export type RekomendasiCreateWithoutDiprosesOlehInput = {
    id?: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    kegiatanRapat: KegiatanRapatCreateNestedOneWithoutRekomendasiInput
    domainIsu: DomainIsuCreateNestedOneWithoutRekomendasiInput
    masukanLinks?: RekomendasiMasukanCreateNestedManyWithoutRekomendasiInput
  }

  export type RekomendasiUncheckedCreateWithoutDiprosesOlehInput = {
    id?: string
    kegiatanRapatId: string
    domainIsuId: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    masukanLinks?: RekomendasiMasukanUncheckedCreateNestedManyWithoutRekomendasiInput
  }

  export type RekomendasiCreateOrConnectWithoutDiprosesOlehInput = {
    where: RekomendasiWhereUniqueInput
    create: XOR<RekomendasiCreateWithoutDiprosesOlehInput, RekomendasiUncheckedCreateWithoutDiprosesOlehInput>
  }

  export type RekomendasiCreateManyDiprosesOlehInputEnvelope = {
    data: RekomendasiCreateManyDiprosesOlehInput | RekomendasiCreateManyDiprosesOlehInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    role?: string | null
    phoneNumber?: string | null
    jabatan?: string | null
    isActive?: boolean | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    role?: string | null
    phoneNumber?: string | null
    jabatan?: string | null
    isActive?: boolean | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type KegiatanRapatCreateWithoutDibuatOlehInput = {
    id?: string
    judul: string
    deskripsi: string
    tanggal: Date | string
    lokasi?: string | null
    aiModel?: string | null
    aiPromptHash?: string | null
    aiProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domainIsu?: DomainIsuCreateNestedOneWithoutKegiatanRapatInput
    rekomendasi?: RekomendasiCreateNestedManyWithoutKegiatanRapatInput
  }

  export type KegiatanRapatUncheckedCreateWithoutDibuatOlehInput = {
    id?: string
    judul: string
    deskripsi: string
    tanggal: Date | string
    lokasi?: string | null
    domainIsuId?: string | null
    aiModel?: string | null
    aiPromptHash?: string | null
    aiProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rekomendasi?: RekomendasiUncheckedCreateNestedManyWithoutKegiatanRapatInput
  }

  export type KegiatanRapatCreateOrConnectWithoutDibuatOlehInput = {
    where: KegiatanRapatWhereUniqueInput
    create: XOR<KegiatanRapatCreateWithoutDibuatOlehInput, KegiatanRapatUncheckedCreateWithoutDibuatOlehInput>
  }

  export type KegiatanRapatCreateManyDibuatOlehInputEnvelope = {
    data: KegiatanRapatCreateManyDibuatOlehInput | KegiatanRapatCreateManyDibuatOlehInput[]
    skipDuplicates?: boolean
  }

  export type MasukanWargaUpsertWithWhereUniqueWithoutDiverifikasiOlehInput = {
    where: MasukanWargaWhereUniqueInput
    update: XOR<MasukanWargaUpdateWithoutDiverifikasiOlehInput, MasukanWargaUncheckedUpdateWithoutDiverifikasiOlehInput>
    create: XOR<MasukanWargaCreateWithoutDiverifikasiOlehInput, MasukanWargaUncheckedCreateWithoutDiverifikasiOlehInput>
  }

  export type MasukanWargaUpdateWithWhereUniqueWithoutDiverifikasiOlehInput = {
    where: MasukanWargaWhereUniqueInput
    data: XOR<MasukanWargaUpdateWithoutDiverifikasiOlehInput, MasukanWargaUncheckedUpdateWithoutDiverifikasiOlehInput>
  }

  export type MasukanWargaUpdateManyWithWhereWithoutDiverifikasiOlehInput = {
    where: MasukanWargaScalarWhereInput
    data: XOR<MasukanWargaUpdateManyMutationInput, MasukanWargaUncheckedUpdateManyWithoutDiverifikasiOlehInput>
  }

  export type RekomendasiUpsertWithWhereUniqueWithoutDiprosesOlehInput = {
    where: RekomendasiWhereUniqueInput
    update: XOR<RekomendasiUpdateWithoutDiprosesOlehInput, RekomendasiUncheckedUpdateWithoutDiprosesOlehInput>
    create: XOR<RekomendasiCreateWithoutDiprosesOlehInput, RekomendasiUncheckedCreateWithoutDiprosesOlehInput>
  }

  export type RekomendasiUpdateWithWhereUniqueWithoutDiprosesOlehInput = {
    where: RekomendasiWhereUniqueInput
    data: XOR<RekomendasiUpdateWithoutDiprosesOlehInput, RekomendasiUncheckedUpdateWithoutDiprosesOlehInput>
  }

  export type RekomendasiUpdateManyWithWhereWithoutDiprosesOlehInput = {
    where: RekomendasiScalarWhereInput
    data: XOR<RekomendasiUpdateManyMutationInput, RekomendasiUncheckedUpdateManyWithoutDiprosesOlehInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    role?: StringNullableFilter<"Session"> | string | null
    phoneNumber?: StringNullableFilter<"Session"> | string | null
    jabatan?: StringNullableFilter<"Session"> | string | null
    isActive?: BoolNullableFilter<"Session"> | boolean | null
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type KegiatanRapatUpsertWithWhereUniqueWithoutDibuatOlehInput = {
    where: KegiatanRapatWhereUniqueInput
    update: XOR<KegiatanRapatUpdateWithoutDibuatOlehInput, KegiatanRapatUncheckedUpdateWithoutDibuatOlehInput>
    create: XOR<KegiatanRapatCreateWithoutDibuatOlehInput, KegiatanRapatUncheckedCreateWithoutDibuatOlehInput>
  }

  export type KegiatanRapatUpdateWithWhereUniqueWithoutDibuatOlehInput = {
    where: KegiatanRapatWhereUniqueInput
    data: XOR<KegiatanRapatUpdateWithoutDibuatOlehInput, KegiatanRapatUncheckedUpdateWithoutDibuatOlehInput>
  }

  export type KegiatanRapatUpdateManyWithWhereWithoutDibuatOlehInput = {
    where: KegiatanRapatScalarWhereInput
    data: XOR<KegiatanRapatUpdateManyMutationInput, KegiatanRapatUncheckedUpdateManyWithoutDibuatOlehInput>
  }

  export type DomainIsuCreateWithoutMasukanInput = {
    id?: string
    code: string
    nama: string
    deskripsi?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dataMaster?: DataMasterCreateNestedManyWithoutDomainIsuInput
    rekomendasi?: RekomendasiCreateNestedManyWithoutDomainIsuInput
    kegiatanRapat?: KegiatanRapatCreateNestedManyWithoutDomainIsuInput
  }

  export type DomainIsuUncheckedCreateWithoutMasukanInput = {
    id?: string
    code: string
    nama: string
    deskripsi?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dataMaster?: DataMasterUncheckedCreateNestedManyWithoutDomainIsuInput
    rekomendasi?: RekomendasiUncheckedCreateNestedManyWithoutDomainIsuInput
    kegiatanRapat?: KegiatanRapatUncheckedCreateNestedManyWithoutDomainIsuInput
  }

  export type DomainIsuCreateOrConnectWithoutMasukanInput = {
    where: DomainIsuWhereUniqueInput
    create: XOR<DomainIsuCreateWithoutMasukanInput, DomainIsuUncheckedCreateWithoutMasukanInput>
  }

  export type UserCreateWithoutMasukanVerifikasiInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
    rekomendasiDiproses?: RekomendasiCreateNestedManyWithoutDiprosesOlehInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    kegiatanRapat?: KegiatanRapatCreateNestedManyWithoutDibuatOlehInput
  }

  export type UserUncheckedCreateWithoutMasukanVerifikasiInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
    rekomendasiDiproses?: RekomendasiUncheckedCreateNestedManyWithoutDiprosesOlehInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    kegiatanRapat?: KegiatanRapatUncheckedCreateNestedManyWithoutDibuatOlehInput
  }

  export type UserCreateOrConnectWithoutMasukanVerifikasiInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMasukanVerifikasiInput, UserUncheckedCreateWithoutMasukanVerifikasiInput>
  }

  export type RekomendasiMasukanCreateWithoutMasukanInput = {
    rekomendasi: RekomendasiCreateNestedOneWithoutMasukanLinksInput
  }

  export type RekomendasiMasukanUncheckedCreateWithoutMasukanInput = {
    rekomendasiId: string
  }

  export type RekomendasiMasukanCreateOrConnectWithoutMasukanInput = {
    where: RekomendasiMasukanWhereUniqueInput
    create: XOR<RekomendasiMasukanCreateWithoutMasukanInput, RekomendasiMasukanUncheckedCreateWithoutMasukanInput>
  }

  export type RekomendasiMasukanCreateManyMasukanInputEnvelope = {
    data: RekomendasiMasukanCreateManyMasukanInput | RekomendasiMasukanCreateManyMasukanInput[]
    skipDuplicates?: boolean
  }

  export type DomainIsuUpsertWithoutMasukanInput = {
    update: XOR<DomainIsuUpdateWithoutMasukanInput, DomainIsuUncheckedUpdateWithoutMasukanInput>
    create: XOR<DomainIsuCreateWithoutMasukanInput, DomainIsuUncheckedCreateWithoutMasukanInput>
    where?: DomainIsuWhereInput
  }

  export type DomainIsuUpdateToOneWithWhereWithoutMasukanInput = {
    where?: DomainIsuWhereInput
    data: XOR<DomainIsuUpdateWithoutMasukanInput, DomainIsuUncheckedUpdateWithoutMasukanInput>
  }

  export type DomainIsuUpdateWithoutMasukanInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataMaster?: DataMasterUpdateManyWithoutDomainIsuNestedInput
    rekomendasi?: RekomendasiUpdateManyWithoutDomainIsuNestedInput
    kegiatanRapat?: KegiatanRapatUpdateManyWithoutDomainIsuNestedInput
  }

  export type DomainIsuUncheckedUpdateWithoutMasukanInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataMaster?: DataMasterUncheckedUpdateManyWithoutDomainIsuNestedInput
    rekomendasi?: RekomendasiUncheckedUpdateManyWithoutDomainIsuNestedInput
    kegiatanRapat?: KegiatanRapatUncheckedUpdateManyWithoutDomainIsuNestedInput
  }

  export type UserUpsertWithoutMasukanVerifikasiInput = {
    update: XOR<UserUpdateWithoutMasukanVerifikasiInput, UserUncheckedUpdateWithoutMasukanVerifikasiInput>
    create: XOR<UserCreateWithoutMasukanVerifikasiInput, UserUncheckedCreateWithoutMasukanVerifikasiInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMasukanVerifikasiInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMasukanVerifikasiInput, UserUncheckedUpdateWithoutMasukanVerifikasiInput>
  }

  export type UserUpdateWithoutMasukanVerifikasiInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    rekomendasiDiproses?: RekomendasiUpdateManyWithoutDiprosesOlehNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    kegiatanRapat?: KegiatanRapatUpdateManyWithoutDibuatOlehNestedInput
  }

  export type UserUncheckedUpdateWithoutMasukanVerifikasiInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    rekomendasiDiproses?: RekomendasiUncheckedUpdateManyWithoutDiprosesOlehNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    kegiatanRapat?: KegiatanRapatUncheckedUpdateManyWithoutDibuatOlehNestedInput
  }

  export type RekomendasiMasukanUpsertWithWhereUniqueWithoutMasukanInput = {
    where: RekomendasiMasukanWhereUniqueInput
    update: XOR<RekomendasiMasukanUpdateWithoutMasukanInput, RekomendasiMasukanUncheckedUpdateWithoutMasukanInput>
    create: XOR<RekomendasiMasukanCreateWithoutMasukanInput, RekomendasiMasukanUncheckedCreateWithoutMasukanInput>
  }

  export type RekomendasiMasukanUpdateWithWhereUniqueWithoutMasukanInput = {
    where: RekomendasiMasukanWhereUniqueInput
    data: XOR<RekomendasiMasukanUpdateWithoutMasukanInput, RekomendasiMasukanUncheckedUpdateWithoutMasukanInput>
  }

  export type RekomendasiMasukanUpdateManyWithWhereWithoutMasukanInput = {
    where: RekomendasiMasukanScalarWhereInput
    data: XOR<RekomendasiMasukanUpdateManyMutationInput, RekomendasiMasukanUncheckedUpdateManyWithoutMasukanInput>
  }

  export type RekomendasiMasukanScalarWhereInput = {
    AND?: RekomendasiMasukanScalarWhereInput | RekomendasiMasukanScalarWhereInput[]
    OR?: RekomendasiMasukanScalarWhereInput[]
    NOT?: RekomendasiMasukanScalarWhereInput | RekomendasiMasukanScalarWhereInput[]
    rekomendasiId?: StringFilter<"RekomendasiMasukan"> | string
    masukanId?: StringFilter<"RekomendasiMasukan"> | string
  }

  export type DomainIsuCreateWithoutDataMasterInput = {
    id?: string
    code: string
    nama: string
    deskripsi?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    masukan?: MasukanWargaCreateNestedManyWithoutDomainIsuInput
    rekomendasi?: RekomendasiCreateNestedManyWithoutDomainIsuInput
    kegiatanRapat?: KegiatanRapatCreateNestedManyWithoutDomainIsuInput
  }

  export type DomainIsuUncheckedCreateWithoutDataMasterInput = {
    id?: string
    code: string
    nama: string
    deskripsi?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    masukan?: MasukanWargaUncheckedCreateNestedManyWithoutDomainIsuInput
    rekomendasi?: RekomendasiUncheckedCreateNestedManyWithoutDomainIsuInput
    kegiatanRapat?: KegiatanRapatUncheckedCreateNestedManyWithoutDomainIsuInput
  }

  export type DomainIsuCreateOrConnectWithoutDataMasterInput = {
    where: DomainIsuWhereUniqueInput
    create: XOR<DomainIsuCreateWithoutDataMasterInput, DomainIsuUncheckedCreateWithoutDataMasterInput>
  }

  export type DomainIsuUpsertWithoutDataMasterInput = {
    update: XOR<DomainIsuUpdateWithoutDataMasterInput, DomainIsuUncheckedUpdateWithoutDataMasterInput>
    create: XOR<DomainIsuCreateWithoutDataMasterInput, DomainIsuUncheckedCreateWithoutDataMasterInput>
    where?: DomainIsuWhereInput
  }

  export type DomainIsuUpdateToOneWithWhereWithoutDataMasterInput = {
    where?: DomainIsuWhereInput
    data: XOR<DomainIsuUpdateWithoutDataMasterInput, DomainIsuUncheckedUpdateWithoutDataMasterInput>
  }

  export type DomainIsuUpdateWithoutDataMasterInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukan?: MasukanWargaUpdateManyWithoutDomainIsuNestedInput
    rekomendasi?: RekomendasiUpdateManyWithoutDomainIsuNestedInput
    kegiatanRapat?: KegiatanRapatUpdateManyWithoutDomainIsuNestedInput
  }

  export type DomainIsuUncheckedUpdateWithoutDataMasterInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukan?: MasukanWargaUncheckedUpdateManyWithoutDomainIsuNestedInput
    rekomendasi?: RekomendasiUncheckedUpdateManyWithoutDomainIsuNestedInput
    kegiatanRapat?: KegiatanRapatUncheckedUpdateManyWithoutDomainIsuNestedInput
  }

  export type KegiatanRapatCreateWithoutRekomendasiInput = {
    id?: string
    judul: string
    deskripsi: string
    tanggal: Date | string
    lokasi?: string | null
    aiModel?: string | null
    aiPromptHash?: string | null
    aiProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domainIsu?: DomainIsuCreateNestedOneWithoutKegiatanRapatInput
    dibuatOleh: UserCreateNestedOneWithoutKegiatanRapatInput
  }

  export type KegiatanRapatUncheckedCreateWithoutRekomendasiInput = {
    id?: string
    judul: string
    deskripsi: string
    tanggal: Date | string
    lokasi?: string | null
    domainIsuId?: string | null
    dibuatOlehId: string
    aiModel?: string | null
    aiPromptHash?: string | null
    aiProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KegiatanRapatCreateOrConnectWithoutRekomendasiInput = {
    where: KegiatanRapatWhereUniqueInput
    create: XOR<KegiatanRapatCreateWithoutRekomendasiInput, KegiatanRapatUncheckedCreateWithoutRekomendasiInput>
  }

  export type DomainIsuCreateWithoutRekomendasiInput = {
    id?: string
    code: string
    nama: string
    deskripsi?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    masukan?: MasukanWargaCreateNestedManyWithoutDomainIsuInput
    dataMaster?: DataMasterCreateNestedManyWithoutDomainIsuInput
    kegiatanRapat?: KegiatanRapatCreateNestedManyWithoutDomainIsuInput
  }

  export type DomainIsuUncheckedCreateWithoutRekomendasiInput = {
    id?: string
    code: string
    nama: string
    deskripsi?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    masukan?: MasukanWargaUncheckedCreateNestedManyWithoutDomainIsuInput
    dataMaster?: DataMasterUncheckedCreateNestedManyWithoutDomainIsuInput
    kegiatanRapat?: KegiatanRapatUncheckedCreateNestedManyWithoutDomainIsuInput
  }

  export type DomainIsuCreateOrConnectWithoutRekomendasiInput = {
    where: DomainIsuWhereUniqueInput
    create: XOR<DomainIsuCreateWithoutRekomendasiInput, DomainIsuUncheckedCreateWithoutRekomendasiInput>
  }

  export type UserCreateWithoutRekomendasiDiprosesInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
    masukanVerifikasi?: MasukanWargaCreateNestedManyWithoutDiverifikasiOlehInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    kegiatanRapat?: KegiatanRapatCreateNestedManyWithoutDibuatOlehInput
  }

  export type UserUncheckedCreateWithoutRekomendasiDiprosesInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
    masukanVerifikasi?: MasukanWargaUncheckedCreateNestedManyWithoutDiverifikasiOlehInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    kegiatanRapat?: KegiatanRapatUncheckedCreateNestedManyWithoutDibuatOlehInput
  }

  export type UserCreateOrConnectWithoutRekomendasiDiprosesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRekomendasiDiprosesInput, UserUncheckedCreateWithoutRekomendasiDiprosesInput>
  }

  export type RekomendasiMasukanCreateWithoutRekomendasiInput = {
    masukan: MasukanWargaCreateNestedOneWithoutRekomendasiLinksInput
  }

  export type RekomendasiMasukanUncheckedCreateWithoutRekomendasiInput = {
    masukanId: string
  }

  export type RekomendasiMasukanCreateOrConnectWithoutRekomendasiInput = {
    where: RekomendasiMasukanWhereUniqueInput
    create: XOR<RekomendasiMasukanCreateWithoutRekomendasiInput, RekomendasiMasukanUncheckedCreateWithoutRekomendasiInput>
  }

  export type RekomendasiMasukanCreateManyRekomendasiInputEnvelope = {
    data: RekomendasiMasukanCreateManyRekomendasiInput | RekomendasiMasukanCreateManyRekomendasiInput[]
    skipDuplicates?: boolean
  }

  export type KegiatanRapatUpsertWithoutRekomendasiInput = {
    update: XOR<KegiatanRapatUpdateWithoutRekomendasiInput, KegiatanRapatUncheckedUpdateWithoutRekomendasiInput>
    create: XOR<KegiatanRapatCreateWithoutRekomendasiInput, KegiatanRapatUncheckedCreateWithoutRekomendasiInput>
    where?: KegiatanRapatWhereInput
  }

  export type KegiatanRapatUpdateToOneWithWhereWithoutRekomendasiInput = {
    where?: KegiatanRapatWhereInput
    data: XOR<KegiatanRapatUpdateWithoutRekomendasiInput, KegiatanRapatUncheckedUpdateWithoutRekomendasiInput>
  }

  export type KegiatanRapatUpdateWithoutRekomendasiInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptHash?: NullableStringFieldUpdateOperationsInput | string | null
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainIsu?: DomainIsuUpdateOneWithoutKegiatanRapatNestedInput
    dibuatOleh?: UserUpdateOneRequiredWithoutKegiatanRapatNestedInput
  }

  export type KegiatanRapatUncheckedUpdateWithoutRekomendasiInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    domainIsuId?: NullableStringFieldUpdateOperationsInput | string | null
    dibuatOlehId?: StringFieldUpdateOperationsInput | string
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptHash?: NullableStringFieldUpdateOperationsInput | string | null
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainIsuUpsertWithoutRekomendasiInput = {
    update: XOR<DomainIsuUpdateWithoutRekomendasiInput, DomainIsuUncheckedUpdateWithoutRekomendasiInput>
    create: XOR<DomainIsuCreateWithoutRekomendasiInput, DomainIsuUncheckedCreateWithoutRekomendasiInput>
    where?: DomainIsuWhereInput
  }

  export type DomainIsuUpdateToOneWithWhereWithoutRekomendasiInput = {
    where?: DomainIsuWhereInput
    data: XOR<DomainIsuUpdateWithoutRekomendasiInput, DomainIsuUncheckedUpdateWithoutRekomendasiInput>
  }

  export type DomainIsuUpdateWithoutRekomendasiInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukan?: MasukanWargaUpdateManyWithoutDomainIsuNestedInput
    dataMaster?: DataMasterUpdateManyWithoutDomainIsuNestedInput
    kegiatanRapat?: KegiatanRapatUpdateManyWithoutDomainIsuNestedInput
  }

  export type DomainIsuUncheckedUpdateWithoutRekomendasiInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukan?: MasukanWargaUncheckedUpdateManyWithoutDomainIsuNestedInput
    dataMaster?: DataMasterUncheckedUpdateManyWithoutDomainIsuNestedInput
    kegiatanRapat?: KegiatanRapatUncheckedUpdateManyWithoutDomainIsuNestedInput
  }

  export type UserUpsertWithoutRekomendasiDiprosesInput = {
    update: XOR<UserUpdateWithoutRekomendasiDiprosesInput, UserUncheckedUpdateWithoutRekomendasiDiprosesInput>
    create: XOR<UserCreateWithoutRekomendasiDiprosesInput, UserUncheckedCreateWithoutRekomendasiDiprosesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRekomendasiDiprosesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRekomendasiDiprosesInput, UserUncheckedUpdateWithoutRekomendasiDiprosesInput>
  }

  export type UserUpdateWithoutRekomendasiDiprosesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    masukanVerifikasi?: MasukanWargaUpdateManyWithoutDiverifikasiOlehNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    kegiatanRapat?: KegiatanRapatUpdateManyWithoutDibuatOlehNestedInput
  }

  export type UserUncheckedUpdateWithoutRekomendasiDiprosesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    masukanVerifikasi?: MasukanWargaUncheckedUpdateManyWithoutDiverifikasiOlehNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    kegiatanRapat?: KegiatanRapatUncheckedUpdateManyWithoutDibuatOlehNestedInput
  }

  export type RekomendasiMasukanUpsertWithWhereUniqueWithoutRekomendasiInput = {
    where: RekomendasiMasukanWhereUniqueInput
    update: XOR<RekomendasiMasukanUpdateWithoutRekomendasiInput, RekomendasiMasukanUncheckedUpdateWithoutRekomendasiInput>
    create: XOR<RekomendasiMasukanCreateWithoutRekomendasiInput, RekomendasiMasukanUncheckedCreateWithoutRekomendasiInput>
  }

  export type RekomendasiMasukanUpdateWithWhereUniqueWithoutRekomendasiInput = {
    where: RekomendasiMasukanWhereUniqueInput
    data: XOR<RekomendasiMasukanUpdateWithoutRekomendasiInput, RekomendasiMasukanUncheckedUpdateWithoutRekomendasiInput>
  }

  export type RekomendasiMasukanUpdateManyWithWhereWithoutRekomendasiInput = {
    where: RekomendasiMasukanScalarWhereInput
    data: XOR<RekomendasiMasukanUpdateManyMutationInput, RekomendasiMasukanUncheckedUpdateManyWithoutRekomendasiInput>
  }

  export type RekomendasiCreateWithoutMasukanLinksInput = {
    id?: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    kegiatanRapat: KegiatanRapatCreateNestedOneWithoutRekomendasiInput
    domainIsu: DomainIsuCreateNestedOneWithoutRekomendasiInput
    diprosesOleh?: UserCreateNestedOneWithoutRekomendasiDiprosesInput
  }

  export type RekomendasiUncheckedCreateWithoutMasukanLinksInput = {
    id?: string
    kegiatanRapatId: string
    domainIsuId: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RekomendasiCreateOrConnectWithoutMasukanLinksInput = {
    where: RekomendasiWhereUniqueInput
    create: XOR<RekomendasiCreateWithoutMasukanLinksInput, RekomendasiUncheckedCreateWithoutMasukanLinksInput>
  }

  export type MasukanWargaCreateWithoutRekomendasiLinksInput = {
    id?: string
    judul: string
    deskripsi: string
    lokasiRt: number
    lokasiRw: number
    status?: $Enums.StatusMasukan
    createdAt?: Date | string
    updatedAt?: Date | string
    domainIsu: DomainIsuCreateNestedOneWithoutMasukanInput
    diverifikasiOleh?: UserCreateNestedOneWithoutMasukanVerifikasiInput
  }

  export type MasukanWargaUncheckedCreateWithoutRekomendasiLinksInput = {
    id?: string
    judul: string
    deskripsi: string
    lokasiRt: number
    lokasiRw: number
    domainIsuId: string
    status?: $Enums.StatusMasukan
    diverifikasiOlehId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MasukanWargaCreateOrConnectWithoutRekomendasiLinksInput = {
    where: MasukanWargaWhereUniqueInput
    create: XOR<MasukanWargaCreateWithoutRekomendasiLinksInput, MasukanWargaUncheckedCreateWithoutRekomendasiLinksInput>
  }

  export type RekomendasiUpsertWithoutMasukanLinksInput = {
    update: XOR<RekomendasiUpdateWithoutMasukanLinksInput, RekomendasiUncheckedUpdateWithoutMasukanLinksInput>
    create: XOR<RekomendasiCreateWithoutMasukanLinksInput, RekomendasiUncheckedCreateWithoutMasukanLinksInput>
    where?: RekomendasiWhereInput
  }

  export type RekomendasiUpdateToOneWithWhereWithoutMasukanLinksInput = {
    where?: RekomendasiWhereInput
    data: XOR<RekomendasiUpdateWithoutMasukanLinksInput, RekomendasiUncheckedUpdateWithoutMasukanLinksInput>
  }

  export type RekomendasiUpdateWithoutMasukanLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kegiatanRapat?: KegiatanRapatUpdateOneRequiredWithoutRekomendasiNestedInput
    domainIsu?: DomainIsuUpdateOneRequiredWithoutRekomendasiNestedInput
    diprosesOleh?: UserUpdateOneWithoutRekomendasiDiprosesNestedInput
  }

  export type RekomendasiUncheckedUpdateWithoutMasukanLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    kegiatanRapatId?: StringFieldUpdateOperationsInput | string
    domainIsuId?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasukanWargaUpsertWithoutRekomendasiLinksInput = {
    update: XOR<MasukanWargaUpdateWithoutRekomendasiLinksInput, MasukanWargaUncheckedUpdateWithoutRekomendasiLinksInput>
    create: XOR<MasukanWargaCreateWithoutRekomendasiLinksInput, MasukanWargaUncheckedCreateWithoutRekomendasiLinksInput>
    where?: MasukanWargaWhereInput
  }

  export type MasukanWargaUpdateToOneWithWhereWithoutRekomendasiLinksInput = {
    where?: MasukanWargaWhereInput
    data: XOR<MasukanWargaUpdateWithoutRekomendasiLinksInput, MasukanWargaUncheckedUpdateWithoutRekomendasiLinksInput>
  }

  export type MasukanWargaUpdateWithoutRekomendasiLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    lokasiRt?: IntFieldUpdateOperationsInput | number
    lokasiRw?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusMasukanFieldUpdateOperationsInput | $Enums.StatusMasukan
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainIsu?: DomainIsuUpdateOneRequiredWithoutMasukanNestedInput
    diverifikasiOleh?: UserUpdateOneWithoutMasukanVerifikasiNestedInput
  }

  export type MasukanWargaUncheckedUpdateWithoutRekomendasiLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    lokasiRt?: IntFieldUpdateOperationsInput | number
    lokasiRw?: IntFieldUpdateOperationsInput | number
    domainIsuId?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusMasukanFieldUpdateOperationsInput | $Enums.StatusMasukan
    diverifikasiOlehId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
    masukanVerifikasi?: MasukanWargaCreateNestedManyWithoutDiverifikasiOlehInput
    rekomendasiDiproses?: RekomendasiCreateNestedManyWithoutDiprosesOlehInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    kegiatanRapat?: KegiatanRapatCreateNestedManyWithoutDibuatOlehInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
    masukanVerifikasi?: MasukanWargaUncheckedCreateNestedManyWithoutDiverifikasiOlehInput
    rekomendasiDiproses?: RekomendasiUncheckedCreateNestedManyWithoutDiprosesOlehInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    kegiatanRapat?: KegiatanRapatUncheckedCreateNestedManyWithoutDibuatOlehInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    masukanVerifikasi?: MasukanWargaUpdateManyWithoutDiverifikasiOlehNestedInput
    rekomendasiDiproses?: RekomendasiUpdateManyWithoutDiprosesOlehNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    kegiatanRapat?: KegiatanRapatUpdateManyWithoutDibuatOlehNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    masukanVerifikasi?: MasukanWargaUncheckedUpdateManyWithoutDiverifikasiOlehNestedInput
    rekomendasiDiproses?: RekomendasiUncheckedUpdateManyWithoutDiprosesOlehNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    kegiatanRapat?: KegiatanRapatUncheckedUpdateManyWithoutDibuatOlehNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
    masukanVerifikasi?: MasukanWargaCreateNestedManyWithoutDiverifikasiOlehInput
    rekomendasiDiproses?: RekomendasiCreateNestedManyWithoutDiprosesOlehInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    kegiatanRapat?: KegiatanRapatCreateNestedManyWithoutDibuatOlehInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
    masukanVerifikasi?: MasukanWargaUncheckedCreateNestedManyWithoutDiverifikasiOlehInput
    rekomendasiDiproses?: RekomendasiUncheckedCreateNestedManyWithoutDiprosesOlehInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    kegiatanRapat?: KegiatanRapatUncheckedCreateNestedManyWithoutDibuatOlehInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    masukanVerifikasi?: MasukanWargaUpdateManyWithoutDiverifikasiOlehNestedInput
    rekomendasiDiproses?: RekomendasiUpdateManyWithoutDiprosesOlehNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    kegiatanRapat?: KegiatanRapatUpdateManyWithoutDibuatOlehNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    masukanVerifikasi?: MasukanWargaUncheckedUpdateManyWithoutDiverifikasiOlehNestedInput
    rekomendasiDiproses?: RekomendasiUncheckedUpdateManyWithoutDiprosesOlehNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    kegiatanRapat?: KegiatanRapatUncheckedUpdateManyWithoutDibuatOlehNestedInput
  }

  export type DomainIsuCreateWithoutKegiatanRapatInput = {
    id?: string
    code: string
    nama: string
    deskripsi?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    masukan?: MasukanWargaCreateNestedManyWithoutDomainIsuInput
    dataMaster?: DataMasterCreateNestedManyWithoutDomainIsuInput
    rekomendasi?: RekomendasiCreateNestedManyWithoutDomainIsuInput
  }

  export type DomainIsuUncheckedCreateWithoutKegiatanRapatInput = {
    id?: string
    code: string
    nama: string
    deskripsi?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    masukan?: MasukanWargaUncheckedCreateNestedManyWithoutDomainIsuInput
    dataMaster?: DataMasterUncheckedCreateNestedManyWithoutDomainIsuInput
    rekomendasi?: RekomendasiUncheckedCreateNestedManyWithoutDomainIsuInput
  }

  export type DomainIsuCreateOrConnectWithoutKegiatanRapatInput = {
    where: DomainIsuWhereUniqueInput
    create: XOR<DomainIsuCreateWithoutKegiatanRapatInput, DomainIsuUncheckedCreateWithoutKegiatanRapatInput>
  }

  export type UserCreateWithoutKegiatanRapatInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
    masukanVerifikasi?: MasukanWargaCreateNestedManyWithoutDiverifikasiOlehInput
    rekomendasiDiproses?: RekomendasiCreateNestedManyWithoutDiprosesOlehInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutKegiatanRapatInput = {
    id?: string
    name: string
    email: string
    jabatan?: string | null
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    emailVerified?: boolean
    image?: string | null
    phoneNumber?: string | null
    masukanVerifikasi?: MasukanWargaUncheckedCreateNestedManyWithoutDiverifikasiOlehInput
    rekomendasiDiproses?: RekomendasiUncheckedCreateNestedManyWithoutDiprosesOlehInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutKegiatanRapatInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutKegiatanRapatInput, UserUncheckedCreateWithoutKegiatanRapatInput>
  }

  export type RekomendasiCreateWithoutKegiatanRapatInput = {
    id?: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    domainIsu: DomainIsuCreateNestedOneWithoutRekomendasiInput
    diprosesOleh?: UserCreateNestedOneWithoutRekomendasiDiprosesInput
    masukanLinks?: RekomendasiMasukanCreateNestedManyWithoutRekomendasiInput
  }

  export type RekomendasiUncheckedCreateWithoutKegiatanRapatInput = {
    id?: string
    domainIsuId: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    masukanLinks?: RekomendasiMasukanUncheckedCreateNestedManyWithoutRekomendasiInput
  }

  export type RekomendasiCreateOrConnectWithoutKegiatanRapatInput = {
    where: RekomendasiWhereUniqueInput
    create: XOR<RekomendasiCreateWithoutKegiatanRapatInput, RekomendasiUncheckedCreateWithoutKegiatanRapatInput>
  }

  export type RekomendasiCreateManyKegiatanRapatInputEnvelope = {
    data: RekomendasiCreateManyKegiatanRapatInput | RekomendasiCreateManyKegiatanRapatInput[]
    skipDuplicates?: boolean
  }

  export type DomainIsuUpsertWithoutKegiatanRapatInput = {
    update: XOR<DomainIsuUpdateWithoutKegiatanRapatInput, DomainIsuUncheckedUpdateWithoutKegiatanRapatInput>
    create: XOR<DomainIsuCreateWithoutKegiatanRapatInput, DomainIsuUncheckedCreateWithoutKegiatanRapatInput>
    where?: DomainIsuWhereInput
  }

  export type DomainIsuUpdateToOneWithWhereWithoutKegiatanRapatInput = {
    where?: DomainIsuWhereInput
    data: XOR<DomainIsuUpdateWithoutKegiatanRapatInput, DomainIsuUncheckedUpdateWithoutKegiatanRapatInput>
  }

  export type DomainIsuUpdateWithoutKegiatanRapatInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukan?: MasukanWargaUpdateManyWithoutDomainIsuNestedInput
    dataMaster?: DataMasterUpdateManyWithoutDomainIsuNestedInput
    rekomendasi?: RekomendasiUpdateManyWithoutDomainIsuNestedInput
  }

  export type DomainIsuUncheckedUpdateWithoutKegiatanRapatInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukan?: MasukanWargaUncheckedUpdateManyWithoutDomainIsuNestedInput
    dataMaster?: DataMasterUncheckedUpdateManyWithoutDomainIsuNestedInput
    rekomendasi?: RekomendasiUncheckedUpdateManyWithoutDomainIsuNestedInput
  }

  export type UserUpsertWithoutKegiatanRapatInput = {
    update: XOR<UserUpdateWithoutKegiatanRapatInput, UserUncheckedUpdateWithoutKegiatanRapatInput>
    create: XOR<UserCreateWithoutKegiatanRapatInput, UserUncheckedCreateWithoutKegiatanRapatInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutKegiatanRapatInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutKegiatanRapatInput, UserUncheckedUpdateWithoutKegiatanRapatInput>
  }

  export type UserUpdateWithoutKegiatanRapatInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    masukanVerifikasi?: MasukanWargaUpdateManyWithoutDiverifikasiOlehNestedInput
    rekomendasiDiproses?: RekomendasiUpdateManyWithoutDiprosesOlehNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutKegiatanRapatInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    masukanVerifikasi?: MasukanWargaUncheckedUpdateManyWithoutDiverifikasiOlehNestedInput
    rekomendasiDiproses?: RekomendasiUncheckedUpdateManyWithoutDiprosesOlehNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RekomendasiUpsertWithWhereUniqueWithoutKegiatanRapatInput = {
    where: RekomendasiWhereUniqueInput
    update: XOR<RekomendasiUpdateWithoutKegiatanRapatInput, RekomendasiUncheckedUpdateWithoutKegiatanRapatInput>
    create: XOR<RekomendasiCreateWithoutKegiatanRapatInput, RekomendasiUncheckedCreateWithoutKegiatanRapatInput>
  }

  export type RekomendasiUpdateWithWhereUniqueWithoutKegiatanRapatInput = {
    where: RekomendasiWhereUniqueInput
    data: XOR<RekomendasiUpdateWithoutKegiatanRapatInput, RekomendasiUncheckedUpdateWithoutKegiatanRapatInput>
  }

  export type RekomendasiUpdateManyWithWhereWithoutKegiatanRapatInput = {
    where: RekomendasiScalarWhereInput
    data: XOR<RekomendasiUpdateManyMutationInput, RekomendasiUncheckedUpdateManyWithoutKegiatanRapatInput>
  }

  export type MasukanWargaCreateManyDomainIsuInput = {
    id?: string
    judul: string
    deskripsi: string
    lokasiRt: number
    lokasiRw: number
    status?: $Enums.StatusMasukan
    diverifikasiOlehId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DataMasterCreateManyDomainIsuInput = {
    id?: string
    namaAtribut: string
    nilai: string
    jumlah?: number | null
    lokasiRt?: number | null
    lokasiRw?: number | null
    sumberData?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RekomendasiCreateManyDomainIsuInput = {
    id?: string
    kegiatanRapatId: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KegiatanRapatCreateManyDomainIsuInput = {
    id?: string
    judul: string
    deskripsi: string
    tanggal: Date | string
    lokasi?: string | null
    dibuatOlehId: string
    aiModel?: string | null
    aiPromptHash?: string | null
    aiProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MasukanWargaUpdateWithoutDomainIsuInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    lokasiRt?: IntFieldUpdateOperationsInput | number
    lokasiRw?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusMasukanFieldUpdateOperationsInput | $Enums.StatusMasukan
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diverifikasiOleh?: UserUpdateOneWithoutMasukanVerifikasiNestedInput
    rekomendasiLinks?: RekomendasiMasukanUpdateManyWithoutMasukanNestedInput
  }

  export type MasukanWargaUncheckedUpdateWithoutDomainIsuInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    lokasiRt?: IntFieldUpdateOperationsInput | number
    lokasiRw?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusMasukanFieldUpdateOperationsInput | $Enums.StatusMasukan
    diverifikasiOlehId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rekomendasiLinks?: RekomendasiMasukanUncheckedUpdateManyWithoutMasukanNestedInput
  }

  export type MasukanWargaUncheckedUpdateManyWithoutDomainIsuInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    lokasiRt?: IntFieldUpdateOperationsInput | number
    lokasiRw?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusMasukanFieldUpdateOperationsInput | $Enums.StatusMasukan
    diverifikasiOlehId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataMasterUpdateWithoutDomainIsuInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRt?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRw?: NullableIntFieldUpdateOperationsInput | number | null
    sumberData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataMasterUncheckedUpdateWithoutDomainIsuInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRt?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRw?: NullableIntFieldUpdateOperationsInput | number | null
    sumberData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataMasterUncheckedUpdateManyWithoutDomainIsuInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRt?: NullableIntFieldUpdateOperationsInput | number | null
    lokasiRw?: NullableIntFieldUpdateOperationsInput | number | null
    sumberData?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RekomendasiUpdateWithoutDomainIsuInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kegiatanRapat?: KegiatanRapatUpdateOneRequiredWithoutRekomendasiNestedInput
    diprosesOleh?: UserUpdateOneWithoutRekomendasiDiprosesNestedInput
    masukanLinks?: RekomendasiMasukanUpdateManyWithoutRekomendasiNestedInput
  }

  export type RekomendasiUncheckedUpdateWithoutDomainIsuInput = {
    id?: StringFieldUpdateOperationsInput | string
    kegiatanRapatId?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukanLinks?: RekomendasiMasukanUncheckedUpdateManyWithoutRekomendasiNestedInput
  }

  export type RekomendasiUncheckedUpdateManyWithoutDomainIsuInput = {
    id?: StringFieldUpdateOperationsInput | string
    kegiatanRapatId?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KegiatanRapatUpdateWithoutDomainIsuInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptHash?: NullableStringFieldUpdateOperationsInput | string | null
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dibuatOleh?: UserUpdateOneRequiredWithoutKegiatanRapatNestedInput
    rekomendasi?: RekomendasiUpdateManyWithoutKegiatanRapatNestedInput
  }

  export type KegiatanRapatUncheckedUpdateWithoutDomainIsuInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    dibuatOlehId?: StringFieldUpdateOperationsInput | string
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptHash?: NullableStringFieldUpdateOperationsInput | string | null
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rekomendasi?: RekomendasiUncheckedUpdateManyWithoutKegiatanRapatNestedInput
  }

  export type KegiatanRapatUncheckedUpdateManyWithoutDomainIsuInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    dibuatOlehId?: StringFieldUpdateOperationsInput | string
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptHash?: NullableStringFieldUpdateOperationsInput | string | null
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasukanWargaCreateManyDiverifikasiOlehInput = {
    id?: string
    judul: string
    deskripsi: string
    lokasiRt: number
    lokasiRw: number
    domainIsuId: string
    status?: $Enums.StatusMasukan
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RekomendasiCreateManyDiprosesOlehInput = {
    id?: string
    kegiatanRapatId: string
    domainIsuId: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    role?: string | null
    phoneNumber?: string | null
    jabatan?: string | null
    isActive?: boolean | null
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KegiatanRapatCreateManyDibuatOlehInput = {
    id?: string
    judul: string
    deskripsi: string
    tanggal: Date | string
    lokasi?: string | null
    domainIsuId?: string | null
    aiModel?: string | null
    aiPromptHash?: string | null
    aiProcessedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MasukanWargaUpdateWithoutDiverifikasiOlehInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    lokasiRt?: IntFieldUpdateOperationsInput | number
    lokasiRw?: IntFieldUpdateOperationsInput | number
    status?: EnumStatusMasukanFieldUpdateOperationsInput | $Enums.StatusMasukan
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainIsu?: DomainIsuUpdateOneRequiredWithoutMasukanNestedInput
    rekomendasiLinks?: RekomendasiMasukanUpdateManyWithoutMasukanNestedInput
  }

  export type MasukanWargaUncheckedUpdateWithoutDiverifikasiOlehInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    lokasiRt?: IntFieldUpdateOperationsInput | number
    lokasiRw?: IntFieldUpdateOperationsInput | number
    domainIsuId?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusMasukanFieldUpdateOperationsInput | $Enums.StatusMasukan
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rekomendasiLinks?: RekomendasiMasukanUncheckedUpdateManyWithoutMasukanNestedInput
  }

  export type MasukanWargaUncheckedUpdateManyWithoutDiverifikasiOlehInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    lokasiRt?: IntFieldUpdateOperationsInput | number
    lokasiRw?: IntFieldUpdateOperationsInput | number
    domainIsuId?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusMasukanFieldUpdateOperationsInput | $Enums.StatusMasukan
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RekomendasiUpdateWithoutDiprosesOlehInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kegiatanRapat?: KegiatanRapatUpdateOneRequiredWithoutRekomendasiNestedInput
    domainIsu?: DomainIsuUpdateOneRequiredWithoutRekomendasiNestedInput
    masukanLinks?: RekomendasiMasukanUpdateManyWithoutRekomendasiNestedInput
  }

  export type RekomendasiUncheckedUpdateWithoutDiprosesOlehInput = {
    id?: StringFieldUpdateOperationsInput | string
    kegiatanRapatId?: StringFieldUpdateOperationsInput | string
    domainIsuId?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukanLinks?: RekomendasiMasukanUncheckedUpdateManyWithoutRekomendasiNestedInput
  }

  export type RekomendasiUncheckedUpdateManyWithoutDiprosesOlehInput = {
    id?: StringFieldUpdateOperationsInput | string
    kegiatanRapatId?: StringFieldUpdateOperationsInput | string
    domainIsuId?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    jabatan?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KegiatanRapatUpdateWithoutDibuatOlehInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptHash?: NullableStringFieldUpdateOperationsInput | string | null
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainIsu?: DomainIsuUpdateOneWithoutKegiatanRapatNestedInput
    rekomendasi?: RekomendasiUpdateManyWithoutKegiatanRapatNestedInput
  }

  export type KegiatanRapatUncheckedUpdateWithoutDibuatOlehInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    domainIsuId?: NullableStringFieldUpdateOperationsInput | string | null
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptHash?: NullableStringFieldUpdateOperationsInput | string | null
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rekomendasi?: RekomendasiUncheckedUpdateManyWithoutKegiatanRapatNestedInput
  }

  export type KegiatanRapatUncheckedUpdateManyWithoutDibuatOlehInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    lokasi?: NullableStringFieldUpdateOperationsInput | string | null
    domainIsuId?: NullableStringFieldUpdateOperationsInput | string | null
    aiModel?: NullableStringFieldUpdateOperationsInput | string | null
    aiPromptHash?: NullableStringFieldUpdateOperationsInput | string | null
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RekomendasiMasukanCreateManyMasukanInput = {
    rekomendasiId: string
  }

  export type RekomendasiMasukanUpdateWithoutMasukanInput = {
    rekomendasi?: RekomendasiUpdateOneRequiredWithoutMasukanLinksNestedInput
  }

  export type RekomendasiMasukanUncheckedUpdateWithoutMasukanInput = {
    rekomendasiId?: StringFieldUpdateOperationsInput | string
  }

  export type RekomendasiMasukanUncheckedUpdateManyWithoutMasukanInput = {
    rekomendasiId?: StringFieldUpdateOperationsInput | string
  }

  export type RekomendasiMasukanCreateManyRekomendasiInput = {
    masukanId: string
  }

  export type RekomendasiMasukanUpdateWithoutRekomendasiInput = {
    masukan?: MasukanWargaUpdateOneRequiredWithoutRekomendasiLinksNestedInput
  }

  export type RekomendasiMasukanUncheckedUpdateWithoutRekomendasiInput = {
    masukanId?: StringFieldUpdateOperationsInput | string
  }

  export type RekomendasiMasukanUncheckedUpdateManyWithoutRekomendasiInput = {
    masukanId?: StringFieldUpdateOperationsInput | string
  }

  export type RekomendasiCreateManyKegiatanRapatInput = {
    id?: string
    domainIsuId: string
    judul: string
    ringkasan: string
    deskripsi: string
    skorPrioritas: number
    status?: $Enums.StatusRekomendasi
    laporanLengkap: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RekomendasiUpdateWithoutKegiatanRapatInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainIsu?: DomainIsuUpdateOneRequiredWithoutRekomendasiNestedInput
    diprosesOleh?: UserUpdateOneWithoutRekomendasiDiprosesNestedInput
    masukanLinks?: RekomendasiMasukanUpdateManyWithoutRekomendasiNestedInput
  }

  export type RekomendasiUncheckedUpdateWithoutKegiatanRapatInput = {
    id?: StringFieldUpdateOperationsInput | string
    domainIsuId?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukanLinks?: RekomendasiMasukanUncheckedUpdateManyWithoutRekomendasiNestedInput
  }

  export type RekomendasiUncheckedUpdateManyWithoutKegiatanRapatInput = {
    id?: StringFieldUpdateOperationsInput | string
    domainIsuId?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    ringkasan?: StringFieldUpdateOperationsInput | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    skorPrioritas?: FloatFieldUpdateOperationsInput | number
    status?: EnumStatusRekomendasiFieldUpdateOperationsInput | $Enums.StatusRekomendasi
    laporanLengkap?: JsonNullValueInput | InputJsonValue
    diprosesOlehId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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