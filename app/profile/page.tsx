import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileSettings } from "@/components/profile/profile-settings"
import { ProfileStats } from "@/components/profile/profile-stats"
import { ProfilePreferences } from "@/components/profile/profile-preferences"
import { ProfileActivity } from "@/components/profile/profile-activity"

export default function ProfilePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <ProfileHeader />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <ProfileStats />

          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and settings</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ProfileSettings />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent financial activities and updates</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ProfileActivity />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] sticky top-6 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500/10 to-rose-500/10">
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ProfilePreferences />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
