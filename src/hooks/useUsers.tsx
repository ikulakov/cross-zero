import React from 'react'
import { UserT } from '../types/types'

const subscriptions = new Set<() => void>()

let store: Map<string, UserT> = new Map()

export function useCurrentUsers () {
    return React.useSyncExternalStore(
        onChange => {
            subscriptions.add(onChange)
            return () => subscriptions.delete(onChange)
        },
        () => store,
        () => store,
    )
}

export function setUsers (type: string, user: UserT) {
    store.set(type, user)
    subscriptions.forEach(onChange => onChange())
}
export function deleteUser (type: string) {
    store.delete(type)
    subscriptions.forEach(onChange => onChange())
}