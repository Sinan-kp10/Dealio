import { useState } from "react"
import CategoriesTab from "../components/CategoriesTab"
import SubCategoriesTab from "../components/SubCategoriesTab"

function CategoryManagementPage() {
    const [activeTab, setActiveTab] = useState<"CATEGORIES" | "SUBCATEGORIES">("CATEGORIES")
    const [refreshCount, setRefreshCount] = useState(0)

    return (
        <div className="w-full space-y-6 pb-12">
            <div>
                <h1 className="text-2xl sm:text-[1.75rem] font-bold text-[#0F1D2F] tracking-tight leading-tight m-0">
                    Category Management
                </h1>
                <p className="text-slate-500 text-sm sm:text-[0.9375rem] mt-1.5 m-0">
                    Manage categories and their subcategories used for quotation requests.
                </p>
            </div>

            <div className="flex items-center gap-2 border-b border-slate-200">
                <button
                    type="button"
                    onClick={() => setActiveTab("CATEGORIES")}
                    className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                        activeTab === "CATEGORIES"
                            ? "border-[#244673] text-[#244673]"
                            : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                >
                    Categories
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("SUBCATEGORIES")}
                    className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                        activeTab === "SUBCATEGORIES"
                            ? "border-[#244673] text-[#244673]"
                            : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                >
                    Subcategories
                </button>
            </div>

            <div className={activeTab === "CATEGORIES" ? "space-y-6" : "hidden"}>
                <CategoriesTab
                    refreshTrigger={refreshCount}
                    onCategoryChanged={() => setRefreshCount((prev) => prev + 1)}
                />
            </div>

            <div className={activeTab === "SUBCATEGORIES" ? "space-y-6" : "hidden"}>
                <SubCategoriesTab
                    onSubCategoryAdded={() => setRefreshCount((prev) => prev + 1)}
                />
            </div>
        </div>
    )
}

export default CategoryManagementPage
