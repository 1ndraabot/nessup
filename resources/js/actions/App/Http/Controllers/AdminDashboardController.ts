import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:16
 * @route '/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:16
 * @route '/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:16
 * @route '/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminDashboardController::index
 * @see app/Http/Controllers/AdminDashboardController.php:16
 * @route '/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::moderasi
 * @see app/Http/Controllers/AdminDashboardController.php:93
 * @route '/admin/moderasi-event'
 */
export const moderasi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: moderasi.url(options),
    method: 'get',
})

moderasi.definition = {
    methods: ["get","head"],
    url: '/admin/moderasi-event',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::moderasi
 * @see app/Http/Controllers/AdminDashboardController.php:93
 * @route '/admin/moderasi-event'
 */
moderasi.url = (options?: RouteQueryOptions) => {
    return moderasi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::moderasi
 * @see app/Http/Controllers/AdminDashboardController.php:93
 * @route '/admin/moderasi-event'
 */
moderasi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: moderasi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminDashboardController::moderasi
 * @see app/Http/Controllers/AdminDashboardController.php:93
 * @route '/admin/moderasi-event'
 */
moderasi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: moderasi.url(options),
    method: 'head',
})
const AdminDashboardController = { index, moderasi }

export default AdminDashboardController