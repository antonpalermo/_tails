import { Search } from "./search-input"
import { Button } from "@/components/ui/button"

export default async function Navbar() {
  return (
    <nav className="py-4 sticky top-0 bg-white">
      <div className="container mx-auto flex">
        <Search className="flex-1" placeholder="Search Courses" />
        <span className="flex-1" />
        <div className="inline-flex items-center space-x-2">
          <Button variant="outline">Instructor Dashboard</Button>
        </div>
      </div>
    </nav>
  )
}
