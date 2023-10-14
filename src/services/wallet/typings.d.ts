declare namespace API {
  type Account = {
    id?: number;
    name?: string;
    description?: string;
    createTime?: string;
    updateTime?: string;
    deleted?: boolean;
    disabled?: boolean;
    income?: number;
    expense?: number;
    balance?: number;
    book?: number;
  };

  type AddAccount = {
    name?: string;
    description?: string;
    deleted?: boolean;
    disabled?: boolean;
    income?: number;
    expense?: number;
    balance?: number;
  };

  type AddBook = {
    name?: string;
    description?: string;
    disabled?: boolean;
    income?: number;
    expense?: number;
    balance?: number;
  };

  type addBookParams = {
    addBook: AddBook;
  };

  type addCategoryParams = {
    id: number;
  };

  type AddTransaction = {
    categoryId: number;
    amount: number;
    accountId?: number;
    disabled?: boolean;
    notes?: string;
  };

  type addTransactionParams = {
    addTransaction: AddTransaction;
  };

  type AddUser = {
    username: string;
    password: string;
    nickName?: string;
    telephone?: string;
    email?: string;
  };

  type BaseResponseAccount = {
    code?: number;
    data?: Account;
    message?: string;
  };

  type BaseResponseBook = {
    code?: number;
    data?: Book;
    message?: string;
  };

  type BaseResponseCategory = {
    code?: number;
    data?: Category;
    message?: string;
  };

  type BaseResponseListBook = {
    code?: number;
    data?: Book[];
    message?: string;
  };

  type BaseResponseListCategory = {
    code?: number;
    data?: Category[];
    message?: string;
  };

  type BaseResponseListUser = {
    code?: number;
    data?: User[];
    message?: string;
  };

  type BaseResponsePageAccount = {
    code?: number;
    data?: PageAccount;
    message?: string;
  };

  type BaseResponsePageTransaction = {
    code?: number;
    data?: PageTransaction;
    message?: string;
  };

  type BaseResponseString = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseTransaction = {
    code?: number;
    data?: Transaction;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type Book = {
    id?: number;
    name?: string;
    description?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    deleted?: boolean;
    disabled?: boolean;
    income?: number;
    expense?: number;
    balance?: number;
    defaultAccount?: number;
  };

  type Category = {
    id?: number;
    name?: string;
    icon?: string;
    type?: number;
    child?: Category[];
  };

  type ChangePassword = {
    newPassword: string;
    oldPassword: string;
  };

  type changePasswordParams = {
    changePassword: ChangePassword;
  };

  type deleteAccountParams = {
    id: number;
  };

  type deleteBookParams = {
    id: number;
  };

  type deleteCategoryParams = {
    id: number;
  };

  type deleteTransactionParams = {
    id: number;
  };

  type ForgetPassword = {
    newPassword: string;
    username: string;
    nickName?: string;
    telephone?: string;
    email?: string;
  };

  type getAccountPageParams = {
    name: string;
    current: number;
    pageSize: number;
  };

  type getAccountParams = {
    id: number;
  };

  type getBookParams = {
    id: number;
  };

  type getCategoryParams = {
    id: number;
  };

  type getTransactionPageParams = {
    current: number;
    pageSize: number;
  };

  type getTransactionParams = {
    id: number;
  };

  type getTransactionRangeParams = {
    current: number;
    pageSize: number;
    start: string;
    end: string;
  };

  type getUserListParams = {
    book: Book;
  };

  type Login = {
    username: string;
    password: string;
    autoLogin?: boolean;
  };

  type PageableObject = {
    offset?: number;
    sort?: SortObject;
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
    unpaged?: boolean;
  };

  type PageAccount = {
    totalElements?: number;
    totalPages?: number;
    size?: number;
    content?: Account[];
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    pageable?: PageableObject;
    empty?: boolean;
  };

  type PageTransaction = {
    totalElements?: number;
    totalPages?: number;
    size?: number;
    content?: Transaction[];
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    pageable?: PageableObject;
    empty?: boolean;
  };

  type SortObject = {
    empty?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
  };

  type Transaction = {
    id?: number;
    amount: number;
    category?: Category;
    account?: number;
    book?: number;
    time?: string;
    updateTime?: string;
    deleted?: boolean;
    disabled?: boolean;
    notes?: string;
    details?: Record<string, any>;
  };

  type updateAccountParams = {
    id: number;
  };

  type updateBookParams = {
    id: number;
    addBook: AddBook;
  };

  type updateCategoryParams = {
    id: number;
  };

  type updateTransactionParams = {
    id: number;
    addTransaction: AddTransaction;
  };

  type UpdateUser = true;

  type updateUserParams = {
    updateUser: UpdateUser;
  };

  type User = {
    id?: number;
    username?: string;
    password?: string;
    nickName?: string;
    avatar?: string;
    telephone?: string;
    email?: string;
    registerTime?: string;
    defaultBook?: number;
  };
}
