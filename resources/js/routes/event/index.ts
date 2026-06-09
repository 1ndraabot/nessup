import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\EventSubmissionController::create
 * @see app/Http/Controllers/EventSubmissionController.php:12
 * @route '/post-event'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/post-event',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventSubmissionController::create
 * @see app/Http/Controllers/EventSubmissionController.php:12
 * @route '/post-event'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventSubmissionController::create
 * @see app/Http/Controllers/EventSubmissionController.php:12
 * @route '/post-event'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventSubmissionController::create
 * @see app/Http/Controllers/EventSubmissionController.php:12
 * @route '/post-event'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EventSubmissionController::store
 * @see app/Http/Controllers/EventSubmissionController.php:17
 * @route '/post-event'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/post-event',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EventSubmissionController::store
 * @see app/Http/Controllers/EventSubmissionController.php:17
 * @route '/post-event'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventSubmissionController::store
 * @see app/Http/Controllers/EventSubmissionController.php:17
 * @route '/post-event'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EventRegistrationController::register
 * @see app/Http/Controllers/EventRegistrationController.php:12
 * @route '/event/{event}/daftar'
 */
export const register = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(args, options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/event/{event}/daftar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventRegistrationController::register
 * @see app/Http/Controllers/EventRegistrationController.php:12
 * @route '/event/{event}/daftar'
 */
register.url = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return register.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventRegistrationController::register
 * @see app/Http/Controllers/EventRegistrationController.php:12
 * @route '/event/{event}/daftar'
 */
register.get = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventRegistrationController::register
 * @see app/Http/Controllers/EventRegistrationController.php:12
 * @route '/event/{event}/daftar'
 */
register.head = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EventRegistrationController::daftar
 * @see app/Http/Controllers/EventRegistrationController.php:24
 * @route '/event/{event}/daftar'
 */
export const daftar = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: daftar.url(args, options),
    method: 'post',
})

daftar.definition = {
    methods: ["post"],
    url: '/event/{event}/daftar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EventRegistrationController::daftar
 * @see app/Http/Controllers/EventRegistrationController.php:24
 * @route '/event/{event}/daftar'
 */
daftar.url = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return daftar.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventRegistrationController::daftar
 * @see app/Http/Controllers/EventRegistrationController.php:24
 * @route '/event/{event}/daftar'
 */
daftar.post = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: daftar.url(args, options),
    method: 'post',
})
const event = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
register: Object.assign(register, register),
daftar: Object.assign(daftar, daftar),
}

export default event