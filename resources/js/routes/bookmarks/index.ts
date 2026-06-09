import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\EventBookmarkController::index
 * @see app/Http/Controllers/EventBookmarkController.php:11
 * @route '/event-saya'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/event-saya',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventBookmarkController::index
 * @see app/Http/Controllers/EventBookmarkController.php:11
 * @route '/event-saya'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventBookmarkController::index
 * @see app/Http/Controllers/EventBookmarkController.php:11
 * @route '/event-saya'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventBookmarkController::index
 * @see app/Http/Controllers/EventBookmarkController.php:11
 * @route '/event-saya'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EventBookmarkController::store
 * @see app/Http/Controllers/EventBookmarkController.php:70
 * @route '/bookmarks'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/bookmarks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EventBookmarkController::store
 * @see app/Http/Controllers/EventBookmarkController.php:70
 * @route '/bookmarks'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventBookmarkController::store
 * @see app/Http/Controllers/EventBookmarkController.php:70
 * @route '/bookmarks'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EventBookmarkController::destroy
 * @see app/Http/Controllers/EventBookmarkController.php:84
 * @route '/bookmarks/{bookmark}'
 */
export const destroy = (args: { bookmark: string | number | { id: string | number } } | [bookmark: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/bookmarks/{bookmark}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\EventBookmarkController::destroy
 * @see app/Http/Controllers/EventBookmarkController.php:84
 * @route '/bookmarks/{bookmark}'
 */
destroy.url = (args: { bookmark: string | number | { id: string | number } } | [bookmark: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bookmark: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { bookmark: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    bookmark: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        bookmark: typeof args.bookmark === 'object'
                ? args.bookmark.id
                : args.bookmark,
                }

    return destroy.definition.url
            .replace('{bookmark}', parsedArgs.bookmark.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventBookmarkController::destroy
 * @see app/Http/Controllers/EventBookmarkController.php:84
 * @route '/bookmarks/{bookmark}'
 */
destroy.delete = (args: { bookmark: string | number | { id: string | number } } | [bookmark: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const bookmarks = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default bookmarks