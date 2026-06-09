import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ExploreController::index
 * @see app/Http/Controllers/ExploreController.php:12
 * @route '/explore'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/explore',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExploreController::index
 * @see app/Http/Controllers/ExploreController.php:12
 * @route '/explore'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExploreController::index
 * @see app/Http/Controllers/ExploreController.php:12
 * @route '/explore'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ExploreController::index
 * @see app/Http/Controllers/ExploreController.php:12
 * @route '/explore'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ExploreController::show
 * @see app/Http/Controllers/ExploreController.php:51
 * @route '/explore/{event}'
 */
export const show = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/explore/{event}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExploreController::show
 * @see app/Http/Controllers/ExploreController.php:51
 * @route '/explore/{event}'
 */
show.url = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.id
                : args.event,
                }

    return show.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExploreController::show
 * @see app/Http/Controllers/ExploreController.php:51
 * @route '/explore/{event}'
 */
show.get = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ExploreController::show
 * @see app/Http/Controllers/ExploreController.php:51
 * @route '/explore/{event}'
 */
show.head = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const ExploreController = { index, show }

export default ExploreController