
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Kategori
 * 
 */
export type Kategori = $Result.DefaultSelection<Prisma.$KategoriPayload>
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
 * Enums
 */
export namespace $Enums {
  export const StatusKategori: {
  AKTIF: 'AKTIF',
  NON_AKTIF: 'NON_AKTIF'
};

export type StatusKategori = (typeof StatusKategori)[keyof typeof StatusKategori]


export const Role: {
  ADMIN: 'ADMIN',
  PERANGKAT_DESA: 'PERANGKAT_DESA',
  LURAH: 'LURAH'
};

export type Role = (typeof Role)[keyof typeof Role]


export const MasukanStatus: {
  MENUNGGU_VERIFIKASI: 'MENUNGGU_VERIFIKASI',
  DITERIMA: 'DITERIMA',
  DITOLAK: 'DITOLAK'
};

export type MasukanStatus = (typeof MasukanStatus)[keyof typeof MasukanStatus]


export const JenisDataMaster: {
  KEPENDUDUKAN: 'KEPENDUDUKAN',
  INFRASTRUKTUR: 'INFRASTRUKTUR',
  EKONOMI: 'EKONOMI',
  KESEHATAN: 'KESEHATAN',
  PENDIDIKAN: 'PENDIDIKAN',
  KEAMANAN: 'KEAMANAN',
  LINGKUNGAN: 'LINGKUNGAN',
  SOSIAL_BUDAYA: 'SOSIAL_BUDAYA',
  PEMERINTAHAN: 'PEMERINTAHAN',
  TEKNOLOGI: 'TEKNOLOGI'
};

export type JenisDataMaster = (typeof JenisDataMaster)[keyof typeof JenisDataMaster]

}

export type StatusKategori = $Enums.StatusKategori

export const StatusKategori: typeof $Enums.StatusKategori

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type MasukanStatus = $Enums.MasukanStatus

export const MasukanStatus: typeof $Enums.MasukanStatus

export type JenisDataMaster = $Enums.JenisDataMaster

export const JenisDataMaster: typeof $Enums.JenisDataMaster

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kategori`: Exposes CRUD operations for the **Kategori** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Kategoris
    * const kategoris = await prisma.kategori.findMany()
    * ```
    */
  get kategori(): Prisma.KategoriDelegate<ExtArgs, ClientOptions>;

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
    User: 'User',
    Kategori: 'Kategori',
    MasukanWarga: 'MasukanWarga',
    DataMaster: 'DataMaster',
    Rekomendasi: 'Rekomendasi',
    RekomendasiMasukan: 'RekomendasiMasukan',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification'
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
      modelProps: "user" | "kategori" | "masukanWarga" | "dataMaster" | "rekomendasi" | "rekomendasiMasukan" | "session" | "account" | "verification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      Kategori: {
        payload: Prisma.$KategoriPayload<ExtArgs>
        fields: Prisma.KategoriFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KategoriFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KategoriFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>
          }
          findFirst: {
            args: Prisma.KategoriFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KategoriFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>
          }
          findMany: {
            args: Prisma.KategoriFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>[]
          }
          create: {
            args: Prisma.KategoriCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>
          }
          createMany: {
            args: Prisma.KategoriCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KategoriCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>[]
          }
          delete: {
            args: Prisma.KategoriDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>
          }
          update: {
            args: Prisma.KategoriUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>
          }
          deleteMany: {
            args: Prisma.KategoriDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KategoriUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KategoriUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>[]
          }
          upsert: {
            args: Prisma.KategoriUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KategoriPayload>
          }
          aggregate: {
            args: Prisma.KategoriAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKategori>
          }
          groupBy: {
            args: Prisma.KategoriGroupByArgs<ExtArgs>
            result: $Utils.Optional<KategoriGroupByOutputType>[]
          }
          count: {
            args: Prisma.KategoriCountArgs<ExtArgs>
            result: $Utils.Optional<KategoriCountAggregateOutputType> | number
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
    user?: UserOmit
    kategori?: KategoriOmit
    masukanWarga?: MasukanWargaOmit
    dataMaster?: DataMasterOmit
    rekomendasi?: RekomendasiOmit
    rekomendasiMasukan?: RekomendasiMasukanOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    masukanVerifikasi: number
    rekomendasiDiproses: number
    dataMasterUpdate: number
    sessions: number
    accounts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    masukanVerifikasi?: boolean | UserCountOutputTypeCountMasukanVerifikasiArgs
    rekomendasiDiproses?: boolean | UserCountOutputTypeCountRekomendasiDiprosesArgs
    dataMasterUpdate?: boolean | UserCountOutputTypeCountDataMasterUpdateArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
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
  export type UserCountOutputTypeCountDataMasterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DataMasterWhereInput
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
   * Count Type KategoriCountOutputType
   */

  export type KategoriCountOutputType = {
    masukanWarga: number
  }

  export type KategoriCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    masukanWarga?: boolean | KategoriCountOutputTypeCountMasukanWargaArgs
  }

  // Custom InputTypes
  /**
   * KategoriCountOutputType without action
   */
  export type KategoriCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KategoriCountOutputType
     */
    select?: KategoriCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KategoriCountOutputType without action
   */
  export type KategoriCountOutputTypeCountMasukanWargaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MasukanWargaWhereInput
  }


  /**
   * Count Type MasukanWargaCountOutputType
   */

  export type MasukanWargaCountOutputType = {
    rekomendasi: number
  }

  export type MasukanWargaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rekomendasi?: boolean | MasukanWargaCountOutputTypeCountRekomendasiArgs
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
  export type MasukanWargaCountOutputTypeCountRekomendasiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekomendasiMasukanWhereInput
  }


  /**
   * Count Type RekomendasiCountOutputType
   */

  export type RekomendasiCountOutputType = {
    masukanWarga: number
  }

  export type RekomendasiCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    masukanWarga?: boolean | RekomendasiCountOutputTypeCountMasukanWargaArgs
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
  export type RekomendasiCountOutputTypeCountMasukanWargaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RekomendasiMasukanWhereInput
  }


  /**
   * Models
   */

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
    phoneNumberVerified: boolean | null
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
    phoneNumberVerified: boolean | null
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
    phoneNumberVerified: number
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
    phoneNumberVerified?: true
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
    phoneNumberVerified?: true
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
    phoneNumberVerified?: true
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
    phoneNumber: string
    phoneNumberVerified: boolean | null
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
    phoneNumberVerified?: boolean
    masukanVerifikasi?: boolean | User$masukanVerifikasiArgs<ExtArgs>
    rekomendasiDiproses?: boolean | User$rekomendasiDiprosesArgs<ExtArgs>
    dataMasterUpdate?: boolean | User$dataMasterUpdateArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
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
    phoneNumberVerified?: boolean
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
    phoneNumberVerified?: boolean
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
    phoneNumberVerified?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "jabatan" | "role" | "isActive" | "createdAt" | "updatedAt" | "emailVerified" | "image" | "phoneNumber" | "phoneNumberVerified", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    masukanVerifikasi?: boolean | User$masukanVerifikasiArgs<ExtArgs>
    rekomendasiDiproses?: boolean | User$rekomendasiDiprosesArgs<ExtArgs>
    dataMasterUpdate?: boolean | User$dataMasterUpdateArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      masukanVerifikasi: Prisma.$MasukanWargaPayload<ExtArgs>[]
      rekomendasiDiproses: Prisma.$RekomendasiPayload<ExtArgs>[]
      dataMasterUpdate: Prisma.$DataMasterPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
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
      phoneNumber: string
      phoneNumberVerified: boolean | null
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
    dataMasterUpdate<T extends User$dataMasterUpdateArgs<ExtArgs> = {}>(args?: Subset<T, User$dataMasterUpdateArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataMasterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly phoneNumberVerified: FieldRef<"User", 'Boolean'>
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
   * User.dataMasterUpdate
   */
  export type User$dataMasterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Model Kategori
   */

  export type AggregateKategori = {
    _count: KategoriCountAggregateOutputType | null
    _min: KategoriMinAggregateOutputType | null
    _max: KategoriMaxAggregateOutputType | null
  }

  export type KategoriMinAggregateOutputType = {
    id: string | null
    namaKategori: string | null
    deskripsi: string | null
    status: $Enums.StatusKategori | null
    createdAt: Date | null
  }

  export type KategoriMaxAggregateOutputType = {
    id: string | null
    namaKategori: string | null
    deskripsi: string | null
    status: $Enums.StatusKategori | null
    createdAt: Date | null
  }

  export type KategoriCountAggregateOutputType = {
    id: number
    namaKategori: number
    deskripsi: number
    status: number
    createdAt: number
    _all: number
  }


  export type KategoriMinAggregateInputType = {
    id?: true
    namaKategori?: true
    deskripsi?: true
    status?: true
    createdAt?: true
  }

  export type KategoriMaxAggregateInputType = {
    id?: true
    namaKategori?: true
    deskripsi?: true
    status?: true
    createdAt?: true
  }

  export type KategoriCountAggregateInputType = {
    id?: true
    namaKategori?: true
    deskripsi?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type KategoriAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kategori to aggregate.
     */
    where?: KategoriWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kategoris to fetch.
     */
    orderBy?: KategoriOrderByWithRelationInput | KategoriOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KategoriWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kategoris from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kategoris.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Kategoris
    **/
    _count?: true | KategoriCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KategoriMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KategoriMaxAggregateInputType
  }

  export type GetKategoriAggregateType<T extends KategoriAggregateArgs> = {
        [P in keyof T & keyof AggregateKategori]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKategori[P]>
      : GetScalarType<T[P], AggregateKategori[P]>
  }




  export type KategoriGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KategoriWhereInput
    orderBy?: KategoriOrderByWithAggregationInput | KategoriOrderByWithAggregationInput[]
    by: KategoriScalarFieldEnum[] | KategoriScalarFieldEnum
    having?: KategoriScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KategoriCountAggregateInputType | true
    _min?: KategoriMinAggregateInputType
    _max?: KategoriMaxAggregateInputType
  }

  export type KategoriGroupByOutputType = {
    id: string
    namaKategori: string
    deskripsi: string | null
    status: $Enums.StatusKategori
    createdAt: Date
    _count: KategoriCountAggregateOutputType | null
    _min: KategoriMinAggregateOutputType | null
    _max: KategoriMaxAggregateOutputType | null
  }

  type GetKategoriGroupByPayload<T extends KategoriGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KategoriGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KategoriGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KategoriGroupByOutputType[P]>
            : GetScalarType<T[P], KategoriGroupByOutputType[P]>
        }
      >
    >


  export type KategoriSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namaKategori?: boolean
    deskripsi?: boolean
    status?: boolean
    createdAt?: boolean
    masukanWarga?: boolean | Kategori$masukanWargaArgs<ExtArgs>
    _count?: boolean | KategoriCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kategori"]>

  export type KategoriSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namaKategori?: boolean
    deskripsi?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["kategori"]>

  export type KategoriSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namaKategori?: boolean
    deskripsi?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["kategori"]>

  export type KategoriSelectScalar = {
    id?: boolean
    namaKategori?: boolean
    deskripsi?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type KategoriOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "namaKategori" | "deskripsi" | "status" | "createdAt", ExtArgs["result"]["kategori"]>
  export type KategoriInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    masukanWarga?: boolean | Kategori$masukanWargaArgs<ExtArgs>
    _count?: boolean | KategoriCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KategoriIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type KategoriIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $KategoriPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Kategori"
    objects: {
      masukanWarga: Prisma.$MasukanWargaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      namaKategori: string
      deskripsi: string | null
      status: $Enums.StatusKategori
      createdAt: Date
    }, ExtArgs["result"]["kategori"]>
    composites: {}
  }

  type KategoriGetPayload<S extends boolean | null | undefined | KategoriDefaultArgs> = $Result.GetResult<Prisma.$KategoriPayload, S>

  type KategoriCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KategoriFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KategoriCountAggregateInputType | true
    }

  export interface KategoriDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Kategori'], meta: { name: 'Kategori' } }
    /**
     * Find zero or one Kategori that matches the filter.
     * @param {KategoriFindUniqueArgs} args - Arguments to find a Kategori
     * @example
     * // Get one Kategori
     * const kategori = await prisma.kategori.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KategoriFindUniqueArgs>(args: SelectSubset<T, KategoriFindUniqueArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Kategori that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KategoriFindUniqueOrThrowArgs} args - Arguments to find a Kategori
     * @example
     * // Get one Kategori
     * const kategori = await prisma.kategori.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KategoriFindUniqueOrThrowArgs>(args: SelectSubset<T, KategoriFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kategori that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriFindFirstArgs} args - Arguments to find a Kategori
     * @example
     * // Get one Kategori
     * const kategori = await prisma.kategori.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KategoriFindFirstArgs>(args?: SelectSubset<T, KategoriFindFirstArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kategori that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriFindFirstOrThrowArgs} args - Arguments to find a Kategori
     * @example
     * // Get one Kategori
     * const kategori = await prisma.kategori.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KategoriFindFirstOrThrowArgs>(args?: SelectSubset<T, KategoriFindFirstOrThrowArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Kategoris that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Kategoris
     * const kategoris = await prisma.kategori.findMany()
     * 
     * // Get first 10 Kategoris
     * const kategoris = await prisma.kategori.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kategoriWithIdOnly = await prisma.kategori.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KategoriFindManyArgs>(args?: SelectSubset<T, KategoriFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Kategori.
     * @param {KategoriCreateArgs} args - Arguments to create a Kategori.
     * @example
     * // Create one Kategori
     * const Kategori = await prisma.kategori.create({
     *   data: {
     *     // ... data to create a Kategori
     *   }
     * })
     * 
     */
    create<T extends KategoriCreateArgs>(args: SelectSubset<T, KategoriCreateArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Kategoris.
     * @param {KategoriCreateManyArgs} args - Arguments to create many Kategoris.
     * @example
     * // Create many Kategoris
     * const kategori = await prisma.kategori.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KategoriCreateManyArgs>(args?: SelectSubset<T, KategoriCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Kategoris and returns the data saved in the database.
     * @param {KategoriCreateManyAndReturnArgs} args - Arguments to create many Kategoris.
     * @example
     * // Create many Kategoris
     * const kategori = await prisma.kategori.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Kategoris and only return the `id`
     * const kategoriWithIdOnly = await prisma.kategori.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KategoriCreateManyAndReturnArgs>(args?: SelectSubset<T, KategoriCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Kategori.
     * @param {KategoriDeleteArgs} args - Arguments to delete one Kategori.
     * @example
     * // Delete one Kategori
     * const Kategori = await prisma.kategori.delete({
     *   where: {
     *     // ... filter to delete one Kategori
     *   }
     * })
     * 
     */
    delete<T extends KategoriDeleteArgs>(args: SelectSubset<T, KategoriDeleteArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Kategori.
     * @param {KategoriUpdateArgs} args - Arguments to update one Kategori.
     * @example
     * // Update one Kategori
     * const kategori = await prisma.kategori.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KategoriUpdateArgs>(args: SelectSubset<T, KategoriUpdateArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Kategoris.
     * @param {KategoriDeleteManyArgs} args - Arguments to filter Kategoris to delete.
     * @example
     * // Delete a few Kategoris
     * const { count } = await prisma.kategori.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KategoriDeleteManyArgs>(args?: SelectSubset<T, KategoriDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kategoris.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Kategoris
     * const kategori = await prisma.kategori.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KategoriUpdateManyArgs>(args: SelectSubset<T, KategoriUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kategoris and returns the data updated in the database.
     * @param {KategoriUpdateManyAndReturnArgs} args - Arguments to update many Kategoris.
     * @example
     * // Update many Kategoris
     * const kategori = await prisma.kategori.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Kategoris and only return the `id`
     * const kategoriWithIdOnly = await prisma.kategori.updateManyAndReturn({
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
    updateManyAndReturn<T extends KategoriUpdateManyAndReturnArgs>(args: SelectSubset<T, KategoriUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Kategori.
     * @param {KategoriUpsertArgs} args - Arguments to update or create a Kategori.
     * @example
     * // Update or create a Kategori
     * const kategori = await prisma.kategori.upsert({
     *   create: {
     *     // ... data to create a Kategori
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Kategori we want to update
     *   }
     * })
     */
    upsert<T extends KategoriUpsertArgs>(args: SelectSubset<T, KategoriUpsertArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Kategoris.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriCountArgs} args - Arguments to filter Kategoris to count.
     * @example
     * // Count the number of Kategoris
     * const count = await prisma.kategori.count({
     *   where: {
     *     // ... the filter for the Kategoris we want to count
     *   }
     * })
    **/
    count<T extends KategoriCountArgs>(
      args?: Subset<T, KategoriCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KategoriCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Kategori.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KategoriAggregateArgs>(args: Subset<T, KategoriAggregateArgs>): Prisma.PrismaPromise<GetKategoriAggregateType<T>>

    /**
     * Group by Kategori.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KategoriGroupByArgs} args - Group by arguments.
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
      T extends KategoriGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KategoriGroupByArgs['orderBy'] }
        : { orderBy?: KategoriGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KategoriGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKategoriGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Kategori model
   */
  readonly fields: KategoriFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Kategori.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KategoriClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    masukanWarga<T extends Kategori$masukanWargaArgs<ExtArgs> = {}>(args?: Subset<T, Kategori$masukanWargaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MasukanWargaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Kategori model
   */
  interface KategoriFieldRefs {
    readonly id: FieldRef<"Kategori", 'String'>
    readonly namaKategori: FieldRef<"Kategori", 'String'>
    readonly deskripsi: FieldRef<"Kategori", 'String'>
    readonly status: FieldRef<"Kategori", 'StatusKategori'>
    readonly createdAt: FieldRef<"Kategori", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Kategori findUnique
   */
  export type KategoriFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * Filter, which Kategori to fetch.
     */
    where: KategoriWhereUniqueInput
  }

  /**
   * Kategori findUniqueOrThrow
   */
  export type KategoriFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * Filter, which Kategori to fetch.
     */
    where: KategoriWhereUniqueInput
  }

  /**
   * Kategori findFirst
   */
  export type KategoriFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * Filter, which Kategori to fetch.
     */
    where?: KategoriWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kategoris to fetch.
     */
    orderBy?: KategoriOrderByWithRelationInput | KategoriOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kategoris.
     */
    cursor?: KategoriWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kategoris from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kategoris.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kategoris.
     */
    distinct?: KategoriScalarFieldEnum | KategoriScalarFieldEnum[]
  }

  /**
   * Kategori findFirstOrThrow
   */
  export type KategoriFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * Filter, which Kategori to fetch.
     */
    where?: KategoriWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kategoris to fetch.
     */
    orderBy?: KategoriOrderByWithRelationInput | KategoriOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kategoris.
     */
    cursor?: KategoriWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kategoris from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kategoris.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kategoris.
     */
    distinct?: KategoriScalarFieldEnum | KategoriScalarFieldEnum[]
  }

  /**
   * Kategori findMany
   */
  export type KategoriFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * Filter, which Kategoris to fetch.
     */
    where?: KategoriWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kategoris to fetch.
     */
    orderBy?: KategoriOrderByWithRelationInput | KategoriOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Kategoris.
     */
    cursor?: KategoriWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kategoris from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kategoris.
     */
    skip?: number
    distinct?: KategoriScalarFieldEnum | KategoriScalarFieldEnum[]
  }

  /**
   * Kategori create
   */
  export type KategoriCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * The data needed to create a Kategori.
     */
    data: XOR<KategoriCreateInput, KategoriUncheckedCreateInput>
  }

  /**
   * Kategori createMany
   */
  export type KategoriCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Kategoris.
     */
    data: KategoriCreateManyInput | KategoriCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kategori createManyAndReturn
   */
  export type KategoriCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * The data used to create many Kategoris.
     */
    data: KategoriCreateManyInput | KategoriCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kategori update
   */
  export type KategoriUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * The data needed to update a Kategori.
     */
    data: XOR<KategoriUpdateInput, KategoriUncheckedUpdateInput>
    /**
     * Choose, which Kategori to update.
     */
    where: KategoriWhereUniqueInput
  }

  /**
   * Kategori updateMany
   */
  export type KategoriUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Kategoris.
     */
    data: XOR<KategoriUpdateManyMutationInput, KategoriUncheckedUpdateManyInput>
    /**
     * Filter which Kategoris to update
     */
    where?: KategoriWhereInput
    /**
     * Limit how many Kategoris to update.
     */
    limit?: number
  }

  /**
   * Kategori updateManyAndReturn
   */
  export type KategoriUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * The data used to update Kategoris.
     */
    data: XOR<KategoriUpdateManyMutationInput, KategoriUncheckedUpdateManyInput>
    /**
     * Filter which Kategoris to update
     */
    where?: KategoriWhereInput
    /**
     * Limit how many Kategoris to update.
     */
    limit?: number
  }

  /**
   * Kategori upsert
   */
  export type KategoriUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * The filter to search for the Kategori to update in case it exists.
     */
    where: KategoriWhereUniqueInput
    /**
     * In case the Kategori found by the `where` argument doesn't exist, create a new Kategori with this data.
     */
    create: XOR<KategoriCreateInput, KategoriUncheckedCreateInput>
    /**
     * In case the Kategori was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KategoriUpdateInput, KategoriUncheckedUpdateInput>
  }

  /**
   * Kategori delete
   */
  export type KategoriDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
    /**
     * Filter which Kategori to delete.
     */
    where: KategoriWhereUniqueInput
  }

  /**
   * Kategori deleteMany
   */
  export type KategoriDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kategoris to delete
     */
    where?: KategoriWhereInput
    /**
     * Limit how many Kategoris to delete.
     */
    limit?: number
  }

  /**
   * Kategori.masukanWarga
   */
  export type Kategori$masukanWargaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Kategori without action
   */
  export type KategoriDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kategori
     */
    select?: KategoriSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kategori
     */
    omit?: KategoriOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KategoriInclude<ExtArgs> | null
  }


  /**
   * Model MasukanWarga
   */

  export type AggregateMasukanWarga = {
    _count: MasukanWargaCountAggregateOutputType | null
    _min: MasukanWargaMinAggregateOutputType | null
    _max: MasukanWargaMaxAggregateOutputType | null
  }

  export type MasukanWargaMinAggregateOutputType = {
    id: string | null
    namaPengirim: string | null
    emailPengirim: string | null
    lokasiRt: string | null
    lokasiRw: string | null
    deskripsiMasukan: string | null
    status: $Enums.MasukanStatus | null
    alasanPenolakan: string | null
    updatedAt: Date | null
    createdAt: Date | null
    kategoriId: string | null
    verifiedByUserId: string | null
  }

  export type MasukanWargaMaxAggregateOutputType = {
    id: string | null
    namaPengirim: string | null
    emailPengirim: string | null
    lokasiRt: string | null
    lokasiRw: string | null
    deskripsiMasukan: string | null
    status: $Enums.MasukanStatus | null
    alasanPenolakan: string | null
    updatedAt: Date | null
    createdAt: Date | null
    kategoriId: string | null
    verifiedByUserId: string | null
  }

  export type MasukanWargaCountAggregateOutputType = {
    id: number
    namaPengirim: number
    emailPengirim: number
    lokasiRt: number
    lokasiRw: number
    deskripsiMasukan: number
    status: number
    alasanPenolakan: number
    updatedAt: number
    createdAt: number
    kategoriId: number
    verifiedByUserId: number
    _all: number
  }


  export type MasukanWargaMinAggregateInputType = {
    id?: true
    namaPengirim?: true
    emailPengirim?: true
    lokasiRt?: true
    lokasiRw?: true
    deskripsiMasukan?: true
    status?: true
    alasanPenolakan?: true
    updatedAt?: true
    createdAt?: true
    kategoriId?: true
    verifiedByUserId?: true
  }

  export type MasukanWargaMaxAggregateInputType = {
    id?: true
    namaPengirim?: true
    emailPengirim?: true
    lokasiRt?: true
    lokasiRw?: true
    deskripsiMasukan?: true
    status?: true
    alasanPenolakan?: true
    updatedAt?: true
    createdAt?: true
    kategoriId?: true
    verifiedByUserId?: true
  }

  export type MasukanWargaCountAggregateInputType = {
    id?: true
    namaPengirim?: true
    emailPengirim?: true
    lokasiRt?: true
    lokasiRw?: true
    deskripsiMasukan?: true
    status?: true
    alasanPenolakan?: true
    updatedAt?: true
    createdAt?: true
    kategoriId?: true
    verifiedByUserId?: true
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
    _min?: MasukanWargaMinAggregateInputType
    _max?: MasukanWargaMaxAggregateInputType
  }

  export type MasukanWargaGroupByOutputType = {
    id: string
    namaPengirim: string
    emailPengirim: string
    lokasiRt: string
    lokasiRw: string
    deskripsiMasukan: string
    status: $Enums.MasukanStatus
    alasanPenolakan: string | null
    updatedAt: Date
    createdAt: Date
    kategoriId: string
    verifiedByUserId: string | null
    _count: MasukanWargaCountAggregateOutputType | null
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
    namaPengirim?: boolean
    emailPengirim?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    deskripsiMasukan?: boolean
    status?: boolean
    alasanPenolakan?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    kategoriId?: boolean
    verifiedByUserId?: boolean
    kategori?: boolean | KategoriDefaultArgs<ExtArgs>
    verifiedBy?: boolean | MasukanWarga$verifiedByArgs<ExtArgs>
    rekomendasi?: boolean | MasukanWarga$rekomendasiArgs<ExtArgs>
    _count?: boolean | MasukanWargaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["masukanWarga"]>

  export type MasukanWargaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namaPengirim?: boolean
    emailPengirim?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    deskripsiMasukan?: boolean
    status?: boolean
    alasanPenolakan?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    kategoriId?: boolean
    verifiedByUserId?: boolean
    kategori?: boolean | KategoriDefaultArgs<ExtArgs>
    verifiedBy?: boolean | MasukanWarga$verifiedByArgs<ExtArgs>
  }, ExtArgs["result"]["masukanWarga"]>

  export type MasukanWargaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namaPengirim?: boolean
    emailPengirim?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    deskripsiMasukan?: boolean
    status?: boolean
    alasanPenolakan?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    kategoriId?: boolean
    verifiedByUserId?: boolean
    kategori?: boolean | KategoriDefaultArgs<ExtArgs>
    verifiedBy?: boolean | MasukanWarga$verifiedByArgs<ExtArgs>
  }, ExtArgs["result"]["masukanWarga"]>

  export type MasukanWargaSelectScalar = {
    id?: boolean
    namaPengirim?: boolean
    emailPengirim?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    deskripsiMasukan?: boolean
    status?: boolean
    alasanPenolakan?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    kategoriId?: boolean
    verifiedByUserId?: boolean
  }

  export type MasukanWargaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "namaPengirim" | "emailPengirim" | "lokasiRt" | "lokasiRw" | "deskripsiMasukan" | "status" | "alasanPenolakan" | "updatedAt" | "createdAt" | "kategoriId" | "verifiedByUserId", ExtArgs["result"]["masukanWarga"]>
  export type MasukanWargaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kategori?: boolean | KategoriDefaultArgs<ExtArgs>
    verifiedBy?: boolean | MasukanWarga$verifiedByArgs<ExtArgs>
    rekomendasi?: boolean | MasukanWarga$rekomendasiArgs<ExtArgs>
    _count?: boolean | MasukanWargaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MasukanWargaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kategori?: boolean | KategoriDefaultArgs<ExtArgs>
    verifiedBy?: boolean | MasukanWarga$verifiedByArgs<ExtArgs>
  }
  export type MasukanWargaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kategori?: boolean | KategoriDefaultArgs<ExtArgs>
    verifiedBy?: boolean | MasukanWarga$verifiedByArgs<ExtArgs>
  }

  export type $MasukanWargaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MasukanWarga"
    objects: {
      kategori: Prisma.$KategoriPayload<ExtArgs>
      verifiedBy: Prisma.$UserPayload<ExtArgs> | null
      rekomendasi: Prisma.$RekomendasiMasukanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      namaPengirim: string
      emailPengirim: string
      lokasiRt: string
      lokasiRw: string
      deskripsiMasukan: string
      status: $Enums.MasukanStatus
      alasanPenolakan: string | null
      updatedAt: Date
      createdAt: Date
      kategoriId: string
      verifiedByUserId: string | null
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
    kategori<T extends KategoriDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KategoriDefaultArgs<ExtArgs>>): Prisma__KategoriClient<$Result.GetResult<Prisma.$KategoriPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    verifiedBy<T extends MasukanWarga$verifiedByArgs<ExtArgs> = {}>(args?: Subset<T, MasukanWarga$verifiedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    rekomendasi<T extends MasukanWarga$rekomendasiArgs<ExtArgs> = {}>(args?: Subset<T, MasukanWarga$rekomendasiArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly namaPengirim: FieldRef<"MasukanWarga", 'String'>
    readonly emailPengirim: FieldRef<"MasukanWarga", 'String'>
    readonly lokasiRt: FieldRef<"MasukanWarga", 'String'>
    readonly lokasiRw: FieldRef<"MasukanWarga", 'String'>
    readonly deskripsiMasukan: FieldRef<"MasukanWarga", 'String'>
    readonly status: FieldRef<"MasukanWarga", 'MasukanStatus'>
    readonly alasanPenolakan: FieldRef<"MasukanWarga", 'String'>
    readonly updatedAt: FieldRef<"MasukanWarga", 'DateTime'>
    readonly createdAt: FieldRef<"MasukanWarga", 'DateTime'>
    readonly kategoriId: FieldRef<"MasukanWarga", 'String'>
    readonly verifiedByUserId: FieldRef<"MasukanWarga", 'String'>
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
   * MasukanWarga.verifiedBy
   */
  export type MasukanWarga$verifiedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * MasukanWarga.rekomendasi
   */
  export type MasukanWarga$rekomendasiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
  }

  export type DataMasterSumAggregateOutputType = {
    jumlah: number | null
  }

  export type DataMasterMinAggregateOutputType = {
    id: string | null
    jenisData: $Enums.JenisDataMaster | null
    namaAtribut: string | null
    nilai: string | null
    jumlah: number | null
    lokasiRt: string | null
    lokasiRw: string | null
    updatedByUserId: string | null
    updatedAt: Date | null
  }

  export type DataMasterMaxAggregateOutputType = {
    id: string | null
    jenisData: $Enums.JenisDataMaster | null
    namaAtribut: string | null
    nilai: string | null
    jumlah: number | null
    lokasiRt: string | null
    lokasiRw: string | null
    updatedByUserId: string | null
    updatedAt: Date | null
  }

  export type DataMasterCountAggregateOutputType = {
    id: number
    jenisData: number
    namaAtribut: number
    nilai: number
    jumlah: number
    lokasiRt: number
    lokasiRw: number
    updatedByUserId: number
    updatedAt: number
    _all: number
  }


  export type DataMasterAvgAggregateInputType = {
    jumlah?: true
  }

  export type DataMasterSumAggregateInputType = {
    jumlah?: true
  }

  export type DataMasterMinAggregateInputType = {
    id?: true
    jenisData?: true
    namaAtribut?: true
    nilai?: true
    jumlah?: true
    lokasiRt?: true
    lokasiRw?: true
    updatedByUserId?: true
    updatedAt?: true
  }

  export type DataMasterMaxAggregateInputType = {
    id?: true
    jenisData?: true
    namaAtribut?: true
    nilai?: true
    jumlah?: true
    lokasiRt?: true
    lokasiRw?: true
    updatedByUserId?: true
    updatedAt?: true
  }

  export type DataMasterCountAggregateInputType = {
    id?: true
    jenisData?: true
    namaAtribut?: true
    nilai?: true
    jumlah?: true
    lokasiRt?: true
    lokasiRw?: true
    updatedByUserId?: true
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
    jenisData: $Enums.JenisDataMaster
    namaAtribut: string
    nilai: string
    jumlah: number
    lokasiRt: string | null
    lokasiRw: string | null
    updatedByUserId: string
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
    jenisData?: boolean
    namaAtribut?: boolean
    nilai?: boolean
    jumlah?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    updatedByUserId?: boolean
    updatedAt?: boolean
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataMaster"]>

  export type DataMasterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jenisData?: boolean
    namaAtribut?: boolean
    nilai?: boolean
    jumlah?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    updatedByUserId?: boolean
    updatedAt?: boolean
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataMaster"]>

  export type DataMasterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jenisData?: boolean
    namaAtribut?: boolean
    nilai?: boolean
    jumlah?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    updatedByUserId?: boolean
    updatedAt?: boolean
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataMaster"]>

  export type DataMasterSelectScalar = {
    id?: boolean
    jenisData?: boolean
    namaAtribut?: boolean
    nilai?: boolean
    jumlah?: boolean
    lokasiRt?: boolean
    lokasiRw?: boolean
    updatedByUserId?: boolean
    updatedAt?: boolean
  }

  export type DataMasterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jenisData" | "namaAtribut" | "nilai" | "jumlah" | "lokasiRt" | "lokasiRw" | "updatedByUserId" | "updatedAt", ExtArgs["result"]["dataMaster"]>
  export type DataMasterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DataMasterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DataMasterIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DataMasterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DataMaster"
    objects: {
      updatedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jenisData: $Enums.JenisDataMaster
      namaAtribut: string
      nilai: string
      jumlah: number
      lokasiRt: string | null
      lokasiRw: string | null
      updatedByUserId: string
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
    updatedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly jenisData: FieldRef<"DataMaster", 'JenisDataMaster'>
    readonly namaAtribut: FieldRef<"DataMaster", 'String'>
    readonly nilai: FieldRef<"DataMaster", 'String'>
    readonly jumlah: FieldRef<"DataMaster", 'Int'>
    readonly lokasiRt: FieldRef<"DataMaster", 'String'>
    readonly lokasiRw: FieldRef<"DataMaster", 'String'>
    readonly updatedByUserId: FieldRef<"DataMaster", 'String'>
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
    prioritas1Skor: number | null
  }

  export type RekomendasiSumAggregateOutputType = {
    prioritas1Skor: number | null
  }

  export type RekomendasiMinAggregateOutputType = {
    id: string | null
    judul: string | null
    tanggalProses: Date | null
    prioritas1Deskripsi: string | null
    prioritas1Skor: number | null
    processedByUserId: string | null
  }

  export type RekomendasiMaxAggregateOutputType = {
    id: string | null
    judul: string | null
    tanggalProses: Date | null
    prioritas1Deskripsi: string | null
    prioritas1Skor: number | null
    processedByUserId: string | null
  }

  export type RekomendasiCountAggregateOutputType = {
    id: number
    judul: number
    tanggalProses: number
    prioritas1Deskripsi: number
    prioritas1Skor: number
    laporanLengkap: number
    processedByUserId: number
    _all: number
  }


  export type RekomendasiAvgAggregateInputType = {
    prioritas1Skor?: true
  }

  export type RekomendasiSumAggregateInputType = {
    prioritas1Skor?: true
  }

  export type RekomendasiMinAggregateInputType = {
    id?: true
    judul?: true
    tanggalProses?: true
    prioritas1Deskripsi?: true
    prioritas1Skor?: true
    processedByUserId?: true
  }

  export type RekomendasiMaxAggregateInputType = {
    id?: true
    judul?: true
    tanggalProses?: true
    prioritas1Deskripsi?: true
    prioritas1Skor?: true
    processedByUserId?: true
  }

  export type RekomendasiCountAggregateInputType = {
    id?: true
    judul?: true
    tanggalProses?: true
    prioritas1Deskripsi?: true
    prioritas1Skor?: true
    laporanLengkap?: true
    processedByUserId?: true
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
    judul: string
    tanggalProses: Date
    prioritas1Deskripsi: string
    prioritas1Skor: number
    laporanLengkap: JsonValue | null
    processedByUserId: string
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
    judul?: boolean
    tanggalProses?: boolean
    prioritas1Deskripsi?: boolean
    prioritas1Skor?: boolean
    laporanLengkap?: boolean
    processedByUserId?: boolean
    processedBy?: boolean | UserDefaultArgs<ExtArgs>
    masukanWarga?: boolean | Rekomendasi$masukanWargaArgs<ExtArgs>
    _count?: boolean | RekomendasiCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rekomendasi"]>

  export type RekomendasiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    judul?: boolean
    tanggalProses?: boolean
    prioritas1Deskripsi?: boolean
    prioritas1Skor?: boolean
    laporanLengkap?: boolean
    processedByUserId?: boolean
    processedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rekomendasi"]>

  export type RekomendasiSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    judul?: boolean
    tanggalProses?: boolean
    prioritas1Deskripsi?: boolean
    prioritas1Skor?: boolean
    laporanLengkap?: boolean
    processedByUserId?: boolean
    processedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rekomendasi"]>

  export type RekomendasiSelectScalar = {
    id?: boolean
    judul?: boolean
    tanggalProses?: boolean
    prioritas1Deskripsi?: boolean
    prioritas1Skor?: boolean
    laporanLengkap?: boolean
    processedByUserId?: boolean
  }

  export type RekomendasiOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "judul" | "tanggalProses" | "prioritas1Deskripsi" | "prioritas1Skor" | "laporanLengkap" | "processedByUserId", ExtArgs["result"]["rekomendasi"]>
  export type RekomendasiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processedBy?: boolean | UserDefaultArgs<ExtArgs>
    masukanWarga?: boolean | Rekomendasi$masukanWargaArgs<ExtArgs>
    _count?: boolean | RekomendasiCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RekomendasiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RekomendasiIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RekomendasiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rekomendasi"
    objects: {
      processedBy: Prisma.$UserPayload<ExtArgs>
      masukanWarga: Prisma.$RekomendasiMasukanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      judul: string
      tanggalProses: Date
      prioritas1Deskripsi: string
      prioritas1Skor: number
      laporanLengkap: Prisma.JsonValue | null
      processedByUserId: string
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
    processedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    masukanWarga<T extends Rekomendasi$masukanWargaArgs<ExtArgs> = {}>(args?: Subset<T, Rekomendasi$masukanWargaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RekomendasiMasukanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly judul: FieldRef<"Rekomendasi", 'String'>
    readonly tanggalProses: FieldRef<"Rekomendasi", 'DateTime'>
    readonly prioritas1Deskripsi: FieldRef<"Rekomendasi", 'String'>
    readonly prioritas1Skor: FieldRef<"Rekomendasi", 'Float'>
    readonly laporanLengkap: FieldRef<"Rekomendasi", 'Json'>
    readonly processedByUserId: FieldRef<"Rekomendasi", 'String'>
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
   * Rekomendasi.masukanWarga
   */
  export type Rekomendasi$masukanWargaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId" | "role", ExtArgs["result"]["session"]>
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
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


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
    phoneNumber: 'phoneNumber',
    phoneNumberVerified: 'phoneNumberVerified'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const KategoriScalarFieldEnum: {
    id: 'id',
    namaKategori: 'namaKategori',
    deskripsi: 'deskripsi',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type KategoriScalarFieldEnum = (typeof KategoriScalarFieldEnum)[keyof typeof KategoriScalarFieldEnum]


  export const MasukanWargaScalarFieldEnum: {
    id: 'id',
    namaPengirim: 'namaPengirim',
    emailPengirim: 'emailPengirim',
    lokasiRt: 'lokasiRt',
    lokasiRw: 'lokasiRw',
    deskripsiMasukan: 'deskripsiMasukan',
    status: 'status',
    alasanPenolakan: 'alasanPenolakan',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    kategoriId: 'kategoriId',
    verifiedByUserId: 'verifiedByUserId'
  };

  export type MasukanWargaScalarFieldEnum = (typeof MasukanWargaScalarFieldEnum)[keyof typeof MasukanWargaScalarFieldEnum]


  export const DataMasterScalarFieldEnum: {
    id: 'id',
    jenisData: 'jenisData',
    namaAtribut: 'namaAtribut',
    nilai: 'nilai',
    jumlah: 'jumlah',
    lokasiRt: 'lokasiRt',
    lokasiRw: 'lokasiRw',
    updatedByUserId: 'updatedByUserId',
    updatedAt: 'updatedAt'
  };

  export type DataMasterScalarFieldEnum = (typeof DataMasterScalarFieldEnum)[keyof typeof DataMasterScalarFieldEnum]


  export const RekomendasiScalarFieldEnum: {
    id: 'id',
    judul: 'judul',
    tanggalProses: 'tanggalProses',
    prioritas1Deskripsi: 'prioritas1Deskripsi',
    prioritas1Skor: 'prioritas1Skor',
    laporanLengkap: 'laporanLengkap',
    processedByUserId: 'processedByUserId'
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
    role: 'role'
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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'StatusKategori'
   */
  export type EnumStatusKategoriFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKategori'>
    


  /**
   * Reference to a field of type 'StatusKategori[]'
   */
  export type ListEnumStatusKategoriFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKategori[]'>
    


  /**
   * Reference to a field of type 'MasukanStatus'
   */
  export type EnumMasukanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MasukanStatus'>
    


  /**
   * Reference to a field of type 'MasukanStatus[]'
   */
  export type ListEnumMasukanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MasukanStatus[]'>
    


  /**
   * Reference to a field of type 'JenisDataMaster'
   */
  export type EnumJenisDataMasterFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JenisDataMaster'>
    


  /**
   * Reference to a field of type 'JenisDataMaster[]'
   */
  export type ListEnumJenisDataMasterFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JenisDataMaster[]'>
    


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
    phoneNumber?: StringFilter<"User"> | string
    phoneNumberVerified?: BoolNullableFilter<"User"> | boolean | null
    masukanVerifikasi?: MasukanWargaListRelationFilter
    rekomendasiDiproses?: RekomendasiListRelationFilter
    dataMasterUpdate?: DataMasterListRelationFilter
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
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
    phoneNumber?: SortOrder
    phoneNumberVerified?: SortOrderInput | SortOrder
    masukanVerifikasi?: MasukanWargaOrderByRelationAggregateInput
    rekomendasiDiproses?: RekomendasiOrderByRelationAggregateInput
    dataMasterUpdate?: DataMasterOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phoneNumber?: string
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
    phoneNumberVerified?: BoolNullableFilter<"User"> | boolean | null
    masukanVerifikasi?: MasukanWargaListRelationFilter
    rekomendasiDiproses?: RekomendasiListRelationFilter
    dataMasterUpdate?: DataMasterListRelationFilter
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }, "id" | "email" | "phoneNumber" | "phoneNumber">

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
    phoneNumber?: SortOrder
    phoneNumberVerified?: SortOrderInput | SortOrder
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
    phoneNumber?: StringWithAggregatesFilter<"User"> | string
    phoneNumberVerified?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
  }

  export type KategoriWhereInput = {
    AND?: KategoriWhereInput | KategoriWhereInput[]
    OR?: KategoriWhereInput[]
    NOT?: KategoriWhereInput | KategoriWhereInput[]
    id?: StringFilter<"Kategori"> | string
    namaKategori?: StringFilter<"Kategori"> | string
    deskripsi?: StringNullableFilter<"Kategori"> | string | null
    status?: EnumStatusKategoriFilter<"Kategori"> | $Enums.StatusKategori
    createdAt?: DateTimeFilter<"Kategori"> | Date | string
    masukanWarga?: MasukanWargaListRelationFilter
  }

  export type KategoriOrderByWithRelationInput = {
    id?: SortOrder
    namaKategori?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    masukanWarga?: MasukanWargaOrderByRelationAggregateInput
  }

  export type KategoriWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    namaKategori?: string
    AND?: KategoriWhereInput | KategoriWhereInput[]
    OR?: KategoriWhereInput[]
    NOT?: KategoriWhereInput | KategoriWhereInput[]
    deskripsi?: StringNullableFilter<"Kategori"> | string | null
    status?: EnumStatusKategoriFilter<"Kategori"> | $Enums.StatusKategori
    createdAt?: DateTimeFilter<"Kategori"> | Date | string
    masukanWarga?: MasukanWargaListRelationFilter
  }, "id" | "namaKategori">

  export type KategoriOrderByWithAggregationInput = {
    id?: SortOrder
    namaKategori?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: KategoriCountOrderByAggregateInput
    _max?: KategoriMaxOrderByAggregateInput
    _min?: KategoriMinOrderByAggregateInput
  }

  export type KategoriScalarWhereWithAggregatesInput = {
    AND?: KategoriScalarWhereWithAggregatesInput | KategoriScalarWhereWithAggregatesInput[]
    OR?: KategoriScalarWhereWithAggregatesInput[]
    NOT?: KategoriScalarWhereWithAggregatesInput | KategoriScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Kategori"> | string
    namaKategori?: StringWithAggregatesFilter<"Kategori"> | string
    deskripsi?: StringNullableWithAggregatesFilter<"Kategori"> | string | null
    status?: EnumStatusKategoriWithAggregatesFilter<"Kategori"> | $Enums.StatusKategori
    createdAt?: DateTimeWithAggregatesFilter<"Kategori"> | Date | string
  }

  export type MasukanWargaWhereInput = {
    AND?: MasukanWargaWhereInput | MasukanWargaWhereInput[]
    OR?: MasukanWargaWhereInput[]
    NOT?: MasukanWargaWhereInput | MasukanWargaWhereInput[]
    id?: StringFilter<"MasukanWarga"> | string
    namaPengirim?: StringFilter<"MasukanWarga"> | string
    emailPengirim?: StringFilter<"MasukanWarga"> | string
    lokasiRt?: StringFilter<"MasukanWarga"> | string
    lokasiRw?: StringFilter<"MasukanWarga"> | string
    deskripsiMasukan?: StringFilter<"MasukanWarga"> | string
    status?: EnumMasukanStatusFilter<"MasukanWarga"> | $Enums.MasukanStatus
    alasanPenolakan?: StringNullableFilter<"MasukanWarga"> | string | null
    updatedAt?: DateTimeFilter<"MasukanWarga"> | Date | string
    createdAt?: DateTimeFilter<"MasukanWarga"> | Date | string
    kategoriId?: StringFilter<"MasukanWarga"> | string
    verifiedByUserId?: StringNullableFilter<"MasukanWarga"> | string | null
    kategori?: XOR<KategoriScalarRelationFilter, KategoriWhereInput>
    verifiedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    rekomendasi?: RekomendasiMasukanListRelationFilter
  }

  export type MasukanWargaOrderByWithRelationInput = {
    id?: SortOrder
    namaPengirim?: SortOrder
    emailPengirim?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    deskripsiMasukan?: SortOrder
    status?: SortOrder
    alasanPenolakan?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    kategoriId?: SortOrder
    verifiedByUserId?: SortOrderInput | SortOrder
    kategori?: KategoriOrderByWithRelationInput
    verifiedBy?: UserOrderByWithRelationInput
    rekomendasi?: RekomendasiMasukanOrderByRelationAggregateInput
  }

  export type MasukanWargaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MasukanWargaWhereInput | MasukanWargaWhereInput[]
    OR?: MasukanWargaWhereInput[]
    NOT?: MasukanWargaWhereInput | MasukanWargaWhereInput[]
    namaPengirim?: StringFilter<"MasukanWarga"> | string
    emailPengirim?: StringFilter<"MasukanWarga"> | string
    lokasiRt?: StringFilter<"MasukanWarga"> | string
    lokasiRw?: StringFilter<"MasukanWarga"> | string
    deskripsiMasukan?: StringFilter<"MasukanWarga"> | string
    status?: EnumMasukanStatusFilter<"MasukanWarga"> | $Enums.MasukanStatus
    alasanPenolakan?: StringNullableFilter<"MasukanWarga"> | string | null
    updatedAt?: DateTimeFilter<"MasukanWarga"> | Date | string
    createdAt?: DateTimeFilter<"MasukanWarga"> | Date | string
    kategoriId?: StringFilter<"MasukanWarga"> | string
    verifiedByUserId?: StringNullableFilter<"MasukanWarga"> | string | null
    kategori?: XOR<KategoriScalarRelationFilter, KategoriWhereInput>
    verifiedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    rekomendasi?: RekomendasiMasukanListRelationFilter
  }, "id">

  export type MasukanWargaOrderByWithAggregationInput = {
    id?: SortOrder
    namaPengirim?: SortOrder
    emailPengirim?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    deskripsiMasukan?: SortOrder
    status?: SortOrder
    alasanPenolakan?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    kategoriId?: SortOrder
    verifiedByUserId?: SortOrderInput | SortOrder
    _count?: MasukanWargaCountOrderByAggregateInput
    _max?: MasukanWargaMaxOrderByAggregateInput
    _min?: MasukanWargaMinOrderByAggregateInput
  }

  export type MasukanWargaScalarWhereWithAggregatesInput = {
    AND?: MasukanWargaScalarWhereWithAggregatesInput | MasukanWargaScalarWhereWithAggregatesInput[]
    OR?: MasukanWargaScalarWhereWithAggregatesInput[]
    NOT?: MasukanWargaScalarWhereWithAggregatesInput | MasukanWargaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MasukanWarga"> | string
    namaPengirim?: StringWithAggregatesFilter<"MasukanWarga"> | string
    emailPengirim?: StringWithAggregatesFilter<"MasukanWarga"> | string
    lokasiRt?: StringWithAggregatesFilter<"MasukanWarga"> | string
    lokasiRw?: StringWithAggregatesFilter<"MasukanWarga"> | string
    deskripsiMasukan?: StringWithAggregatesFilter<"MasukanWarga"> | string
    status?: EnumMasukanStatusWithAggregatesFilter<"MasukanWarga"> | $Enums.MasukanStatus
    alasanPenolakan?: StringNullableWithAggregatesFilter<"MasukanWarga"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"MasukanWarga"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"MasukanWarga"> | Date | string
    kategoriId?: StringWithAggregatesFilter<"MasukanWarga"> | string
    verifiedByUserId?: StringNullableWithAggregatesFilter<"MasukanWarga"> | string | null
  }

  export type DataMasterWhereInput = {
    AND?: DataMasterWhereInput | DataMasterWhereInput[]
    OR?: DataMasterWhereInput[]
    NOT?: DataMasterWhereInput | DataMasterWhereInput[]
    id?: StringFilter<"DataMaster"> | string
    jenisData?: EnumJenisDataMasterFilter<"DataMaster"> | $Enums.JenisDataMaster
    namaAtribut?: StringFilter<"DataMaster"> | string
    nilai?: StringFilter<"DataMaster"> | string
    jumlah?: IntFilter<"DataMaster"> | number
    lokasiRt?: StringNullableFilter<"DataMaster"> | string | null
    lokasiRw?: StringNullableFilter<"DataMaster"> | string | null
    updatedByUserId?: StringFilter<"DataMaster"> | string
    updatedAt?: DateTimeFilter<"DataMaster"> | Date | string
    updatedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DataMasterOrderByWithRelationInput = {
    id?: SortOrder
    jenisData?: SortOrder
    namaAtribut?: SortOrder
    nilai?: SortOrder
    jumlah?: SortOrder
    lokasiRt?: SortOrderInput | SortOrder
    lokasiRw?: SortOrderInput | SortOrder
    updatedByUserId?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: UserOrderByWithRelationInput
  }

  export type DataMasterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    jenisData_namaAtribut_lokasiRt_lokasiRw?: DataMasterJenisDataNamaAtributLokasiRtLokasiRwCompoundUniqueInput
    AND?: DataMasterWhereInput | DataMasterWhereInput[]
    OR?: DataMasterWhereInput[]
    NOT?: DataMasterWhereInput | DataMasterWhereInput[]
    jenisData?: EnumJenisDataMasterFilter<"DataMaster"> | $Enums.JenisDataMaster
    namaAtribut?: StringFilter<"DataMaster"> | string
    nilai?: StringFilter<"DataMaster"> | string
    jumlah?: IntFilter<"DataMaster"> | number
    lokasiRt?: StringNullableFilter<"DataMaster"> | string | null
    lokasiRw?: StringNullableFilter<"DataMaster"> | string | null
    updatedByUserId?: StringFilter<"DataMaster"> | string
    updatedAt?: DateTimeFilter<"DataMaster"> | Date | string
    updatedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "jenisData_namaAtribut_lokasiRt_lokasiRw">

  export type DataMasterOrderByWithAggregationInput = {
    id?: SortOrder
    jenisData?: SortOrder
    namaAtribut?: SortOrder
    nilai?: SortOrder
    jumlah?: SortOrder
    lokasiRt?: SortOrderInput | SortOrder
    lokasiRw?: SortOrderInput | SortOrder
    updatedByUserId?: SortOrder
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
    jenisData?: EnumJenisDataMasterWithAggregatesFilter<"DataMaster"> | $Enums.JenisDataMaster
    namaAtribut?: StringWithAggregatesFilter<"DataMaster"> | string
    nilai?: StringWithAggregatesFilter<"DataMaster"> | string
    jumlah?: IntWithAggregatesFilter<"DataMaster"> | number
    lokasiRt?: StringNullableWithAggregatesFilter<"DataMaster"> | string | null
    lokasiRw?: StringNullableWithAggregatesFilter<"DataMaster"> | string | null
    updatedByUserId?: StringWithAggregatesFilter<"DataMaster"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"DataMaster"> | Date | string
  }

  export type RekomendasiWhereInput = {
    AND?: RekomendasiWhereInput | RekomendasiWhereInput[]
    OR?: RekomendasiWhereInput[]
    NOT?: RekomendasiWhereInput | RekomendasiWhereInput[]
    id?: StringFilter<"Rekomendasi"> | string
    judul?: StringFilter<"Rekomendasi"> | string
    tanggalProses?: DateTimeFilter<"Rekomendasi"> | Date | string
    prioritas1Deskripsi?: StringFilter<"Rekomendasi"> | string
    prioritas1Skor?: FloatFilter<"Rekomendasi"> | number
    laporanLengkap?: JsonNullableFilter<"Rekomendasi">
    processedByUserId?: StringFilter<"Rekomendasi"> | string
    processedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    masukanWarga?: RekomendasiMasukanListRelationFilter
  }

  export type RekomendasiOrderByWithRelationInput = {
    id?: SortOrder
    judul?: SortOrder
    tanggalProses?: SortOrder
    prioritas1Deskripsi?: SortOrder
    prioritas1Skor?: SortOrder
    laporanLengkap?: SortOrderInput | SortOrder
    processedByUserId?: SortOrder
    processedBy?: UserOrderByWithRelationInput
    masukanWarga?: RekomendasiMasukanOrderByRelationAggregateInput
  }

  export type RekomendasiWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RekomendasiWhereInput | RekomendasiWhereInput[]
    OR?: RekomendasiWhereInput[]
    NOT?: RekomendasiWhereInput | RekomendasiWhereInput[]
    judul?: StringFilter<"Rekomendasi"> | string
    tanggalProses?: DateTimeFilter<"Rekomendasi"> | Date | string
    prioritas1Deskripsi?: StringFilter<"Rekomendasi"> | string
    prioritas1Skor?: FloatFilter<"Rekomendasi"> | number
    laporanLengkap?: JsonNullableFilter<"Rekomendasi">
    processedByUserId?: StringFilter<"Rekomendasi"> | string
    processedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    masukanWarga?: RekomendasiMasukanListRelationFilter
  }, "id">

  export type RekomendasiOrderByWithAggregationInput = {
    id?: SortOrder
    judul?: SortOrder
    tanggalProses?: SortOrder
    prioritas1Deskripsi?: SortOrder
    prioritas1Skor?: SortOrder
    laporanLengkap?: SortOrderInput | SortOrder
    processedByUserId?: SortOrder
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
    judul?: StringWithAggregatesFilter<"Rekomendasi"> | string
    tanggalProses?: DateTimeWithAggregatesFilter<"Rekomendasi"> | Date | string
    prioritas1Deskripsi?: StringWithAggregatesFilter<"Rekomendasi"> | string
    prioritas1Skor?: FloatWithAggregatesFilter<"Rekomendasi"> | number
    laporanLengkap?: JsonNullableWithAggregatesFilter<"Rekomendasi">
    processedByUserId?: StringWithAggregatesFilter<"Rekomendasi"> | string
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
    masukanVerifikasi?: MasukanWargaCreateNestedManyWithoutVerifiedByInput
    rekomendasiDiproses?: RekomendasiCreateNestedManyWithoutProcessedByInput
    dataMasterUpdate?: DataMasterCreateNestedManyWithoutUpdatedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
    masukanVerifikasi?: MasukanWargaUncheckedCreateNestedManyWithoutVerifiedByInput
    rekomendasiDiproses?: RekomendasiUncheckedCreateNestedManyWithoutProcessedByInput
    dataMasterUpdate?: DataMasterUncheckedCreateNestedManyWithoutUpdatedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    masukanVerifikasi?: MasukanWargaUpdateManyWithoutVerifiedByNestedInput
    rekomendasiDiproses?: RekomendasiUpdateManyWithoutProcessedByNestedInput
    dataMasterUpdate?: DataMasterUpdateManyWithoutUpdatedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    masukanVerifikasi?: MasukanWargaUncheckedUpdateManyWithoutVerifiedByNestedInput
    rekomendasiDiproses?: RekomendasiUncheckedUpdateManyWithoutProcessedByNestedInput
    dataMasterUpdate?: DataMasterUncheckedUpdateManyWithoutUpdatedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type KategoriCreateInput = {
    id?: string
    namaKategori: string
    deskripsi?: string | null
    status?: $Enums.StatusKategori
    createdAt?: Date | string
    masukanWarga?: MasukanWargaCreateNestedManyWithoutKategoriInput
  }

  export type KategoriUncheckedCreateInput = {
    id?: string
    namaKategori: string
    deskripsi?: string | null
    status?: $Enums.StatusKategori
    createdAt?: Date | string
    masukanWarga?: MasukanWargaUncheckedCreateNestedManyWithoutKategoriInput
  }

  export type KategoriUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaKategori?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKategoriFieldUpdateOperationsInput | $Enums.StatusKategori
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukanWarga?: MasukanWargaUpdateManyWithoutKategoriNestedInput
  }

  export type KategoriUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaKategori?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKategoriFieldUpdateOperationsInput | $Enums.StatusKategori
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    masukanWarga?: MasukanWargaUncheckedUpdateManyWithoutKategoriNestedInput
  }

  export type KategoriCreateManyInput = {
    id?: string
    namaKategori: string
    deskripsi?: string | null
    status?: $Enums.StatusKategori
    createdAt?: Date | string
  }

  export type KategoriUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaKategori?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKategoriFieldUpdateOperationsInput | $Enums.StatusKategori
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KategoriUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaKategori?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKategoriFieldUpdateOperationsInput | $Enums.StatusKategori
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasukanWargaCreateInput = {
    id?: string
    namaPengirim: string
    emailPengirim: string
    lokasiRt: string
    lokasiRw: string
    deskripsiMasukan: string
    status?: $Enums.MasukanStatus
    alasanPenolakan?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    kategori: KategoriCreateNestedOneWithoutMasukanWargaInput
    verifiedBy?: UserCreateNestedOneWithoutMasukanVerifikasiInput
    rekomendasi?: RekomendasiMasukanCreateNestedManyWithoutMasukanInput
  }

  export type MasukanWargaUncheckedCreateInput = {
    id?: string
    namaPengirim: string
    emailPengirim: string
    lokasiRt: string
    lokasiRw: string
    deskripsiMasukan: string
    status?: $Enums.MasukanStatus
    alasanPenolakan?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    kategoriId: string
    verifiedByUserId?: string | null
    rekomendasi?: RekomendasiMasukanUncheckedCreateNestedManyWithoutMasukanInput
  }

  export type MasukanWargaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengirim?: StringFieldUpdateOperationsInput | string
    emailPengirim?: StringFieldUpdateOperationsInput | string
    lokasiRt?: StringFieldUpdateOperationsInput | string
    lokasiRw?: StringFieldUpdateOperationsInput | string
    deskripsiMasukan?: StringFieldUpdateOperationsInput | string
    status?: EnumMasukanStatusFieldUpdateOperationsInput | $Enums.MasukanStatus
    alasanPenolakan?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kategori?: KategoriUpdateOneRequiredWithoutMasukanWargaNestedInput
    verifiedBy?: UserUpdateOneWithoutMasukanVerifikasiNestedInput
    rekomendasi?: RekomendasiMasukanUpdateManyWithoutMasukanNestedInput
  }

  export type MasukanWargaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengirim?: StringFieldUpdateOperationsInput | string
    emailPengirim?: StringFieldUpdateOperationsInput | string
    lokasiRt?: StringFieldUpdateOperationsInput | string
    lokasiRw?: StringFieldUpdateOperationsInput | string
    deskripsiMasukan?: StringFieldUpdateOperationsInput | string
    status?: EnumMasukanStatusFieldUpdateOperationsInput | $Enums.MasukanStatus
    alasanPenolakan?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kategoriId?: StringFieldUpdateOperationsInput | string
    verifiedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    rekomendasi?: RekomendasiMasukanUncheckedUpdateManyWithoutMasukanNestedInput
  }

  export type MasukanWargaCreateManyInput = {
    id?: string
    namaPengirim: string
    emailPengirim: string
    lokasiRt: string
    lokasiRw: string
    deskripsiMasukan: string
    status?: $Enums.MasukanStatus
    alasanPenolakan?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    kategoriId: string
    verifiedByUserId?: string | null
  }

  export type MasukanWargaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengirim?: StringFieldUpdateOperationsInput | string
    emailPengirim?: StringFieldUpdateOperationsInput | string
    lokasiRt?: StringFieldUpdateOperationsInput | string
    lokasiRw?: StringFieldUpdateOperationsInput | string
    deskripsiMasukan?: StringFieldUpdateOperationsInput | string
    status?: EnumMasukanStatusFieldUpdateOperationsInput | $Enums.MasukanStatus
    alasanPenolakan?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MasukanWargaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengirim?: StringFieldUpdateOperationsInput | string
    emailPengirim?: StringFieldUpdateOperationsInput | string
    lokasiRt?: StringFieldUpdateOperationsInput | string
    lokasiRw?: StringFieldUpdateOperationsInput | string
    deskripsiMasukan?: StringFieldUpdateOperationsInput | string
    status?: EnumMasukanStatusFieldUpdateOperationsInput | $Enums.MasukanStatus
    alasanPenolakan?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kategoriId?: StringFieldUpdateOperationsInput | string
    verifiedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DataMasterCreateInput = {
    id?: string
    jenisData: $Enums.JenisDataMaster
    namaAtribut: string
    nilai: string
    jumlah: number
    lokasiRt?: string | null
    lokasiRw?: string | null
    updatedAt?: Date | string
    updatedBy: UserCreateNestedOneWithoutDataMasterUpdateInput
  }

  export type DataMasterUncheckedCreateInput = {
    id?: string
    jenisData: $Enums.JenisDataMaster
    namaAtribut: string
    nilai: string
    jumlah: number
    lokasiRt?: string | null
    lokasiRw?: string | null
    updatedByUserId: string
    updatedAt?: Date | string
  }

  export type DataMasterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jenisData?: EnumJenisDataMasterFieldUpdateOperationsInput | $Enums.JenisDataMaster
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    lokasiRt?: NullableStringFieldUpdateOperationsInput | string | null
    lokasiRw?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: UserUpdateOneRequiredWithoutDataMasterUpdateNestedInput
  }

  export type DataMasterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jenisData?: EnumJenisDataMasterFieldUpdateOperationsInput | $Enums.JenisDataMaster
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    lokasiRt?: NullableStringFieldUpdateOperationsInput | string | null
    lokasiRw?: NullableStringFieldUpdateOperationsInput | string | null
    updatedByUserId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataMasterCreateManyInput = {
    id?: string
    jenisData: $Enums.JenisDataMaster
    namaAtribut: string
    nilai: string
    jumlah: number
    lokasiRt?: string | null
    lokasiRw?: string | null
    updatedByUserId: string
    updatedAt?: Date | string
  }

  export type DataMasterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jenisData?: EnumJenisDataMasterFieldUpdateOperationsInput | $Enums.JenisDataMaster
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    lokasiRt?: NullableStringFieldUpdateOperationsInput | string | null
    lokasiRw?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataMasterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jenisData?: EnumJenisDataMasterFieldUpdateOperationsInput | $Enums.JenisDataMaster
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    lokasiRt?: NullableStringFieldUpdateOperationsInput | string | null
    lokasiRw?: NullableStringFieldUpdateOperationsInput | string | null
    updatedByUserId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RekomendasiCreateInput = {
    id?: string
    judul: string
    tanggalProses?: Date | string
    prioritas1Deskripsi: string
    prioritas1Skor: number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    processedBy: UserCreateNestedOneWithoutRekomendasiDiprosesInput
    masukanWarga?: RekomendasiMasukanCreateNestedManyWithoutRekomendasiInput
  }

  export type RekomendasiUncheckedCreateInput = {
    id?: string
    judul: string
    tanggalProses?: Date | string
    prioritas1Deskripsi: string
    prioritas1Skor: number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    processedByUserId: string
    masukanWarga?: RekomendasiMasukanUncheckedCreateNestedManyWithoutRekomendasiInput
  }

  export type RekomendasiUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tanggalProses?: DateTimeFieldUpdateOperationsInput | Date | string
    prioritas1Deskripsi?: StringFieldUpdateOperationsInput | string
    prioritas1Skor?: FloatFieldUpdateOperationsInput | number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    processedBy?: UserUpdateOneRequiredWithoutRekomendasiDiprosesNestedInput
    masukanWarga?: RekomendasiMasukanUpdateManyWithoutRekomendasiNestedInput
  }

  export type RekomendasiUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tanggalProses?: DateTimeFieldUpdateOperationsInput | Date | string
    prioritas1Deskripsi?: StringFieldUpdateOperationsInput | string
    prioritas1Skor?: FloatFieldUpdateOperationsInput | number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    processedByUserId?: StringFieldUpdateOperationsInput | string
    masukanWarga?: RekomendasiMasukanUncheckedUpdateManyWithoutRekomendasiNestedInput
  }

  export type RekomendasiCreateManyInput = {
    id?: string
    judul: string
    tanggalProses?: Date | string
    prioritas1Deskripsi: string
    prioritas1Skor: number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    processedByUserId: string
  }

  export type RekomendasiUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tanggalProses?: DateTimeFieldUpdateOperationsInput | Date | string
    prioritas1Deskripsi?: StringFieldUpdateOperationsInput | string
    prioritas1Skor?: FloatFieldUpdateOperationsInput | number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RekomendasiUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tanggalProses?: DateTimeFieldUpdateOperationsInput | Date | string
    prioritas1Deskripsi?: StringFieldUpdateOperationsInput | string
    prioritas1Skor?: FloatFieldUpdateOperationsInput | number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    processedByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type RekomendasiMasukanCreateInput = {
    rekomendasi: RekomendasiCreateNestedOneWithoutMasukanWargaInput
    masukan: MasukanWargaCreateNestedOneWithoutRekomendasiInput
  }

  export type RekomendasiMasukanUncheckedCreateInput = {
    rekomendasiId: string
    masukanId: string
  }

  export type RekomendasiMasukanUpdateInput = {
    rekomendasi?: RekomendasiUpdateOneRequiredWithoutMasukanWargaNestedInput
    masukan?: MasukanWargaUpdateOneRequiredWithoutRekomendasiNestedInput
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type MasukanWargaListRelationFilter = {
    every?: MasukanWargaWhereInput
    some?: MasukanWargaWhereInput
    none?: MasukanWargaWhereInput
  }

  export type RekomendasiListRelationFilter = {
    every?: RekomendasiWhereInput
    some?: RekomendasiWhereInput
    none?: RekomendasiWhereInput
  }

  export type DataMasterListRelationFilter = {
    every?: DataMasterWhereInput
    some?: DataMasterWhereInput
    none?: DataMasterWhereInput
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MasukanWargaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RekomendasiOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DataMasterOrderByRelationAggregateInput = {
    _count?: SortOrder
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
    phoneNumberVerified?: SortOrder
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
    phoneNumberVerified?: SortOrder
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
    phoneNumberVerified?: SortOrder
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type EnumStatusKategoriFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKategori | EnumStatusKategoriFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKategori[] | ListEnumStatusKategoriFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKategori[] | ListEnumStatusKategoriFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKategoriFilter<$PrismaModel> | $Enums.StatusKategori
  }

  export type KategoriCountOrderByAggregateInput = {
    id?: SortOrder
    namaKategori?: SortOrder
    deskripsi?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type KategoriMaxOrderByAggregateInput = {
    id?: SortOrder
    namaKategori?: SortOrder
    deskripsi?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type KategoriMinOrderByAggregateInput = {
    id?: SortOrder
    namaKategori?: SortOrder
    deskripsi?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumStatusKategoriWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKategori | EnumStatusKategoriFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKategori[] | ListEnumStatusKategoriFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKategori[] | ListEnumStatusKategoriFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKategoriWithAggregatesFilter<$PrismaModel> | $Enums.StatusKategori
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusKategoriFilter<$PrismaModel>
    _max?: NestedEnumStatusKategoriFilter<$PrismaModel>
  }

  export type EnumMasukanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MasukanStatus | EnumMasukanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MasukanStatus[] | ListEnumMasukanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MasukanStatus[] | ListEnumMasukanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMasukanStatusFilter<$PrismaModel> | $Enums.MasukanStatus
  }

  export type KategoriScalarRelationFilter = {
    is?: KategoriWhereInput
    isNot?: KategoriWhereInput
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
    namaPengirim?: SortOrder
    emailPengirim?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    deskripsiMasukan?: SortOrder
    status?: SortOrder
    alasanPenolakan?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    kategoriId?: SortOrder
    verifiedByUserId?: SortOrder
  }

  export type MasukanWargaMaxOrderByAggregateInput = {
    id?: SortOrder
    namaPengirim?: SortOrder
    emailPengirim?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    deskripsiMasukan?: SortOrder
    status?: SortOrder
    alasanPenolakan?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    kategoriId?: SortOrder
    verifiedByUserId?: SortOrder
  }

  export type MasukanWargaMinOrderByAggregateInput = {
    id?: SortOrder
    namaPengirim?: SortOrder
    emailPengirim?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    deskripsiMasukan?: SortOrder
    status?: SortOrder
    alasanPenolakan?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    kategoriId?: SortOrder
    verifiedByUserId?: SortOrder
  }

  export type EnumMasukanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MasukanStatus | EnumMasukanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MasukanStatus[] | ListEnumMasukanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MasukanStatus[] | ListEnumMasukanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMasukanStatusWithAggregatesFilter<$PrismaModel> | $Enums.MasukanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMasukanStatusFilter<$PrismaModel>
    _max?: NestedEnumMasukanStatusFilter<$PrismaModel>
  }

  export type EnumJenisDataMasterFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisDataMaster | EnumJenisDataMasterFieldRefInput<$PrismaModel>
    in?: $Enums.JenisDataMaster[] | ListEnumJenisDataMasterFieldRefInput<$PrismaModel>
    notIn?: $Enums.JenisDataMaster[] | ListEnumJenisDataMasterFieldRefInput<$PrismaModel>
    not?: NestedEnumJenisDataMasterFilter<$PrismaModel> | $Enums.JenisDataMaster
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DataMasterJenisDataNamaAtributLokasiRtLokasiRwCompoundUniqueInput = {
    jenisData: $Enums.JenisDataMaster
    namaAtribut: string
    lokasiRt: string
    lokasiRw: string
  }

  export type DataMasterCountOrderByAggregateInput = {
    id?: SortOrder
    jenisData?: SortOrder
    namaAtribut?: SortOrder
    nilai?: SortOrder
    jumlah?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    updatedByUserId?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataMasterAvgOrderByAggregateInput = {
    jumlah?: SortOrder
  }

  export type DataMasterMaxOrderByAggregateInput = {
    id?: SortOrder
    jenisData?: SortOrder
    namaAtribut?: SortOrder
    nilai?: SortOrder
    jumlah?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    updatedByUserId?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataMasterMinOrderByAggregateInput = {
    id?: SortOrder
    jenisData?: SortOrder
    namaAtribut?: SortOrder
    nilai?: SortOrder
    jumlah?: SortOrder
    lokasiRt?: SortOrder
    lokasiRw?: SortOrder
    updatedByUserId?: SortOrder
    updatedAt?: SortOrder
  }

  export type DataMasterSumOrderByAggregateInput = {
    jumlah?: SortOrder
  }

  export type EnumJenisDataMasterWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisDataMaster | EnumJenisDataMasterFieldRefInput<$PrismaModel>
    in?: $Enums.JenisDataMaster[] | ListEnumJenisDataMasterFieldRefInput<$PrismaModel>
    notIn?: $Enums.JenisDataMaster[] | ListEnumJenisDataMasterFieldRefInput<$PrismaModel>
    not?: NestedEnumJenisDataMasterWithAggregatesFilter<$PrismaModel> | $Enums.JenisDataMaster
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJenisDataMasterFilter<$PrismaModel>
    _max?: NestedEnumJenisDataMasterFilter<$PrismaModel>
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
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
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

  export type RekomendasiCountOrderByAggregateInput = {
    id?: SortOrder
    judul?: SortOrder
    tanggalProses?: SortOrder
    prioritas1Deskripsi?: SortOrder
    prioritas1Skor?: SortOrder
    laporanLengkap?: SortOrder
    processedByUserId?: SortOrder
  }

  export type RekomendasiAvgOrderByAggregateInput = {
    prioritas1Skor?: SortOrder
  }

  export type RekomendasiMaxOrderByAggregateInput = {
    id?: SortOrder
    judul?: SortOrder
    tanggalProses?: SortOrder
    prioritas1Deskripsi?: SortOrder
    prioritas1Skor?: SortOrder
    processedByUserId?: SortOrder
  }

  export type RekomendasiMinOrderByAggregateInput = {
    id?: SortOrder
    judul?: SortOrder
    tanggalProses?: SortOrder
    prioritas1Deskripsi?: SortOrder
    prioritas1Skor?: SortOrder
    processedByUserId?: SortOrder
  }

  export type RekomendasiSumOrderByAggregateInput = {
    prioritas1Skor?: SortOrder
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
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
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

  export type MasukanWargaCreateNestedManyWithoutVerifiedByInput = {
    create?: XOR<MasukanWargaCreateWithoutVerifiedByInput, MasukanWargaUncheckedCreateWithoutVerifiedByInput> | MasukanWargaCreateWithoutVerifiedByInput[] | MasukanWargaUncheckedCreateWithoutVerifiedByInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutVerifiedByInput | MasukanWargaCreateOrConnectWithoutVerifiedByInput[]
    createMany?: MasukanWargaCreateManyVerifiedByInputEnvelope
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
  }

  export type RekomendasiCreateNestedManyWithoutProcessedByInput = {
    create?: XOR<RekomendasiCreateWithoutProcessedByInput, RekomendasiUncheckedCreateWithoutProcessedByInput> | RekomendasiCreateWithoutProcessedByInput[] | RekomendasiUncheckedCreateWithoutProcessedByInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutProcessedByInput | RekomendasiCreateOrConnectWithoutProcessedByInput[]
    createMany?: RekomendasiCreateManyProcessedByInputEnvelope
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
  }

  export type DataMasterCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<DataMasterCreateWithoutUpdatedByInput, DataMasterUncheckedCreateWithoutUpdatedByInput> | DataMasterCreateWithoutUpdatedByInput[] | DataMasterUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: DataMasterCreateOrConnectWithoutUpdatedByInput | DataMasterCreateOrConnectWithoutUpdatedByInput[]
    createMany?: DataMasterCreateManyUpdatedByInputEnvelope
    connect?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
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

  export type MasukanWargaUncheckedCreateNestedManyWithoutVerifiedByInput = {
    create?: XOR<MasukanWargaCreateWithoutVerifiedByInput, MasukanWargaUncheckedCreateWithoutVerifiedByInput> | MasukanWargaCreateWithoutVerifiedByInput[] | MasukanWargaUncheckedCreateWithoutVerifiedByInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutVerifiedByInput | MasukanWargaCreateOrConnectWithoutVerifiedByInput[]
    createMany?: MasukanWargaCreateManyVerifiedByInputEnvelope
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
  }

  export type RekomendasiUncheckedCreateNestedManyWithoutProcessedByInput = {
    create?: XOR<RekomendasiCreateWithoutProcessedByInput, RekomendasiUncheckedCreateWithoutProcessedByInput> | RekomendasiCreateWithoutProcessedByInput[] | RekomendasiUncheckedCreateWithoutProcessedByInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutProcessedByInput | RekomendasiCreateOrConnectWithoutProcessedByInput[]
    createMany?: RekomendasiCreateManyProcessedByInputEnvelope
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
  }

  export type DataMasterUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<DataMasterCreateWithoutUpdatedByInput, DataMasterUncheckedCreateWithoutUpdatedByInput> | DataMasterCreateWithoutUpdatedByInput[] | DataMasterUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: DataMasterCreateOrConnectWithoutUpdatedByInput | DataMasterCreateOrConnectWithoutUpdatedByInput[]
    createMany?: DataMasterCreateManyUpdatedByInputEnvelope
    connect?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type MasukanWargaUpdateManyWithoutVerifiedByNestedInput = {
    create?: XOR<MasukanWargaCreateWithoutVerifiedByInput, MasukanWargaUncheckedCreateWithoutVerifiedByInput> | MasukanWargaCreateWithoutVerifiedByInput[] | MasukanWargaUncheckedCreateWithoutVerifiedByInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutVerifiedByInput | MasukanWargaCreateOrConnectWithoutVerifiedByInput[]
    upsert?: MasukanWargaUpsertWithWhereUniqueWithoutVerifiedByInput | MasukanWargaUpsertWithWhereUniqueWithoutVerifiedByInput[]
    createMany?: MasukanWargaCreateManyVerifiedByInputEnvelope
    set?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    disconnect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    delete?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    update?: MasukanWargaUpdateWithWhereUniqueWithoutVerifiedByInput | MasukanWargaUpdateWithWhereUniqueWithoutVerifiedByInput[]
    updateMany?: MasukanWargaUpdateManyWithWhereWithoutVerifiedByInput | MasukanWargaUpdateManyWithWhereWithoutVerifiedByInput[]
    deleteMany?: MasukanWargaScalarWhereInput | MasukanWargaScalarWhereInput[]
  }

  export type RekomendasiUpdateManyWithoutProcessedByNestedInput = {
    create?: XOR<RekomendasiCreateWithoutProcessedByInput, RekomendasiUncheckedCreateWithoutProcessedByInput> | RekomendasiCreateWithoutProcessedByInput[] | RekomendasiUncheckedCreateWithoutProcessedByInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutProcessedByInput | RekomendasiCreateOrConnectWithoutProcessedByInput[]
    upsert?: RekomendasiUpsertWithWhereUniqueWithoutProcessedByInput | RekomendasiUpsertWithWhereUniqueWithoutProcessedByInput[]
    createMany?: RekomendasiCreateManyProcessedByInputEnvelope
    set?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    disconnect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    delete?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    update?: RekomendasiUpdateWithWhereUniqueWithoutProcessedByInput | RekomendasiUpdateWithWhereUniqueWithoutProcessedByInput[]
    updateMany?: RekomendasiUpdateManyWithWhereWithoutProcessedByInput | RekomendasiUpdateManyWithWhereWithoutProcessedByInput[]
    deleteMany?: RekomendasiScalarWhereInput | RekomendasiScalarWhereInput[]
  }

  export type DataMasterUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<DataMasterCreateWithoutUpdatedByInput, DataMasterUncheckedCreateWithoutUpdatedByInput> | DataMasterCreateWithoutUpdatedByInput[] | DataMasterUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: DataMasterCreateOrConnectWithoutUpdatedByInput | DataMasterCreateOrConnectWithoutUpdatedByInput[]
    upsert?: DataMasterUpsertWithWhereUniqueWithoutUpdatedByInput | DataMasterUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: DataMasterCreateManyUpdatedByInputEnvelope
    set?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    disconnect?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    delete?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    connect?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    update?: DataMasterUpdateWithWhereUniqueWithoutUpdatedByInput | DataMasterUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: DataMasterUpdateManyWithWhereWithoutUpdatedByInput | DataMasterUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: DataMasterScalarWhereInput | DataMasterScalarWhereInput[]
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

  export type MasukanWargaUncheckedUpdateManyWithoutVerifiedByNestedInput = {
    create?: XOR<MasukanWargaCreateWithoutVerifiedByInput, MasukanWargaUncheckedCreateWithoutVerifiedByInput> | MasukanWargaCreateWithoutVerifiedByInput[] | MasukanWargaUncheckedCreateWithoutVerifiedByInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutVerifiedByInput | MasukanWargaCreateOrConnectWithoutVerifiedByInput[]
    upsert?: MasukanWargaUpsertWithWhereUniqueWithoutVerifiedByInput | MasukanWargaUpsertWithWhereUniqueWithoutVerifiedByInput[]
    createMany?: MasukanWargaCreateManyVerifiedByInputEnvelope
    set?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    disconnect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    delete?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    update?: MasukanWargaUpdateWithWhereUniqueWithoutVerifiedByInput | MasukanWargaUpdateWithWhereUniqueWithoutVerifiedByInput[]
    updateMany?: MasukanWargaUpdateManyWithWhereWithoutVerifiedByInput | MasukanWargaUpdateManyWithWhereWithoutVerifiedByInput[]
    deleteMany?: MasukanWargaScalarWhereInput | MasukanWargaScalarWhereInput[]
  }

  export type RekomendasiUncheckedUpdateManyWithoutProcessedByNestedInput = {
    create?: XOR<RekomendasiCreateWithoutProcessedByInput, RekomendasiUncheckedCreateWithoutProcessedByInput> | RekomendasiCreateWithoutProcessedByInput[] | RekomendasiUncheckedCreateWithoutProcessedByInput[]
    connectOrCreate?: RekomendasiCreateOrConnectWithoutProcessedByInput | RekomendasiCreateOrConnectWithoutProcessedByInput[]
    upsert?: RekomendasiUpsertWithWhereUniqueWithoutProcessedByInput | RekomendasiUpsertWithWhereUniqueWithoutProcessedByInput[]
    createMany?: RekomendasiCreateManyProcessedByInputEnvelope
    set?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    disconnect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    delete?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    connect?: RekomendasiWhereUniqueInput | RekomendasiWhereUniqueInput[]
    update?: RekomendasiUpdateWithWhereUniqueWithoutProcessedByInput | RekomendasiUpdateWithWhereUniqueWithoutProcessedByInput[]
    updateMany?: RekomendasiUpdateManyWithWhereWithoutProcessedByInput | RekomendasiUpdateManyWithWhereWithoutProcessedByInput[]
    deleteMany?: RekomendasiScalarWhereInput | RekomendasiScalarWhereInput[]
  }

  export type DataMasterUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<DataMasterCreateWithoutUpdatedByInput, DataMasterUncheckedCreateWithoutUpdatedByInput> | DataMasterCreateWithoutUpdatedByInput[] | DataMasterUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: DataMasterCreateOrConnectWithoutUpdatedByInput | DataMasterCreateOrConnectWithoutUpdatedByInput[]
    upsert?: DataMasterUpsertWithWhereUniqueWithoutUpdatedByInput | DataMasterUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: DataMasterCreateManyUpdatedByInputEnvelope
    set?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    disconnect?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    delete?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    connect?: DataMasterWhereUniqueInput | DataMasterWhereUniqueInput[]
    update?: DataMasterUpdateWithWhereUniqueWithoutUpdatedByInput | DataMasterUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: DataMasterUpdateManyWithWhereWithoutUpdatedByInput | DataMasterUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: DataMasterScalarWhereInput | DataMasterScalarWhereInput[]
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

  export type MasukanWargaCreateNestedManyWithoutKategoriInput = {
    create?: XOR<MasukanWargaCreateWithoutKategoriInput, MasukanWargaUncheckedCreateWithoutKategoriInput> | MasukanWargaCreateWithoutKategoriInput[] | MasukanWargaUncheckedCreateWithoutKategoriInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutKategoriInput | MasukanWargaCreateOrConnectWithoutKategoriInput[]
    createMany?: MasukanWargaCreateManyKategoriInputEnvelope
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
  }

  export type MasukanWargaUncheckedCreateNestedManyWithoutKategoriInput = {
    create?: XOR<MasukanWargaCreateWithoutKategoriInput, MasukanWargaUncheckedCreateWithoutKategoriInput> | MasukanWargaCreateWithoutKategoriInput[] | MasukanWargaUncheckedCreateWithoutKategoriInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutKategoriInput | MasukanWargaCreateOrConnectWithoutKategoriInput[]
    createMany?: MasukanWargaCreateManyKategoriInputEnvelope
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
  }

  export type EnumStatusKategoriFieldUpdateOperationsInput = {
    set?: $Enums.StatusKategori
  }

  export type MasukanWargaUpdateManyWithoutKategoriNestedInput = {
    create?: XOR<MasukanWargaCreateWithoutKategoriInput, MasukanWargaUncheckedCreateWithoutKategoriInput> | MasukanWargaCreateWithoutKategoriInput[] | MasukanWargaUncheckedCreateWithoutKategoriInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutKategoriInput | MasukanWargaCreateOrConnectWithoutKategoriInput[]
    upsert?: MasukanWargaUpsertWithWhereUniqueWithoutKategoriInput | MasukanWargaUpsertWithWhereUniqueWithoutKategoriInput[]
    createMany?: MasukanWargaCreateManyKategoriInputEnvelope
    set?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    disconnect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    delete?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    update?: MasukanWargaUpdateWithWhereUniqueWithoutKategoriInput | MasukanWargaUpdateWithWhereUniqueWithoutKategoriInput[]
    updateMany?: MasukanWargaUpdateManyWithWhereWithoutKategoriInput | MasukanWargaUpdateManyWithWhereWithoutKategoriInput[]
    deleteMany?: MasukanWargaScalarWhereInput | MasukanWargaScalarWhereInput[]
  }

  export type MasukanWargaUncheckedUpdateManyWithoutKategoriNestedInput = {
    create?: XOR<MasukanWargaCreateWithoutKategoriInput, MasukanWargaUncheckedCreateWithoutKategoriInput> | MasukanWargaCreateWithoutKategoriInput[] | MasukanWargaUncheckedCreateWithoutKategoriInput[]
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutKategoriInput | MasukanWargaCreateOrConnectWithoutKategoriInput[]
    upsert?: MasukanWargaUpsertWithWhereUniqueWithoutKategoriInput | MasukanWargaUpsertWithWhereUniqueWithoutKategoriInput[]
    createMany?: MasukanWargaCreateManyKategoriInputEnvelope
    set?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    disconnect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    delete?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    connect?: MasukanWargaWhereUniqueInput | MasukanWargaWhereUniqueInput[]
    update?: MasukanWargaUpdateWithWhereUniqueWithoutKategoriInput | MasukanWargaUpdateWithWhereUniqueWithoutKategoriInput[]
    updateMany?: MasukanWargaUpdateManyWithWhereWithoutKategoriInput | MasukanWargaUpdateManyWithWhereWithoutKategoriInput[]
    deleteMany?: MasukanWargaScalarWhereInput | MasukanWargaScalarWhereInput[]
  }

  export type KategoriCreateNestedOneWithoutMasukanWargaInput = {
    create?: XOR<KategoriCreateWithoutMasukanWargaInput, KategoriUncheckedCreateWithoutMasukanWargaInput>
    connectOrCreate?: KategoriCreateOrConnectWithoutMasukanWargaInput
    connect?: KategoriWhereUniqueInput
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

  export type EnumMasukanStatusFieldUpdateOperationsInput = {
    set?: $Enums.MasukanStatus
  }

  export type KategoriUpdateOneRequiredWithoutMasukanWargaNestedInput = {
    create?: XOR<KategoriCreateWithoutMasukanWargaInput, KategoriUncheckedCreateWithoutMasukanWargaInput>
    connectOrCreate?: KategoriCreateOrConnectWithoutMasukanWargaInput
    upsert?: KategoriUpsertWithoutMasukanWargaInput
    connect?: KategoriWhereUniqueInput
    update?: XOR<XOR<KategoriUpdateToOneWithWhereWithoutMasukanWargaInput, KategoriUpdateWithoutMasukanWargaInput>, KategoriUncheckedUpdateWithoutMasukanWargaInput>
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

  export type UserCreateNestedOneWithoutDataMasterUpdateInput = {
    create?: XOR<UserCreateWithoutDataMasterUpdateInput, UserUncheckedCreateWithoutDataMasterUpdateInput>
    connectOrCreate?: UserCreateOrConnectWithoutDataMasterUpdateInput
    connect?: UserWhereUniqueInput
  }

  export type EnumJenisDataMasterFieldUpdateOperationsInput = {
    set?: $Enums.JenisDataMaster
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutDataMasterUpdateNestedInput = {
    create?: XOR<UserCreateWithoutDataMasterUpdateInput, UserUncheckedCreateWithoutDataMasterUpdateInput>
    connectOrCreate?: UserCreateOrConnectWithoutDataMasterUpdateInput
    upsert?: UserUpsertWithoutDataMasterUpdateInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDataMasterUpdateInput, UserUpdateWithoutDataMasterUpdateInput>, UserUncheckedUpdateWithoutDataMasterUpdateInput>
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

  export type UserUpdateOneRequiredWithoutRekomendasiDiprosesNestedInput = {
    create?: XOR<UserCreateWithoutRekomendasiDiprosesInput, UserUncheckedCreateWithoutRekomendasiDiprosesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRekomendasiDiprosesInput
    upsert?: UserUpsertWithoutRekomendasiDiprosesInput
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

  export type RekomendasiCreateNestedOneWithoutMasukanWargaInput = {
    create?: XOR<RekomendasiCreateWithoutMasukanWargaInput, RekomendasiUncheckedCreateWithoutMasukanWargaInput>
    connectOrCreate?: RekomendasiCreateOrConnectWithoutMasukanWargaInput
    connect?: RekomendasiWhereUniqueInput
  }

  export type MasukanWargaCreateNestedOneWithoutRekomendasiInput = {
    create?: XOR<MasukanWargaCreateWithoutRekomendasiInput, MasukanWargaUncheckedCreateWithoutRekomendasiInput>
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutRekomendasiInput
    connect?: MasukanWargaWhereUniqueInput
  }

  export type RekomendasiUpdateOneRequiredWithoutMasukanWargaNestedInput = {
    create?: XOR<RekomendasiCreateWithoutMasukanWargaInput, RekomendasiUncheckedCreateWithoutMasukanWargaInput>
    connectOrCreate?: RekomendasiCreateOrConnectWithoutMasukanWargaInput
    upsert?: RekomendasiUpsertWithoutMasukanWargaInput
    connect?: RekomendasiWhereUniqueInput
    update?: XOR<XOR<RekomendasiUpdateToOneWithWhereWithoutMasukanWargaInput, RekomendasiUpdateWithoutMasukanWargaInput>, RekomendasiUncheckedUpdateWithoutMasukanWargaInput>
  }

  export type MasukanWargaUpdateOneRequiredWithoutRekomendasiNestedInput = {
    create?: XOR<MasukanWargaCreateWithoutRekomendasiInput, MasukanWargaUncheckedCreateWithoutRekomendasiInput>
    connectOrCreate?: MasukanWargaCreateOrConnectWithoutRekomendasiInput
    upsert?: MasukanWargaUpsertWithoutRekomendasiInput
    connect?: MasukanWargaWhereUniqueInput
    update?: XOR<XOR<MasukanWargaUpdateToOneWithWhereWithoutRekomendasiInput, MasukanWargaUpdateWithoutRekomendasiInput>, MasukanWargaUncheckedUpdateWithoutRekomendasiInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatusKategoriFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKategori | EnumStatusKategoriFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKategori[] | ListEnumStatusKategoriFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKategori[] | ListEnumStatusKategoriFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKategoriFilter<$PrismaModel> | $Enums.StatusKategori
  }

  export type NestedEnumStatusKategoriWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKategori | EnumStatusKategoriFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKategori[] | ListEnumStatusKategoriFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKategori[] | ListEnumStatusKategoriFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKategoriWithAggregatesFilter<$PrismaModel> | $Enums.StatusKategori
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusKategoriFilter<$PrismaModel>
    _max?: NestedEnumStatusKategoriFilter<$PrismaModel>
  }

  export type NestedEnumMasukanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MasukanStatus | EnumMasukanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MasukanStatus[] | ListEnumMasukanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MasukanStatus[] | ListEnumMasukanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMasukanStatusFilter<$PrismaModel> | $Enums.MasukanStatus
  }

  export type NestedEnumMasukanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MasukanStatus | EnumMasukanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MasukanStatus[] | ListEnumMasukanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MasukanStatus[] | ListEnumMasukanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMasukanStatusWithAggregatesFilter<$PrismaModel> | $Enums.MasukanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMasukanStatusFilter<$PrismaModel>
    _max?: NestedEnumMasukanStatusFilter<$PrismaModel>
  }

  export type NestedEnumJenisDataMasterFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisDataMaster | EnumJenisDataMasterFieldRefInput<$PrismaModel>
    in?: $Enums.JenisDataMaster[] | ListEnumJenisDataMasterFieldRefInput<$PrismaModel>
    notIn?: $Enums.JenisDataMaster[] | ListEnumJenisDataMasterFieldRefInput<$PrismaModel>
    not?: NestedEnumJenisDataMasterFilter<$PrismaModel> | $Enums.JenisDataMaster
  }

  export type NestedEnumJenisDataMasterWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JenisDataMaster | EnumJenisDataMasterFieldRefInput<$PrismaModel>
    in?: $Enums.JenisDataMaster[] | ListEnumJenisDataMasterFieldRefInput<$PrismaModel>
    notIn?: $Enums.JenisDataMaster[] | ListEnumJenisDataMasterFieldRefInput<$PrismaModel>
    not?: NestedEnumJenisDataMasterWithAggregatesFilter<$PrismaModel> | $Enums.JenisDataMaster
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJenisDataMasterFilter<$PrismaModel>
    _max?: NestedEnumJenisDataMasterFilter<$PrismaModel>
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
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
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

  export type MasukanWargaCreateWithoutVerifiedByInput = {
    id?: string
    namaPengirim: string
    emailPengirim: string
    lokasiRt: string
    lokasiRw: string
    deskripsiMasukan: string
    status?: $Enums.MasukanStatus
    alasanPenolakan?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    kategori: KategoriCreateNestedOneWithoutMasukanWargaInput
    rekomendasi?: RekomendasiMasukanCreateNestedManyWithoutMasukanInput
  }

  export type MasukanWargaUncheckedCreateWithoutVerifiedByInput = {
    id?: string
    namaPengirim: string
    emailPengirim: string
    lokasiRt: string
    lokasiRw: string
    deskripsiMasukan: string
    status?: $Enums.MasukanStatus
    alasanPenolakan?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    kategoriId: string
    rekomendasi?: RekomendasiMasukanUncheckedCreateNestedManyWithoutMasukanInput
  }

  export type MasukanWargaCreateOrConnectWithoutVerifiedByInput = {
    where: MasukanWargaWhereUniqueInput
    create: XOR<MasukanWargaCreateWithoutVerifiedByInput, MasukanWargaUncheckedCreateWithoutVerifiedByInput>
  }

  export type MasukanWargaCreateManyVerifiedByInputEnvelope = {
    data: MasukanWargaCreateManyVerifiedByInput | MasukanWargaCreateManyVerifiedByInput[]
    skipDuplicates?: boolean
  }

  export type RekomendasiCreateWithoutProcessedByInput = {
    id?: string
    judul: string
    tanggalProses?: Date | string
    prioritas1Deskripsi: string
    prioritas1Skor: number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    masukanWarga?: RekomendasiMasukanCreateNestedManyWithoutRekomendasiInput
  }

  export type RekomendasiUncheckedCreateWithoutProcessedByInput = {
    id?: string
    judul: string
    tanggalProses?: Date | string
    prioritas1Deskripsi: string
    prioritas1Skor: number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    masukanWarga?: RekomendasiMasukanUncheckedCreateNestedManyWithoutRekomendasiInput
  }

  export type RekomendasiCreateOrConnectWithoutProcessedByInput = {
    where: RekomendasiWhereUniqueInput
    create: XOR<RekomendasiCreateWithoutProcessedByInput, RekomendasiUncheckedCreateWithoutProcessedByInput>
  }

  export type RekomendasiCreateManyProcessedByInputEnvelope = {
    data: RekomendasiCreateManyProcessedByInput | RekomendasiCreateManyProcessedByInput[]
    skipDuplicates?: boolean
  }

  export type DataMasterCreateWithoutUpdatedByInput = {
    id?: string
    jenisData: $Enums.JenisDataMaster
    namaAtribut: string
    nilai: string
    jumlah: number
    lokasiRt?: string | null
    lokasiRw?: string | null
    updatedAt?: Date | string
  }

  export type DataMasterUncheckedCreateWithoutUpdatedByInput = {
    id?: string
    jenisData: $Enums.JenisDataMaster
    namaAtribut: string
    nilai: string
    jumlah: number
    lokasiRt?: string | null
    lokasiRw?: string | null
    updatedAt?: Date | string
  }

  export type DataMasterCreateOrConnectWithoutUpdatedByInput = {
    where: DataMasterWhereUniqueInput
    create: XOR<DataMasterCreateWithoutUpdatedByInput, DataMasterUncheckedCreateWithoutUpdatedByInput>
  }

  export type DataMasterCreateManyUpdatedByInputEnvelope = {
    data: DataMasterCreateManyUpdatedByInput | DataMasterCreateManyUpdatedByInput[]
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

  export type MasukanWargaUpsertWithWhereUniqueWithoutVerifiedByInput = {
    where: MasukanWargaWhereUniqueInput
    update: XOR<MasukanWargaUpdateWithoutVerifiedByInput, MasukanWargaUncheckedUpdateWithoutVerifiedByInput>
    create: XOR<MasukanWargaCreateWithoutVerifiedByInput, MasukanWargaUncheckedCreateWithoutVerifiedByInput>
  }

  export type MasukanWargaUpdateWithWhereUniqueWithoutVerifiedByInput = {
    where: MasukanWargaWhereUniqueInput
    data: XOR<MasukanWargaUpdateWithoutVerifiedByInput, MasukanWargaUncheckedUpdateWithoutVerifiedByInput>
  }

  export type MasukanWargaUpdateManyWithWhereWithoutVerifiedByInput = {
    where: MasukanWargaScalarWhereInput
    data: XOR<MasukanWargaUpdateManyMutationInput, MasukanWargaUncheckedUpdateManyWithoutVerifiedByInput>
  }

  export type MasukanWargaScalarWhereInput = {
    AND?: MasukanWargaScalarWhereInput | MasukanWargaScalarWhereInput[]
    OR?: MasukanWargaScalarWhereInput[]
    NOT?: MasukanWargaScalarWhereInput | MasukanWargaScalarWhereInput[]
    id?: StringFilter<"MasukanWarga"> | string
    namaPengirim?: StringFilter<"MasukanWarga"> | string
    emailPengirim?: StringFilter<"MasukanWarga"> | string
    lokasiRt?: StringFilter<"MasukanWarga"> | string
    lokasiRw?: StringFilter<"MasukanWarga"> | string
    deskripsiMasukan?: StringFilter<"MasukanWarga"> | string
    status?: EnumMasukanStatusFilter<"MasukanWarga"> | $Enums.MasukanStatus
    alasanPenolakan?: StringNullableFilter<"MasukanWarga"> | string | null
    updatedAt?: DateTimeFilter<"MasukanWarga"> | Date | string
    createdAt?: DateTimeFilter<"MasukanWarga"> | Date | string
    kategoriId?: StringFilter<"MasukanWarga"> | string
    verifiedByUserId?: StringNullableFilter<"MasukanWarga"> | string | null
  }

  export type RekomendasiUpsertWithWhereUniqueWithoutProcessedByInput = {
    where: RekomendasiWhereUniqueInput
    update: XOR<RekomendasiUpdateWithoutProcessedByInput, RekomendasiUncheckedUpdateWithoutProcessedByInput>
    create: XOR<RekomendasiCreateWithoutProcessedByInput, RekomendasiUncheckedCreateWithoutProcessedByInput>
  }

  export type RekomendasiUpdateWithWhereUniqueWithoutProcessedByInput = {
    where: RekomendasiWhereUniqueInput
    data: XOR<RekomendasiUpdateWithoutProcessedByInput, RekomendasiUncheckedUpdateWithoutProcessedByInput>
  }

  export type RekomendasiUpdateManyWithWhereWithoutProcessedByInput = {
    where: RekomendasiScalarWhereInput
    data: XOR<RekomendasiUpdateManyMutationInput, RekomendasiUncheckedUpdateManyWithoutProcessedByInput>
  }

  export type RekomendasiScalarWhereInput = {
    AND?: RekomendasiScalarWhereInput | RekomendasiScalarWhereInput[]
    OR?: RekomendasiScalarWhereInput[]
    NOT?: RekomendasiScalarWhereInput | RekomendasiScalarWhereInput[]
    id?: StringFilter<"Rekomendasi"> | string
    judul?: StringFilter<"Rekomendasi"> | string
    tanggalProses?: DateTimeFilter<"Rekomendasi"> | Date | string
    prioritas1Deskripsi?: StringFilter<"Rekomendasi"> | string
    prioritas1Skor?: FloatFilter<"Rekomendasi"> | number
    laporanLengkap?: JsonNullableFilter<"Rekomendasi">
    processedByUserId?: StringFilter<"Rekomendasi"> | string
  }

  export type DataMasterUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: DataMasterWhereUniqueInput
    update: XOR<DataMasterUpdateWithoutUpdatedByInput, DataMasterUncheckedUpdateWithoutUpdatedByInput>
    create: XOR<DataMasterCreateWithoutUpdatedByInput, DataMasterUncheckedCreateWithoutUpdatedByInput>
  }

  export type DataMasterUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: DataMasterWhereUniqueInput
    data: XOR<DataMasterUpdateWithoutUpdatedByInput, DataMasterUncheckedUpdateWithoutUpdatedByInput>
  }

  export type DataMasterUpdateManyWithWhereWithoutUpdatedByInput = {
    where: DataMasterScalarWhereInput
    data: XOR<DataMasterUpdateManyMutationInput, DataMasterUncheckedUpdateManyWithoutUpdatedByInput>
  }

  export type DataMasterScalarWhereInput = {
    AND?: DataMasterScalarWhereInput | DataMasterScalarWhereInput[]
    OR?: DataMasterScalarWhereInput[]
    NOT?: DataMasterScalarWhereInput | DataMasterScalarWhereInput[]
    id?: StringFilter<"DataMaster"> | string
    jenisData?: EnumJenisDataMasterFilter<"DataMaster"> | $Enums.JenisDataMaster
    namaAtribut?: StringFilter<"DataMaster"> | string
    nilai?: StringFilter<"DataMaster"> | string
    jumlah?: IntFilter<"DataMaster"> | number
    lokasiRt?: StringNullableFilter<"DataMaster"> | string | null
    lokasiRw?: StringNullableFilter<"DataMaster"> | string | null
    updatedByUserId?: StringFilter<"DataMaster"> | string
    updatedAt?: DateTimeFilter<"DataMaster"> | Date | string
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

  export type MasukanWargaCreateWithoutKategoriInput = {
    id?: string
    namaPengirim: string
    emailPengirim: string
    lokasiRt: string
    lokasiRw: string
    deskripsiMasukan: string
    status?: $Enums.MasukanStatus
    alasanPenolakan?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    verifiedBy?: UserCreateNestedOneWithoutMasukanVerifikasiInput
    rekomendasi?: RekomendasiMasukanCreateNestedManyWithoutMasukanInput
  }

  export type MasukanWargaUncheckedCreateWithoutKategoriInput = {
    id?: string
    namaPengirim: string
    emailPengirim: string
    lokasiRt: string
    lokasiRw: string
    deskripsiMasukan: string
    status?: $Enums.MasukanStatus
    alasanPenolakan?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    verifiedByUserId?: string | null
    rekomendasi?: RekomendasiMasukanUncheckedCreateNestedManyWithoutMasukanInput
  }

  export type MasukanWargaCreateOrConnectWithoutKategoriInput = {
    where: MasukanWargaWhereUniqueInput
    create: XOR<MasukanWargaCreateWithoutKategoriInput, MasukanWargaUncheckedCreateWithoutKategoriInput>
  }

  export type MasukanWargaCreateManyKategoriInputEnvelope = {
    data: MasukanWargaCreateManyKategoriInput | MasukanWargaCreateManyKategoriInput[]
    skipDuplicates?: boolean
  }

  export type MasukanWargaUpsertWithWhereUniqueWithoutKategoriInput = {
    where: MasukanWargaWhereUniqueInput
    update: XOR<MasukanWargaUpdateWithoutKategoriInput, MasukanWargaUncheckedUpdateWithoutKategoriInput>
    create: XOR<MasukanWargaCreateWithoutKategoriInput, MasukanWargaUncheckedCreateWithoutKategoriInput>
  }

  export type MasukanWargaUpdateWithWhereUniqueWithoutKategoriInput = {
    where: MasukanWargaWhereUniqueInput
    data: XOR<MasukanWargaUpdateWithoutKategoriInput, MasukanWargaUncheckedUpdateWithoutKategoriInput>
  }

  export type MasukanWargaUpdateManyWithWhereWithoutKategoriInput = {
    where: MasukanWargaScalarWhereInput
    data: XOR<MasukanWargaUpdateManyMutationInput, MasukanWargaUncheckedUpdateManyWithoutKategoriInput>
  }

  export type KategoriCreateWithoutMasukanWargaInput = {
    id?: string
    namaKategori: string
    deskripsi?: string | null
    status?: $Enums.StatusKategori
    createdAt?: Date | string
  }

  export type KategoriUncheckedCreateWithoutMasukanWargaInput = {
    id?: string
    namaKategori: string
    deskripsi?: string | null
    status?: $Enums.StatusKategori
    createdAt?: Date | string
  }

  export type KategoriCreateOrConnectWithoutMasukanWargaInput = {
    where: KategoriWhereUniqueInput
    create: XOR<KategoriCreateWithoutMasukanWargaInput, KategoriUncheckedCreateWithoutMasukanWargaInput>
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
    rekomendasiDiproses?: RekomendasiCreateNestedManyWithoutProcessedByInput
    dataMasterUpdate?: DataMasterCreateNestedManyWithoutUpdatedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
    rekomendasiDiproses?: RekomendasiUncheckedCreateNestedManyWithoutProcessedByInput
    dataMasterUpdate?: DataMasterUncheckedCreateNestedManyWithoutUpdatedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMasukanVerifikasiInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMasukanVerifikasiInput, UserUncheckedCreateWithoutMasukanVerifikasiInput>
  }

  export type RekomendasiMasukanCreateWithoutMasukanInput = {
    rekomendasi: RekomendasiCreateNestedOneWithoutMasukanWargaInput
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

  export type KategoriUpsertWithoutMasukanWargaInput = {
    update: XOR<KategoriUpdateWithoutMasukanWargaInput, KategoriUncheckedUpdateWithoutMasukanWargaInput>
    create: XOR<KategoriCreateWithoutMasukanWargaInput, KategoriUncheckedCreateWithoutMasukanWargaInput>
    where?: KategoriWhereInput
  }

  export type KategoriUpdateToOneWithWhereWithoutMasukanWargaInput = {
    where?: KategoriWhereInput
    data: XOR<KategoriUpdateWithoutMasukanWargaInput, KategoriUncheckedUpdateWithoutMasukanWargaInput>
  }

  export type KategoriUpdateWithoutMasukanWargaInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaKategori?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKategoriFieldUpdateOperationsInput | $Enums.StatusKategori
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KategoriUncheckedUpdateWithoutMasukanWargaInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaKategori?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKategoriFieldUpdateOperationsInput | $Enums.StatusKategori
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rekomendasiDiproses?: RekomendasiUpdateManyWithoutProcessedByNestedInput
    dataMasterUpdate?: DataMasterUpdateManyWithoutUpdatedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    rekomendasiDiproses?: RekomendasiUncheckedUpdateManyWithoutProcessedByNestedInput
    dataMasterUpdate?: DataMasterUncheckedUpdateManyWithoutUpdatedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
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

  export type UserCreateWithoutDataMasterUpdateInput = {
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
    masukanVerifikasi?: MasukanWargaCreateNestedManyWithoutVerifiedByInput
    rekomendasiDiproses?: RekomendasiCreateNestedManyWithoutProcessedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDataMasterUpdateInput = {
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
    masukanVerifikasi?: MasukanWargaUncheckedCreateNestedManyWithoutVerifiedByInput
    rekomendasiDiproses?: RekomendasiUncheckedCreateNestedManyWithoutProcessedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDataMasterUpdateInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDataMasterUpdateInput, UserUncheckedCreateWithoutDataMasterUpdateInput>
  }

  export type UserUpsertWithoutDataMasterUpdateInput = {
    update: XOR<UserUpdateWithoutDataMasterUpdateInput, UserUncheckedUpdateWithoutDataMasterUpdateInput>
    create: XOR<UserCreateWithoutDataMasterUpdateInput, UserUncheckedCreateWithoutDataMasterUpdateInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDataMasterUpdateInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDataMasterUpdateInput, UserUncheckedUpdateWithoutDataMasterUpdateInput>
  }

  export type UserUpdateWithoutDataMasterUpdateInput = {
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    masukanVerifikasi?: MasukanWargaUpdateManyWithoutVerifiedByNestedInput
    rekomendasiDiproses?: RekomendasiUpdateManyWithoutProcessedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDataMasterUpdateInput = {
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    masukanVerifikasi?: MasukanWargaUncheckedUpdateManyWithoutVerifiedByNestedInput
    rekomendasiDiproses?: RekomendasiUncheckedUpdateManyWithoutProcessedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
    masukanVerifikasi?: MasukanWargaCreateNestedManyWithoutVerifiedByInput
    dataMasterUpdate?: DataMasterCreateNestedManyWithoutUpdatedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
    masukanVerifikasi?: MasukanWargaUncheckedCreateNestedManyWithoutVerifiedByInput
    dataMasterUpdate?: DataMasterUncheckedCreateNestedManyWithoutUpdatedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRekomendasiDiprosesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRekomendasiDiprosesInput, UserUncheckedCreateWithoutRekomendasiDiprosesInput>
  }

  export type RekomendasiMasukanCreateWithoutRekomendasiInput = {
    masukan: MasukanWargaCreateNestedOneWithoutRekomendasiInput
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    masukanVerifikasi?: MasukanWargaUpdateManyWithoutVerifiedByNestedInput
    dataMasterUpdate?: DataMasterUpdateManyWithoutUpdatedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    masukanVerifikasi?: MasukanWargaUncheckedUpdateManyWithoutVerifiedByNestedInput
    dataMasterUpdate?: DataMasterUncheckedUpdateManyWithoutUpdatedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
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

  export type RekomendasiCreateWithoutMasukanWargaInput = {
    id?: string
    judul: string
    tanggalProses?: Date | string
    prioritas1Deskripsi: string
    prioritas1Skor: number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    processedBy: UserCreateNestedOneWithoutRekomendasiDiprosesInput
  }

  export type RekomendasiUncheckedCreateWithoutMasukanWargaInput = {
    id?: string
    judul: string
    tanggalProses?: Date | string
    prioritas1Deskripsi: string
    prioritas1Skor: number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    processedByUserId: string
  }

  export type RekomendasiCreateOrConnectWithoutMasukanWargaInput = {
    where: RekomendasiWhereUniqueInput
    create: XOR<RekomendasiCreateWithoutMasukanWargaInput, RekomendasiUncheckedCreateWithoutMasukanWargaInput>
  }

  export type MasukanWargaCreateWithoutRekomendasiInput = {
    id?: string
    namaPengirim: string
    emailPengirim: string
    lokasiRt: string
    lokasiRw: string
    deskripsiMasukan: string
    status?: $Enums.MasukanStatus
    alasanPenolakan?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    kategori: KategoriCreateNestedOneWithoutMasukanWargaInput
    verifiedBy?: UserCreateNestedOneWithoutMasukanVerifikasiInput
  }

  export type MasukanWargaUncheckedCreateWithoutRekomendasiInput = {
    id?: string
    namaPengirim: string
    emailPengirim: string
    lokasiRt: string
    lokasiRw: string
    deskripsiMasukan: string
    status?: $Enums.MasukanStatus
    alasanPenolakan?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    kategoriId: string
    verifiedByUserId?: string | null
  }

  export type MasukanWargaCreateOrConnectWithoutRekomendasiInput = {
    where: MasukanWargaWhereUniqueInput
    create: XOR<MasukanWargaCreateWithoutRekomendasiInput, MasukanWargaUncheckedCreateWithoutRekomendasiInput>
  }

  export type RekomendasiUpsertWithoutMasukanWargaInput = {
    update: XOR<RekomendasiUpdateWithoutMasukanWargaInput, RekomendasiUncheckedUpdateWithoutMasukanWargaInput>
    create: XOR<RekomendasiCreateWithoutMasukanWargaInput, RekomendasiUncheckedCreateWithoutMasukanWargaInput>
    where?: RekomendasiWhereInput
  }

  export type RekomendasiUpdateToOneWithWhereWithoutMasukanWargaInput = {
    where?: RekomendasiWhereInput
    data: XOR<RekomendasiUpdateWithoutMasukanWargaInput, RekomendasiUncheckedUpdateWithoutMasukanWargaInput>
  }

  export type RekomendasiUpdateWithoutMasukanWargaInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tanggalProses?: DateTimeFieldUpdateOperationsInput | Date | string
    prioritas1Deskripsi?: StringFieldUpdateOperationsInput | string
    prioritas1Skor?: FloatFieldUpdateOperationsInput | number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    processedBy?: UserUpdateOneRequiredWithoutRekomendasiDiprosesNestedInput
  }

  export type RekomendasiUncheckedUpdateWithoutMasukanWargaInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tanggalProses?: DateTimeFieldUpdateOperationsInput | Date | string
    prioritas1Deskripsi?: StringFieldUpdateOperationsInput | string
    prioritas1Skor?: FloatFieldUpdateOperationsInput | number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    processedByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type MasukanWargaUpsertWithoutRekomendasiInput = {
    update: XOR<MasukanWargaUpdateWithoutRekomendasiInput, MasukanWargaUncheckedUpdateWithoutRekomendasiInput>
    create: XOR<MasukanWargaCreateWithoutRekomendasiInput, MasukanWargaUncheckedCreateWithoutRekomendasiInput>
    where?: MasukanWargaWhereInput
  }

  export type MasukanWargaUpdateToOneWithWhereWithoutRekomendasiInput = {
    where?: MasukanWargaWhereInput
    data: XOR<MasukanWargaUpdateWithoutRekomendasiInput, MasukanWargaUncheckedUpdateWithoutRekomendasiInput>
  }

  export type MasukanWargaUpdateWithoutRekomendasiInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengirim?: StringFieldUpdateOperationsInput | string
    emailPengirim?: StringFieldUpdateOperationsInput | string
    lokasiRt?: StringFieldUpdateOperationsInput | string
    lokasiRw?: StringFieldUpdateOperationsInput | string
    deskripsiMasukan?: StringFieldUpdateOperationsInput | string
    status?: EnumMasukanStatusFieldUpdateOperationsInput | $Enums.MasukanStatus
    alasanPenolakan?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kategori?: KategoriUpdateOneRequiredWithoutMasukanWargaNestedInput
    verifiedBy?: UserUpdateOneWithoutMasukanVerifikasiNestedInput
  }

  export type MasukanWargaUncheckedUpdateWithoutRekomendasiInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengirim?: StringFieldUpdateOperationsInput | string
    emailPengirim?: StringFieldUpdateOperationsInput | string
    lokasiRt?: StringFieldUpdateOperationsInput | string
    lokasiRw?: StringFieldUpdateOperationsInput | string
    deskripsiMasukan?: StringFieldUpdateOperationsInput | string
    status?: EnumMasukanStatusFieldUpdateOperationsInput | $Enums.MasukanStatus
    alasanPenolakan?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kategoriId?: StringFieldUpdateOperationsInput | string
    verifiedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
    masukanVerifikasi?: MasukanWargaCreateNestedManyWithoutVerifiedByInput
    rekomendasiDiproses?: RekomendasiCreateNestedManyWithoutProcessedByInput
    dataMasterUpdate?: DataMasterCreateNestedManyWithoutUpdatedByInput
    accounts?: AccountCreateNestedManyWithoutUserInput
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
    masukanVerifikasi?: MasukanWargaUncheckedCreateNestedManyWithoutVerifiedByInput
    rekomendasiDiproses?: RekomendasiUncheckedCreateNestedManyWithoutProcessedByInput
    dataMasterUpdate?: DataMasterUncheckedCreateNestedManyWithoutUpdatedByInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    masukanVerifikasi?: MasukanWargaUpdateManyWithoutVerifiedByNestedInput
    rekomendasiDiproses?: RekomendasiUpdateManyWithoutProcessedByNestedInput
    dataMasterUpdate?: DataMasterUpdateManyWithoutUpdatedByNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    masukanVerifikasi?: MasukanWargaUncheckedUpdateManyWithoutVerifiedByNestedInput
    rekomendasiDiproses?: RekomendasiUncheckedUpdateManyWithoutProcessedByNestedInput
    dataMasterUpdate?: DataMasterUncheckedUpdateManyWithoutUpdatedByNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
    masukanVerifikasi?: MasukanWargaCreateNestedManyWithoutVerifiedByInput
    rekomendasiDiproses?: RekomendasiCreateNestedManyWithoutProcessedByInput
    dataMasterUpdate?: DataMasterCreateNestedManyWithoutUpdatedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
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
    phoneNumber: string
    phoneNumberVerified?: boolean | null
    masukanVerifikasi?: MasukanWargaUncheckedCreateNestedManyWithoutVerifiedByInput
    rekomendasiDiproses?: RekomendasiUncheckedCreateNestedManyWithoutProcessedByInput
    dataMasterUpdate?: DataMasterUncheckedCreateNestedManyWithoutUpdatedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    masukanVerifikasi?: MasukanWargaUpdateManyWithoutVerifiedByNestedInput
    rekomendasiDiproses?: RekomendasiUpdateManyWithoutProcessedByNestedInput
    dataMasterUpdate?: DataMasterUpdateManyWithoutUpdatedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
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
    phoneNumber?: StringFieldUpdateOperationsInput | string
    phoneNumberVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    masukanVerifikasi?: MasukanWargaUncheckedUpdateManyWithoutVerifiedByNestedInput
    rekomendasiDiproses?: RekomendasiUncheckedUpdateManyWithoutProcessedByNestedInput
    dataMasterUpdate?: DataMasterUncheckedUpdateManyWithoutUpdatedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MasukanWargaCreateManyVerifiedByInput = {
    id?: string
    namaPengirim: string
    emailPengirim: string
    lokasiRt: string
    lokasiRw: string
    deskripsiMasukan: string
    status?: $Enums.MasukanStatus
    alasanPenolakan?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    kategoriId: string
  }

  export type RekomendasiCreateManyProcessedByInput = {
    id?: string
    judul: string
    tanggalProses?: Date | string
    prioritas1Deskripsi: string
    prioritas1Skor: number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DataMasterCreateManyUpdatedByInput = {
    id?: string
    jenisData: $Enums.JenisDataMaster
    namaAtribut: string
    nilai: string
    jumlah: number
    lokasiRt?: string | null
    lokasiRw?: string | null
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

  export type MasukanWargaUpdateWithoutVerifiedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengirim?: StringFieldUpdateOperationsInput | string
    emailPengirim?: StringFieldUpdateOperationsInput | string
    lokasiRt?: StringFieldUpdateOperationsInput | string
    lokasiRw?: StringFieldUpdateOperationsInput | string
    deskripsiMasukan?: StringFieldUpdateOperationsInput | string
    status?: EnumMasukanStatusFieldUpdateOperationsInput | $Enums.MasukanStatus
    alasanPenolakan?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kategori?: KategoriUpdateOneRequiredWithoutMasukanWargaNestedInput
    rekomendasi?: RekomendasiMasukanUpdateManyWithoutMasukanNestedInput
  }

  export type MasukanWargaUncheckedUpdateWithoutVerifiedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengirim?: StringFieldUpdateOperationsInput | string
    emailPengirim?: StringFieldUpdateOperationsInput | string
    lokasiRt?: StringFieldUpdateOperationsInput | string
    lokasiRw?: StringFieldUpdateOperationsInput | string
    deskripsiMasukan?: StringFieldUpdateOperationsInput | string
    status?: EnumMasukanStatusFieldUpdateOperationsInput | $Enums.MasukanStatus
    alasanPenolakan?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kategoriId?: StringFieldUpdateOperationsInput | string
    rekomendasi?: RekomendasiMasukanUncheckedUpdateManyWithoutMasukanNestedInput
  }

  export type MasukanWargaUncheckedUpdateManyWithoutVerifiedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengirim?: StringFieldUpdateOperationsInput | string
    emailPengirim?: StringFieldUpdateOperationsInput | string
    lokasiRt?: StringFieldUpdateOperationsInput | string
    lokasiRw?: StringFieldUpdateOperationsInput | string
    deskripsiMasukan?: StringFieldUpdateOperationsInput | string
    status?: EnumMasukanStatusFieldUpdateOperationsInput | $Enums.MasukanStatus
    alasanPenolakan?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kategoriId?: StringFieldUpdateOperationsInput | string
  }

  export type RekomendasiUpdateWithoutProcessedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tanggalProses?: DateTimeFieldUpdateOperationsInput | Date | string
    prioritas1Deskripsi?: StringFieldUpdateOperationsInput | string
    prioritas1Skor?: FloatFieldUpdateOperationsInput | number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    masukanWarga?: RekomendasiMasukanUpdateManyWithoutRekomendasiNestedInput
  }

  export type RekomendasiUncheckedUpdateWithoutProcessedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tanggalProses?: DateTimeFieldUpdateOperationsInput | Date | string
    prioritas1Deskripsi?: StringFieldUpdateOperationsInput | string
    prioritas1Skor?: FloatFieldUpdateOperationsInput | number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
    masukanWarga?: RekomendasiMasukanUncheckedUpdateManyWithoutRekomendasiNestedInput
  }

  export type RekomendasiUncheckedUpdateManyWithoutProcessedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    judul?: StringFieldUpdateOperationsInput | string
    tanggalProses?: DateTimeFieldUpdateOperationsInput | Date | string
    prioritas1Deskripsi?: StringFieldUpdateOperationsInput | string
    prioritas1Skor?: FloatFieldUpdateOperationsInput | number
    laporanLengkap?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DataMasterUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    jenisData?: EnumJenisDataMasterFieldUpdateOperationsInput | $Enums.JenisDataMaster
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    lokasiRt?: NullableStringFieldUpdateOperationsInput | string | null
    lokasiRw?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataMasterUncheckedUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    jenisData?: EnumJenisDataMasterFieldUpdateOperationsInput | $Enums.JenisDataMaster
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    lokasiRt?: NullableStringFieldUpdateOperationsInput | string | null
    lokasiRw?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataMasterUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    jenisData?: EnumJenisDataMasterFieldUpdateOperationsInput | $Enums.JenisDataMaster
    namaAtribut?: StringFieldUpdateOperationsInput | string
    nilai?: StringFieldUpdateOperationsInput | string
    jumlah?: IntFieldUpdateOperationsInput | number
    lokasiRt?: NullableStringFieldUpdateOperationsInput | string | null
    lokasiRw?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type MasukanWargaCreateManyKategoriInput = {
    id?: string
    namaPengirim: string
    emailPengirim: string
    lokasiRt: string
    lokasiRw: string
    deskripsiMasukan: string
    status?: $Enums.MasukanStatus
    alasanPenolakan?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    verifiedByUserId?: string | null
  }

  export type MasukanWargaUpdateWithoutKategoriInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengirim?: StringFieldUpdateOperationsInput | string
    emailPengirim?: StringFieldUpdateOperationsInput | string
    lokasiRt?: StringFieldUpdateOperationsInput | string
    lokasiRw?: StringFieldUpdateOperationsInput | string
    deskripsiMasukan?: StringFieldUpdateOperationsInput | string
    status?: EnumMasukanStatusFieldUpdateOperationsInput | $Enums.MasukanStatus
    alasanPenolakan?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedBy?: UserUpdateOneWithoutMasukanVerifikasiNestedInput
    rekomendasi?: RekomendasiMasukanUpdateManyWithoutMasukanNestedInput
  }

  export type MasukanWargaUncheckedUpdateWithoutKategoriInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengirim?: StringFieldUpdateOperationsInput | string
    emailPengirim?: StringFieldUpdateOperationsInput | string
    lokasiRt?: StringFieldUpdateOperationsInput | string
    lokasiRw?: StringFieldUpdateOperationsInput | string
    deskripsiMasukan?: StringFieldUpdateOperationsInput | string
    status?: EnumMasukanStatusFieldUpdateOperationsInput | $Enums.MasukanStatus
    alasanPenolakan?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
    rekomendasi?: RekomendasiMasukanUncheckedUpdateManyWithoutMasukanNestedInput
  }

  export type MasukanWargaUncheckedUpdateManyWithoutKategoriInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengirim?: StringFieldUpdateOperationsInput | string
    emailPengirim?: StringFieldUpdateOperationsInput | string
    lokasiRt?: StringFieldUpdateOperationsInput | string
    lokasiRw?: StringFieldUpdateOperationsInput | string
    deskripsiMasukan?: StringFieldUpdateOperationsInput | string
    status?: EnumMasukanStatusFieldUpdateOperationsInput | $Enums.MasukanStatus
    alasanPenolakan?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedByUserId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RekomendasiMasukanCreateManyMasukanInput = {
    rekomendasiId: string
  }

  export type RekomendasiMasukanUpdateWithoutMasukanInput = {
    rekomendasi?: RekomendasiUpdateOneRequiredWithoutMasukanWargaNestedInput
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
    masukan?: MasukanWargaUpdateOneRequiredWithoutRekomendasiNestedInput
  }

  export type RekomendasiMasukanUncheckedUpdateWithoutRekomendasiInput = {
    masukanId?: StringFieldUpdateOperationsInput | string
  }

  export type RekomendasiMasukanUncheckedUpdateManyWithoutRekomendasiInput = {
    masukanId?: StringFieldUpdateOperationsInput | string
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