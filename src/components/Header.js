'use client';
import {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import Link from "next/link";

function CustomLink({ to, onClick, customUrl, children, isActive, ...rest }) {
    const path = customUrl ? customUrl : (to === '/trang-chu'? '/' : `/category${to}`);
    return (
        <Link href={path} onClick={onClick} {...rest} className={`hover:text-[#007bff] text-gray-600 font-semibold text-[16px] block ${isActive ? 'active-link' : 'inactive-link'}`}>
            {children}
        </Link>
    );
}

export default function Header({configData}) {
    const node = useRef();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [items, setItems] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState(null);
    const [activeSubmenuItem, setActiveSubmenuItem] = useState(null);
    const [style, setStyle] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const updateStyle = () => {
            if (window.innerWidth > 768) {
                setStyle({ minWidth: 'max-content', width: 'auto' });
            } else {
                setStyle({ minWidth: '100%', width: '100%' });
            }
        };

        updateStyle();
        window.addEventListener('resize', updateStyle);

        return () => window.removeEventListener('resize', updateStyle);
    }, []);

    const isMobile = () => window.innerWidth <= 768;

    const handleMouseEnter = () => {
        if (!isDropdownOpen && window.innerWidth > 768) {
            setDropdownOpen(true);
        }
        if (!isMobile()) {
            setDropdownOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (isDropdownOpen && window.innerWidth > 768) {
            setDropdownOpen(false);
        }
        if (!isMobile()) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setDropdownOpen(window.innerWidth > 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isDropdownVisible && searchValue.trim() !== "") {
            const fetchItems = async () => {
                const data = {
                    pageSize: 5,
                    currentPage: 1,
                    searchByFields: [
                        {
                            searchFieldName: "name",
                            searchValue: searchValue
                        }
                    ],
                    sortByFields: []
                };

                const result = await axios({
                    method: 'post',
                    url: 'https://api.ruoudutysanbay.com/LiquorExchange/Product/Get-List-Products',
                    data: data
                });

                setItems(result.data?.data.data);
            };
            fetchItems();
        }
    }, [searchValue, isDropdownVisible]);

    const handleSearch = event => {
        setSearchValue(event.target.value);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsDropdownVisible(false);
        }, 200);
    };

    const toggleMenu = useCallback(() => {
        const newMenuState = !isMenuOpen;
        setMenuOpen(newMenuState);
        setOverlayVisible(newMenuState);

        if (newMenuState) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isMenuOpen]);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
        setOverlayVisible(false);
        document.body.classList.remove('no-scroll');
    }, []);

    const handleClickOutside = useCallback((e) => {
        if (node.current && !node.current.contains(e.target)) {
            closeMenu();
        }
    }, [closeMenu]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.post('https://api.ruoudutysanbay.com/LiquorExchange/Category/Get-List-Category', {
                    pageSize: 100,
                    currentPage: 1,
                    searchByFields: [],
                    sortByFields: [],
                });
                setMenuItems(response.data.data.data);
            } catch (error) {
                console.error('Error fetching menu items: ', error);
            }
        };

        fetchMenuItems();
    }, []);

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setDropdownOpen(prev => !prev);
    };

    const handleMobileClick = (event) => {
        if (isMobile()) {
            event.preventDefault();
            toggleDropdown(event);
        } else {
            toggleDropdown(event);
        }
    };

    return (
        <header ref={node} className={`bg-white font-[sans-serif] sticky top-0 z-50 ${isScrolled ? 'border-b border-gray-200 shadow-md' : ''}`}>
            {
                isOverlayVisible &&
                <div className="fixed md:hidden inset-0 bg-gray-500 opacity-50 z-10"
                     onClick={closeMenu}>
                </div>
            }
            <div className="h-[96px]">
                <div className='flex lg:justify-between relative py-3 sm:px-10 px-4 border-gray-200 container mx-auto my-auto h-full'>
                    <Link href="/" className="my-auto w-[180px]"><img src="/Logo-dark.png" alt="logo"
                                                                      className='h-[70px]'/>
                    </Link>
                    <div className={`bg-white flex flex-col rounded-3xl relative z-20 my-auto lg:block ${isMenuOpen ? '' : 'hidden'}`}>
                        <div className='flex flex-wrap justify-center px-10 lg:py-3 relative z-10'>
                            <ul className={`lg:flex z-50 lg:translate-x-0 lg:relative lg:w-auto lg:overflow-visible lg:bg-transparent lg:space-y-0 max-lg:space-y-3 px-5 py-6 h-fit rounded-b-2xl md:px-0 md:py-0 fixed inset-y-0 left-0 w-full transform transition-transform duration-200 ease-in-out bg-white overflow-auto`}>
                                <Link href="/" className="my-auto w-[180px] md:hidden"><img src="/Logo-dark.png" alt="logo"
                                                                                  className='h-[70px]'/></Link>
                                <div
                                    className="overflow-y-auto md:overflow-y-visible max-h-[85%] md:max-h-none lg:flex lg:space-y-0 gap-10 max-lg:space-y-3">
                                    {
                                        menuItems
                                            .filter(menuItem => !menuItem.path.includes('/'))
                                            .sort((a, b) => a.index - b.index)
                                            .map((topLevelItem, i) => {
                                                const subMenuItems = menuItems.filter(subItem => subItem.path.startsWith(topLevelItem.path + '/'));
                                                const hasSubMenuItems = subMenuItems.length > 0;

                                                return (
                                                    <li key={i}
                                                        className={hasSubMenuItems ? 'group max-lg:border-b max-lg:py-2 relative' : 'max-lg:border-b max-lg:pb-2 pt-4 md:pt-0'}
                                                    >
                                                        {hasSubMenuItems ? (
                                                            <div onClick={handleMobileClick} className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>
                                                                {topLevelItem.name}
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="ml-1 inline-block" viewBox="0 0 24 24">
                                                                    <path d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z" data-name="16" data-original="#000000"/>
                                                                </svg>
                                                                {isDropdownOpen && (
                                                                    <ul style={style} className='block md:absolute hidden group-hover:block md:shadow-lg bg-white space-y-2 px-2 md:px-5 py-2 md:py-3 md:mt-0 lg:top-5 max-lg:top-8 left-0 min-w-[250px] z-50 rounded-lg md:rounded-b-xl'>
                                                                        <div className='grid grid-cols-1 md:grid-cols-3 w-full'>
                                                                            {subMenuItems.map((subItem, j) =>
                                                                                <li key={j} className={`px-3  ${j === subMenuItems.length - 1 ? 'border-b-0 pt-3 pb-1' : 'border-b py-3'} md:border-b`}>
                                                                                    <CustomLink
                                                                                        to={`/${subItem.slug}`}
                                                                                        customUrl={subItem.customUrl}
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            setActiveMenuItem(topLevelItem.slug);
                                                                                            setActiveSubmenuItem(subItem.slug);
                                                                                            closeMenu();
                                                                                        }}
                                                                                        isActive={
                                                                                            activeMenuItem == topLevelItem.slug &&
                                                                                            activeSubmenuItem == subItem.slug
                                                                                        }
                                                                                    >
                                                                                        {subItem.name}
                                                                                    </CustomLink>
                                                                                </li>
                                                                            )}
                                                                        </div>
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <CustomLink
                                                                to={`/${topLevelItem.slug}`}
                                                                customUrl={topLevelItem.customUrl}
                                                                onClick={() => {
                                                                    setActiveMenuItem(topLevelItem.slug);
                                                                    setActiveSubmenuItem(null);
                                                                    closeMenu();
                                                                }}
                                                                isActive={activeMenuItem == topLevelItem.slug}
                                                            >
                                                                {topLevelItem.name}
                                                            </CustomLink>
                                                        )}
                                                    </li>

                                                )
                                            })
                                    }
                                </div>
                                <div className="md:hidden absolute bottom-4 left-4">
                                    <Link href={`tel:${configData?.phoneNumber}`} className="relative hover:text-blue-500 flex gap-5">
                                        <div className="items-center hidden md:block">
                                            {configData?.phoneNumber?.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3")}
                                        </div>
                                    </Link>
                                </div>
                            </ul>
                        </div>
                        {isDropdownVisible && searchValue.trim() !== "" && (
                            <div className="dropdown-list absolute w-full lg:min-w-[600px] left-0 mt-14 bg-white shadow-lg rounded-md text-left flex flex-col">
                                {items.map((item, index) => (
                                    <Link href={`/product/${item.slug}`}
                                          className={`dropdown-item p-2 h-full hover:bg-blue-200 ${index === 0 ? 'rounded-t-md' : ''} ${index === items.length - 1 ? 'rounded-b-md' : ''}`}
                                          key={index}>
                                        <div className="flex gap-3">
                                            <div>
                                                <img src={`${item.productImages[0].image}?height=80`} alt=""/>
                                            </div>
                                            <div className="my-auto flex flex-col">
                                                <div className="font-bold">{item.name.toUpperCase()}</div>
                                                <div className="text-red-600">{Intl.NumberFormat('de-DE').format(item?.price) + 'đ'}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:flex items-center hidden w-[180px]">
                        <Link href={`tel:${configData?.phoneNumber}`} className="relative flex text-white bg-[#004275] rounded-3xl">
                            <div className="p-2 rounded-full mr-3 bg-[#0090d0]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" className="fill-current my-auto" style={{color: '#ffffff'}} viewBox="0 0 512 512">
                                    <path
                                        d="M272 0C404.5 0 512 107.5 512 240c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-114.9-93.1-208-208-208c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-80c0-8.8 7.2-16 16-16c79.5 0 144 64.5 144 144c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9-50.1-112-112-112c-8.8 0-16-7.2-16-16zm73 174.7c11.3-13.8 30.3-18.5 46.7-11.4l112 48c17.6 7.5 27.4 26.5 23.4 45.1l-24 112c-4 18.4-20.3 31.6-39.1 31.6l0 0c-6.1 0-12.2-.1-18.3-.4l-.1 0h0c-4.6-.2-9.1-.4-13.7-.8C183.5 494.5 0 300.7 0 64v0C0 45.1 13.2 28.8 31.6 24.9l112-24c18.7-4 37.6 5.8 45.1 23.4l48 112c7 16.4 2.4 35.4-11.4 46.7l-40.6 33.2c26.7 46 65.1 84.4 111.1 111.1L329 286.7zM448 480c3.8 0 7-2.6 7.8-6.3l24-112c.8-3.7-1.2-7.5-4.7-9l-112-48c-3.3-1.4-7.1-.5-9.3 2.3l-33.2 40.6c-9.9 12.1-27.2 15.3-40.8 7.4c-50.9-29.5-93.3-71.9-122.7-122.7c-7.9-13.6-4.7-30.9 7.4-40.8l40.6-33.2c2.8-2.3 3.7-6.1 2.3-9.3l-48-112c-1.5-3.5-5.3-5.5-9-4.7l-112 24C34.6 57 32 60.2 32 64v0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0c0 229.6 186.1 415.8 415.7 416l.3 0z"/>
                                </svg>
                            </div>

                            <div className="items-center hidden md:block text-center my-auto mx-auto mr-4">
                                {configData?.phoneNumber?.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3")}
                            </div>
                        </Link>
                    </div>
                    <div id="toggle" onClick={toggleMenu} className='flex ml-auto lg:order-1 lg:hidden relative z-20'>
                        <button className='ml-7'>
                            {isMenuOpen ? (
                                <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M6 6a1 1 0 011.414 0L10 8.586 12.586 6A1 1 0 1114 7.414L11.414 10 14 12.586a1 1 0 11-1.414 1.414L10 11.414 7.414 14A1 1 0 116 12.586L8.586 10 6 7.414A1 1 0 016 6z" clipRule="evenodd"></path>
                                </svg>
                            ) : (
                                <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

            </div>

        </header>
    )
}
