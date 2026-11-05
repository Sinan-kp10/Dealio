import { useState } from "react";
import useAuthStore from "../../auth/stores/auth.store";
import { Mail, Lock } from "lucide-react";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ChangeEmailModal from "../components/ChangeEmailModal";

function CustomerSettingsPage() {
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);
    const setUser = useAuthStore((state) => state.setUser);
    const currentUser = useAuthStore((state) => state.user);

    return (
        <div className="w-full space-y-6 pb-12">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 space-y-6">
                <div className="pb-5 border-b border-slate-100">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                        Account Security
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Manage your email address, password, and security credentials to keep your account safe.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-slate-900">
                            Email Address
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
                            {currentUser?.email}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsChangeEmailModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-44 px-4 py-2 sm:py-2.5 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
                    >
                        <Mail size={16} className="text-slate-600" />
                        <span>Change Email</span>
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900">
                            Password
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                            Set a unique password to protect your account credentials.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsChangePasswordModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-44 px-4 py-2 sm:py-2.5 border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
                    >
                        <Lock size={16} className="text-slate-600" />
                        <span>Change Password</span>
                    </button>
                </div>
        </div>

        <ChangeEmailModal
            isOpen={isChangeEmailModalOpen}
            onClose={() => setIsChangeEmailModalOpen(false)}
            onSuccess={(newEmail) => {
            const user = useAuthStore.getState().user;
            if (user) {
                setUser({ ...user, email: newEmail });
            }
            }}
        />

        <ChangePasswordModal
            isOpen={isChangePasswordModalOpen}
            onClose={() => setIsChangePasswordModalOpen(false)}
        />
        </div>
    );
}

export default CustomerSettingsPage;
