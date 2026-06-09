import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
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
const EventSubmissionController = { create, store }

export default EventSubmissionController