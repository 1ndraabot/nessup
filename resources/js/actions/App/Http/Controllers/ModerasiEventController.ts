import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ModerasiEventController::show
 * @see app/Http/Controllers/ModerasiEventController.php:73
 * @route '/admin/event-submission/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/event-submission/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ModerasiEventController::show
 * @see app/Http/Controllers/ModerasiEventController.php:73
 * @route '/admin/event-submission/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ModerasiEventController::show
 * @see app/Http/Controllers/ModerasiEventController.php:73
 * @route '/admin/event-submission/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ModerasiEventController::show
 * @see app/Http/Controllers/ModerasiEventController.php:73
 * @route '/admin/event-submission/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ModerasiEventController::approve
 * @see app/Http/Controllers/ModerasiEventController.php:80
 * @route '/admin/event-submission/{id}/approve'
 */
export const approve = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

approve.definition = {
    methods: ["patch"],
    url: '/admin/event-submission/{id}/approve',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ModerasiEventController::approve
 * @see app/Http/Controllers/ModerasiEventController.php:80
 * @route '/admin/event-submission/{id}/approve'
 */
approve.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return approve.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ModerasiEventController::approve
 * @see app/Http/Controllers/ModerasiEventController.php:80
 * @route '/admin/event-submission/{id}/approve'
 */
approve.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ModerasiEventController::decline
 * @see app/Http/Controllers/ModerasiEventController.php:111
 * @route '/admin/event-submission/{id}/decline'
 */
export const decline = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: decline.url(args, options),
    method: 'patch',
})

decline.definition = {
    methods: ["patch"],
    url: '/admin/event-submission/{id}/decline',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ModerasiEventController::decline
 * @see app/Http/Controllers/ModerasiEventController.php:111
 * @route '/admin/event-submission/{id}/decline'
 */
decline.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return decline.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ModerasiEventController::decline
 * @see app/Http/Controllers/ModerasiEventController.php:111
 * @route '/admin/event-submission/{id}/decline'
 */
decline.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: decline.url(args, options),
    method: 'patch',
})
const ModerasiEventController = { show, approve, decline }

export default ModerasiEventController