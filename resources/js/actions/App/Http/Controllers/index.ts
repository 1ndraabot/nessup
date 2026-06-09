import AuthController from './AuthController'
import EventController from './EventController'
import AdminAuthController from './AdminAuthController'
import AdminDashboardController from './AdminDashboardController'
import ModerasiEventController from './ModerasiEventController'
import ExploreController from './ExploreController'
import EventSubmissionController from './EventSubmissionController'
import EventRegistrationController from './EventRegistrationController'
import EventBookmarkController from './EventBookmarkController'
import Settings from './Settings'
const Controllers = {
    AuthController: Object.assign(AuthController, AuthController),
EventController: Object.assign(EventController, EventController),
AdminAuthController: Object.assign(AdminAuthController, AdminAuthController),
AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
ModerasiEventController: Object.assign(ModerasiEventController, ModerasiEventController),
ExploreController: Object.assign(ExploreController, ExploreController),
EventSubmissionController: Object.assign(EventSubmissionController, EventSubmissionController),
EventRegistrationController: Object.assign(EventRegistrationController, EventRegistrationController),
EventBookmarkController: Object.assign(EventBookmarkController, EventBookmarkController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers