import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function MainNav() {

  return (
    <div className="flex gap-6 md:gap-10">
      <a href="/" className="flex items-center space-x-2">
        <Icons.laptop className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </a>
      
    </div>
  )
}
