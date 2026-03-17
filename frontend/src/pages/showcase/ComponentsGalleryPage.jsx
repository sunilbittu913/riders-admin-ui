import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Search,
  Copy,
  Check,
  Eye,
  Code2,
  Layers,
  LayoutGrid,
  Zap,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Bell,
  Star,
  Heart,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  Filter,
  SortAsc,
  MoreHorizontal,
  ExternalLink,
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Components' },
  { id: 'layout', label: 'Layout' },
  { id: 'forms', label: 'Forms & Inputs' },
  { id: 'data', label: 'Data Display' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'overlays', label: 'Overlays' },
  { id: 'theming', label: 'Theming' },
];

const components = [
  // Layout
  {
    id: 'button',
    name: 'Button',
    category: 'layout',
    description: 'Versatile button component with multiple variants, sizes, and loading states.',
    tags: ['interactive', 'action', 'cta'],
    code: `import { Button } from '@/components/ui/button';\n\n<Button>Default</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="destructive">Destructive</Button>`,
    preview: (
      <div className="flex flex-wrap gap-2 items-center justify-center p-4">
        <Button size="sm">Default</Button>
        <Button size="sm" variant="outline">Outline</Button>
        <Button size="sm" variant="ghost">Ghost</Button>
        <Button size="sm" variant="secondary">Secondary</Button>
        <Button size="sm" variant="destructive">Destructive</Button>
      </div>
    ),
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'layout',
    description: 'Small status indicators and label components for metadata and categorization.',
    tags: ['label', 'status', 'tag'],
    code: `import { Badge } from '@/components/ui/badge';\n\n<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="outline">Outline</Badge>\n<Badge variant="destructive">Error</Badge>`,
    preview: (
      <div className="flex flex-wrap gap-2 items-center justify-center p-4">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Error</Badge>
        <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/20">Success</Badge>
        <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/20">Warning</Badge>
      </div>
    ),
  },
  {
    id: 'avatar',
    name: 'Avatar',
    category: 'layout',
    description: 'User avatar with image fallback, initials, and group stacking support.',
    tags: ['user', 'profile', 'image'],
    code: `import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';\n\n<Avatar>\n  <AvatarFallback>JD</AvatarFallback>\n</Avatar>`,
    preview: (
      <div className="flex gap-3 items-center justify-center p-4">
        {['JD', 'AB', 'MK', 'SR'].map((init, i) => (
          <Avatar key={i} className={i === 0 ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}>
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{init}</AvatarFallback>
          </Avatar>
        ))}
        <div className="flex -space-x-2">
          {['A', 'B', 'C'].map((l, i) => (
            <Avatar key={i} className="border-2 border-background w-7 h-7">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">{l}</AvatarFallback>
            </Avatar>
          ))}
          <div className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] text-muted-foreground font-medium">+5</div>
        </div>
      </div>
    ),
  },
  {
    id: 'separator',
    name: 'Separator',
    category: 'layout',
    description: 'Visual divider for separating content sections horizontally or vertically.',
    tags: ['divider', 'layout', 'visual'],
    code: `import { Separator } from '@/components/ui/separator';\n\n<Separator />\n<Separator orientation="vertical" className="h-6" />`,
    preview: (
      <div className="p-4 space-y-3">
        <div className="text-xs text-muted-foreground text-center">Section A</div>
        <Separator />
        <div className="text-xs text-muted-foreground text-center">Section B</div>
        <Separator />
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Left</span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-xs text-muted-foreground">Right</span>
        </div>
      </div>
    ),
  },
  // Forms
  {
    id: 'input',
    name: 'Input',
    category: 'forms',
    description: 'Text input with label, placeholder, error state, and icon support.',
    tags: ['form', 'text', 'field'],
    code: `import { Input } from '@/components/ui/input';\nimport { Label } from '@/components/ui/label';\n\n<Label htmlFor="email">Email</Label>\n<Input id="email" type="email" placeholder="you@example.com" />`,
    preview: (
      <div className="p-4 space-y-3 max-w-xs mx-auto">
        <div className="space-y-1.5">
          <Label className="text-xs">Email address</Label>
          <Input placeholder="you@example.com" className="h-8 text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Search</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 h-8 text-sm" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'select',
    name: 'Select',
    category: 'forms',
    description: 'Accessible dropdown select with search, groups, and custom rendering.',
    tags: ['form', 'dropdown', 'select'],
    code: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';\n\n<Select>\n  <SelectTrigger>\n    <SelectValue placeholder="Select option" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="a">Option A</SelectItem>\n  </SelectContent>\n</Select>`,
    preview: (
      <div className="p-4 flex items-center justify-center">
        <Select>
          <SelectTrigger className="w-44 h-8 text-sm">
            <SelectValue placeholder="Select status..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ),
  },
  {
    id: 'switch',
    name: 'Switch & Checkbox',
    category: 'forms',
    description: 'Toggle switches and checkboxes for boolean and multi-select inputs.',
    tags: ['toggle', 'checkbox', 'boolean'],
    code: `import { Switch } from '@/components/ui/switch';\nimport { Checkbox } from '@/components/ui/checkbox';\n\n<Switch />\n<Checkbox />`,
    preview: (
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Switch defaultChecked id="s1" />
          <Label htmlFor="s1" className="text-xs">Enable notifications</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch id="s2" />
          <Label htmlFor="s2" className="text-xs">Dark mode</Label>
        </div>
        <Separator />
        {['Option A', 'Option B', 'Option C'].map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <Checkbox id={`c${i}`} defaultChecked={i === 0} />
            <Label htmlFor={`c${i}`} className="text-xs">{opt}</Label>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'slider',
    name: 'Slider & Progress',
    category: 'forms',
    description: 'Range slider and progress bar for numeric input and status display.',
    tags: ['range', 'progress', 'numeric'],
    code: `import { Slider } from '@/components/ui/slider';\nimport { Progress } from '@/components/ui/progress';\n\n<Slider defaultValue={[50]} max={100} />\n<Progress value={75} />`,
    preview: (
      <div className="p-4 space-y-4 max-w-xs mx-auto">
        <div className="space-y-1.5">
          <Label className="text-xs">Volume: 65%</Label>
          <Slider defaultValue={[65]} max={100} className="w-full" />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Upload progress</span>
            <span>75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Storage used</span>
            <span>40%</span>
          </div>
          <Progress value={40} className="h-2" />
        </div>
      </div>
    ),
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'forms',
    description: 'Multi-line text input with auto-resize and character count support.',
    tags: ['form', 'multiline', 'text'],
    code: `import { Textarea } from '@/components/ui/textarea';\n\n<Textarea placeholder="Enter your message..." rows={4} />`,
    preview: (
      <div className="p-4 max-w-xs mx-auto space-y-1.5">
        <Label className="text-xs">Message</Label>
        <Textarea placeholder="Enter your message here..." className="text-sm resize-none" rows={3} />
        <p className="text-[10px] text-muted-foreground text-right">0 / 500</p>
      </div>
    ),
  },
  // Data Display
  {
    id: 'card',
    name: 'Card',
    category: 'data',
    description: 'Flexible card container with header, content, and footer sections.',
    tags: ['container', 'layout', 'content'],
    code: `import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';\n\n<Card>\n  <CardHeader>\n    <CardTitle>Title</CardTitle>\n  </CardHeader>\n  <CardContent>Content</CardContent>\n</Card>`,
    preview: (
      <div className="p-3 grid grid-cols-2 gap-2">
        {[
          { label: 'Revenue', value: '$48.5K', change: '+12%', positive: true },
          { label: 'Drivers', value: '1,247', change: '+5%', positive: true },
          { label: 'Disputes', value: '23', change: '-8%', positive: false },
          { label: 'Rating', value: '4.8', change: '+0.2', positive: true },
        ].map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-2.5">
            <div className="text-[10px] text-muted-foreground">{item.label}</div>
            <div className="text-sm font-bold text-foreground">{item.value}</div>
            <div className={`text-[10px] font-medium ${item.positive ? 'text-green-500' : 'text-red-500'}`}>
              {item.change}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'data',
    description: 'Tabbed content panels for organizing related information into sections.',
    tags: ['navigation', 'panels', 'sections'],
    code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';\n\n<Tabs defaultValue="tab1">\n  <TabsList>\n    <TabsTrigger value="tab1">Tab 1</TabsTrigger>\n  </TabsList>\n  <TabsContent value="tab1">Content</TabsContent>\n</Tabs>`,
    preview: (
      <div className="p-3">
        <Tabs defaultValue="overview">
          <TabsList className="h-8">
            <TabsTrigger value="overview" className="text-xs h-7">Overview</TabsTrigger>
            <TabsTrigger value="details" className="text-xs h-7">Details</TabsTrigger>
            <TabsTrigger value="history" className="text-xs h-7">History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-2">
            <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded">Overview content goes here</div>
          </TabsContent>
          <TabsContent value="details" className="mt-2">
            <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded">Details content goes here</div>
          </TabsContent>
          <TabsContent value="history" className="mt-2">
            <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded">History content goes here</div>
          </TabsContent>
        </Tabs>
      </div>
    ),
  },
  // Feedback
  {
    id: 'alert',
    name: 'Alert',
    category: 'feedback',
    description: 'Contextual alert messages for info, success, warning, and error states.',
    tags: ['notification', 'message', 'status'],
    code: `import { Alert, AlertDescription } from '@/components/ui/alert';\n\n<Alert>\n  <AlertDescription>This is an alert message.</AlertDescription>\n</Alert>`,
    preview: (
      <div className="p-3 space-y-2">
        <Alert className="py-2 border-blue-500/30 bg-blue-500/5">
          <Info className="w-3.5 h-3.5 text-blue-500" />
          <AlertDescription className="text-xs ml-1">Informational message here.</AlertDescription>
        </Alert>
        <Alert className="py-2 border-green-500/30 bg-green-500/5">
          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
          <AlertDescription className="text-xs ml-1">Action completed successfully.</AlertDescription>
        </Alert>
        <Alert className="py-2 border-yellow-500/30 bg-yellow-500/5">
          <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" />
          <AlertDescription className="text-xs ml-1">Warning: Please review this.</AlertDescription>
        </Alert>
        <Alert className="py-2 border-red-500/30 bg-red-500/5">
          <XCircle className="w-3.5 h-3.5 text-red-500" />
          <AlertDescription className="text-xs ml-1">Error: Something went wrong.</AlertDescription>
        </Alert>
      </div>
    ),
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'feedback',
    description: 'Accessible tooltips for providing additional context on hover or focus.',
    tags: ['hover', 'hint', 'accessible'],
    code: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';\n\n<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger>Hover me</TooltipTrigger>\n    <TooltipContent>Tooltip text</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`,
    preview: (
      <div className="p-4 flex gap-3 items-center justify-center">
        <TooltipProvider>
          {[
            { label: 'Delete', icon: <Trash2 className="w-4 h-4" />, tip: 'Delete item' },
            { label: 'Edit', icon: <Edit className="w-4 h-4" />, tip: 'Edit item' },
            { label: 'Download', icon: <Download className="w-4 h-4" />, tip: 'Download file' },
            { label: 'Share', icon: <Upload className="w-4 h-4" />, tip: 'Share link' },
          ].map((item, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="w-8 h-8">
                  {item.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{item.tip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    ),
  },
  // Navigation
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'navigation',
    description: 'Hierarchical navigation trail showing the current page location.',
    tags: ['navigation', 'path', 'hierarchy'],
    code: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';\n\n<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>Current</BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`,
    preview: (
      <div className="p-4 flex items-center justify-center">
        <nav className="flex items-center gap-1 text-xs">
          {['Home', 'Admin', 'Drivers', 'Profile'].map((item, i, arr) => (
            <React.Fragment key={i}>
              <span className={i === arr.length - 1 ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground cursor-pointer transition-colors'}>
                {item}
              </span>
              {i < arr.length - 1 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
            </React.Fragment>
          ))}
        </nav>
      </div>
    ),
  },
  {
    id: 'pagination',
    name: 'Pagination',
    category: 'navigation',
    description: 'Page navigation controls for large datasets with first/last and ellipsis support.',
    tags: ['navigation', 'pages', 'data'],
    code: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';`,
    preview: (
      <div className="p-4 flex items-center justify-center">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="w-7 h-7">
            <ChevronRight className="w-3 h-3 rotate-180" />
          </Button>
          {[1, 2, 3, '...', 8, 9, 10].map((p, i) => (
            <Button
              key={i}
              variant={p === 2 ? 'default' : 'outline'}
              size="icon"
              className="w-7 h-7 text-xs"
            >
              {p}
            </Button>
          ))}
          <Button variant="outline" size="icon" className="w-7 h-7">
            <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    ),
  },
];

const ComponentCard = ({ comp }) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(comp.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="group hover:border-primary/40 transition-all duration-200 overflow-hidden">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">{comp.name}</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{comp.description}</p>
          </div>
          <Badge variant="outline" className="text-[10px] shrink-0 capitalize">{comp.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        {/* Preview */}
        <div className="rounded-lg border border-border bg-muted/20 min-h-[100px] overflow-hidden">
          {comp.preview}
        </div>

        {/* Code toggle */}
        {showCode && (
          <div className="relative rounded-lg bg-muted/60 border border-border overflow-hidden">
            <pre className="p-3 text-[11px] text-foreground/80 overflow-x-auto leading-relaxed font-mono">
              {comp.code}
            </pre>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {comp.tags.map(tag => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7"
              onClick={() => setShowCode(v => !v)}
              title={showCode ? 'Hide code' : 'Show code'}
            >
              <Code2 className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7"
              onClick={handleCopy}
              title="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ComponentsGalleryPage = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');

  const filtered = useMemo(() => {
    return components.filter(comp => {
      const matchesCategory = activeCategory === 'all' || comp.category === activeCategory;
      const matchesSearch = !search || 
        comp.name.toLowerCase().includes(search.toLowerCase()) ||
        comp.description.toLowerCase().includes(search.toLowerCase()) ||
        comp.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Component Gallery</h1>
        <p className="text-muted-foreground text-sm">
          {components.length} production-ready components built with Radix UI and TailwindCSS. 
          Click the code icon to view usage, copy icon to copy the snippet.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>{filtered.length} results</span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Components grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(comp => (
            <ComponentCard key={comp.id} comp={comp} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <Layers className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No components found</p>
          <p className="text-sm mt-1">Try a different search term or category</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => { setSearch(''); setActiveCategory('all'); }}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ComponentsGalleryPage;
