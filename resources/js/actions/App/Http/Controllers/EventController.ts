import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:12
 * @route '/dashboard'
 */
const index42a740574ecbfbac32f8cc353fc32db9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

index42a740574ecbfbac32f8cc353fc32db9.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:12
 * @route '/dashboard'
 */
index42a740574ecbfbac32f8cc353fc32db9.url = (options?: RouteQueryOptions) => {
    return index42a740574ecbfbac32f8cc353fc32db9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:12
 * @route '/dashboard'
 */
index42a740574ecbfbac32f8cc353fc32db9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:12
 * @route '/dashboard'
 */
index42a740574ecbfbac32f8cc353fc32db9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:12
 * @route '/events'
 */
const index413ac16114db49ae410d1665e728ae96 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index413ac16114db49ae410d1665e728ae96.url(options),
    method: 'get',
})

index413ac16114db49ae410d1665e728ae96.definition = {
    methods: ["get","head"],
    url: '/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:12
 * @route '/events'
 */
index413ac16114db49ae410d1665e728ae96.url = (options?: RouteQueryOptions) => {
    return index413ac16114db49ae410d1665e728ae96.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:12
 * @route '/events'
 */
index413ac16114db49ae410d1665e728ae96.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index413ac16114db49ae410d1665e728ae96.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventController::index
 * @see app/Http/Controllers/EventController.php:12
 * @route '/events'
 */
index413ac16114db49ae410d1665e728ae96.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index413ac16114db49ae410d1665e728ae96.url(options),
    method: 'head',
})

/**
* Multiple routes resolve to \App\Http\Controllers\EventController::index, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `index['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const index = {
    '/dashboard': index42a740574ecbfbac32f8cc353fc32db9,
    '/events': index413ac16114db49ae410d1665e728ae96,
}

/**
* @see \App\Http\Controllers\EventController::allEvents
 * @see app/Http/Controllers/EventController.php:44
 * @route '/admin/events'
 */
export const allEvents = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allEvents.url(options),
    method: 'get',
})

allEvents.definition = {
    methods: ["get","head"],
    url: '/admin/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventController::allEvents
 * @see app/Http/Controllers/EventController.php:44
 * @route '/admin/events'
 */
allEvents.url = (options?: RouteQueryOptions) => {
    return allEvents.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::allEvents
 * @see app/Http/Controllers/EventController.php:44
 * @route '/admin/events'
 */
allEvents.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allEvents.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventController::allEvents
 * @see app/Http/Controllers/EventController.php:44
 * @route '/admin/events'
 */
allEvents.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allEvents.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EventController::destroy
 * @see app/Http/Controllers/EventController.php:77
 * @route '/admin/events/{event}'
 */
export const destroy = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/events/{event}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\EventController::destroy
 * @see app/Http/Controllers/EventController.php:77
 * @route '/admin/events/{event}'
 */
destroy.url = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::destroy
 * @see app/Http/Controllers/EventController.php:77
 * @route '/admin/events/{event}'
 */
destroy.delete = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const EventController = { index, allEvents, destroy }

export default EventController