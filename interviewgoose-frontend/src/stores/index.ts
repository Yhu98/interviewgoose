import { configureStore } from '@reduxjs/toolkit'
import loginUser from '@/stores/loginUser'
// ...

const store = configureStore({
    reducer: {
        loginUser,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;