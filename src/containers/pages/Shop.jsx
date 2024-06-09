import React, { useState, useEffect } from "react";
import Layout from "../../hocs/Layout.js";

// UI
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline/index.js";
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid/index.js";
import { Separator } from "../../components/ui/separator.jsx";
import { Checkbox } from "../../components/ui/checkbox.jsx";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../components/ui/sheet.jsx";
import { Label } from "../../components/ui/label.jsx";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group.jsx";

// REDUX
import { connect } from "react-redux";
import { get_categories } from "../../redux/actions/categories.js";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Shop = ({ get_categories, categories }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    get_categories();
  }, []);

  return (
    <Layout>
      <div className="bg-background">
        <Sheet>
          <div>
            {/* Mobile filter dialog */}
            <Transition show={mobileFiltersOpen}>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    <div className="mt-4">
                      <Separator />
                      <h3 className="sr-only">Categories</h3>
                      <ul role="list" className="px-2 py-6 font-medium text-foreground">
                        <RadioGroup className="space-y-4">
                          {categories &&
                            categories !== null &&
                            categories !== undefined &&
                            categories.map((category) => {
                              if (category?.sub_categories.length === 0) {
                                return (
                                  <div className="flex items-center space-x-6">
                                    <RadioGroupItem value={category?.name} id={category?.name} />
                                    <Label htmlFor={category?.name}>{category?.name}</Label>
                                  </div>
                                );
                              } else {
                                let result = [];
                                result.push(
                                  <div className="flex items-center space-x-6">
                                    <RadioGroupItem value={category?.name} id={category?.name} />
                                    <Label htmlFor={category?.name}>{category?.name}</Label>
                                  </div>
                                );
                                category?.sub_categories.map((sub_category) => {
                                  result.push(
                                    <div className="flex items-center space-x-6">
                                      <RadioGroupItem value={sub_category?.name} id={sub_category?.name} />
                                      <Label htmlFor={sub_category?.name}>{sub_category?.name}</Label>
                                    </div>
                                  );
                                });

                                return result;
                              }
                            })}
                        </RadioGroup>
                      </ul>

                      <Separator />
                      {filters.map((section) => (
                        // Here ypu can use an Accordion from SHADCN UI
                        <Disclosure as="div" key={section.id} className="px-4 py-6">
                          {/* Here ypu can use an AccordionItem from SHADCN UI */}
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                {/* Here ypu can use an AccordionTrigger from SHADCN UI */}
                                <DisclosureButton className="flex w-full items-center justify-between bg-background px-2 py-3 hover:text-foreground text-muted-foreground">
                                  <span className="font-medium text-foreground">{section.name}</span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                  </span>
                                </DisclosureButton>
                              </h3>
                              {/* Here ypu can use an AccordionContent from SHADCN UI */}
                              <DisclosurePanel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                      <Checkbox
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        defaultChecked={option.checked}
                                        defaultValue={option.value}
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-muted-foreground"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </DisclosurePanel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Transition>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">New Arrivals</h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="group inline-flex justify-center text-sm font-medium text-foreground hover:text-muted-foreground">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-foreground hover:text-muted-foreground"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-background shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <MenuItem key={option.name}>
                              {({ focus }) => (
                                <a
                                  href={option.href}
                                  className={classNames(
                                    option.current ? "font-medium text-foreground" : "text-muted-foreground",
                                    focus ? "bg-muted" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </a>
                              )}
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Transition>
                  </Menu>

                  <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <SheetTrigger>
                      <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                    </SheetTrigger>
                  </button>
                </div>
              </div>

              <Separator />

              <section aria-labelledby="products-heading" className="pb-24 pt-6">
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="space-y-4 pb-6 text-sm font-medium text-foreground">
                      <RadioGroup className="flex flex-col space-y-4">
                        {categories &&
                          categories !== null &&
                          categories !== undefined &&
                          categories.map((category) => {
                            if (category?.sub_categories.length === 0) {
                              return (
                                <div className="flex items-center space-x-6">
                                  <RadioGroupItem value={category?.name} id={category?.name} />
                                  <Label htmlFor={category?.name}>{category?.name}</Label>
                                </div>
                              );
                            } else {
                              let result = [];
                              result.push(
                                <div className="flex items-center space-x-6">
                                  <RadioGroupItem value={category?.name} id={category?.name} />
                                  <Label htmlFor={category?.name}>{category?.name}</Label>
                                </div>
                              );
                              category?.sub_categories.map((sub_category) => {
                                result.push(
                                  <div className="flex items-center space-x-6">
                                    <RadioGroupItem value={sub_category?.name} id={sub_category?.name} />
                                    <Label htmlFor={sub_category?.name}>{sub_category?.name}</Label>
                                  </div>
                                );
                              });

                              return result;
                            }
                          })}
                      </RadioGroup>
                    </ul>

                    {/* <Separator /> */}

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <DisclosureButton className="flex w-full items-center justify-between bg-background py-3 text-sm hover:text-foreground text-muted-foreground">
                                <span className="font-medium text-foreground">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </DisclosureButton>
                              <Separator />
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <Checkbox
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      defaultChecked={option.checked}
                                      defaultValue={option.value}
                                    />
                                    <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-muted-foreground">
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

                  {/* Product grid */}
                  <div className="lg:col-span-3">{/* Your content */}</div>
                </div>
              </section>
            </main>
          </div>
        </Sheet>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  categories: state.Categories.categories,
});

export default connect(mapStateToProps, {
  get_categories,
})(Shop);
