"use client"
import RootReducer from "./RootReducer"
import { Provider } from "react-redux"
import { legacy_createStore as createStore } from "redux"
import type { ReactNode } from "react"

const store=createStore(RootReducer)

export default function ReduxProvider({children}: { children: ReactNode })
{
    return(
        <Provider store={store} >
            {children}
        </Provider>
    )
}