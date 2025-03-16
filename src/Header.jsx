// In the Header component, update the search bar section:

{/* Desktop Search */}
<div className="hidden md:flex flex-1 max-w-2xl mx-8">
  <div className="relative w-full">
    <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Search jobs, companies, or keywords..."
      className="w-full pl-12 pr-4 h-12 text-base bg-background/95 border-primary/20 focus:border-primary transition-colors"
      value={searchInput}
      onChange={(e) => handleSearch(e.target.value)}
    />
  </div>
</div>

{/* Mobile Search - Add this inside SheetContent */}
<div className="mb-6 mt-2">
  <div className="relative w-full">
    <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Search jobs, companies..."
      className="w-full pl-12 pr-4 h-12 text-base bg-background/95 border-primary/20 focus:border-primary transition-colors"
      value={searchInput}
      onChange={(e) => handleSearch(e.target.value)}
    />
  </div>
</div>
