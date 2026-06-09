import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import events735790 from './events'
/**
* @see \App\Http\Controllers\EventController::events
 * @see app/Http/Controllers/EventController.php:44
 * @route '/admin/events'
 */
export const events = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})

events.definition = {
    methods: ["get","head"],
    url: '/admin/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EventController::events
 * @see app/Http/Controllers/EventController.php:44
 * @route '/admin/events'
 */
events.url = (options?: RouteQueryOptions) => {
    return events.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EventController::events
 * @see app/Http/Controllers/EventController.php:44
 * @route '/admin/events'
 */
events.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EventController::events
 * @see app/Http/Controllers/EventController.php:44
 * @route '/admin/events'
 */
events.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: events.url(options),
    method: 'head',
})
const admin = {
    events: Object.assign(events, events735790),
}

export default admin