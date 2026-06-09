import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminAuthController::showRegister
 * @see app/Http/Controllers/AdminAuthController.php:13
 * @route '/admin/register'
 */
export const showRegister = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRegister.url(options),
    method: 'get',
})

showRegister.definition = {
    methods: ["get","head"],
    url: '/admin/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminAuthController::showRegister
 * @see app/Http/Controllers/AdminAuthController.php:13
 * @route '/admin/register'
 */
showRegister.url = (options?: RouteQueryOptions) => {
    return showRegister.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminAuthController::showRegister
 * @see app/Http/Controllers/AdminAuthController.php:13
 * @route '/admin/register'
 */
showRegister.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRegister.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminAuthController::showRegister
 * @see app/Http/Controllers/AdminAuthController.php:13
 * @route '/admin/register'
 */
showRegister.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showRegister.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminAuthController::register
 * @see app/Http/Controllers/AdminAuthController.php:17
 * @route '/admin/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/admin/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminAuthController::register
 * @see app/Http/Controllers/AdminAuthController.php:17
 * @route '/admin/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminAuthController::register
 * @see app/Http/Controllers/AdminAuthController.php:17
 * @route '/admin/register'
 */
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminAuthController::showLogin
 * @see app/Http/Controllers/AdminAuthController.php:36
 * @route '/admin/login'
 */
export const showLogin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})

showLogin.definition = {
    methods: ["get","head"],
    url: '/admin/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminAuthController::showLogin
 * @see app/Http/Controllers/AdminAuthController.php:36
 * @route '/admin/login'
 */
showLogin.url = (options?: RouteQueryOptions) => {
    return showLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminAuthController::showLogin
 * @see app/Http/Controllers/AdminAuthController.php:36
 * @route '/admin/login'
 */
showLogin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminAuthController::showLogin
 * @see app/Http/Controllers/AdminAuthController.php:36
 * @route '/admin/login'
 */
showLogin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLogin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminAuthController::login
 * @see app/Http/Controllers/AdminAuthController.php:40
 * @route '/admin/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/admin/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminAuthController::login
 * @see app/Http/Controllers/AdminAuthController.php:40
 * @route '/admin/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminAuthController::login
 * @see app/Http/Controllers/AdminAuthController.php:40
 * @route '/admin/login'
 */
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminAuthController::logout
 * @see app/Http/Controllers/AdminAuthController.php:60
 * @route '/admin/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/admin/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminAuthController::logout
 * @see app/Http/Controllers/AdminAuthController.php:60
 * @route '/admin/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminAuthController::logout
 * @see app/Http/Controllers/AdminAuthController.php:60
 * @route '/admin/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})
const AdminAuthController = { showRegister, register, showLogin, login, logout }

export default AdminAuthController