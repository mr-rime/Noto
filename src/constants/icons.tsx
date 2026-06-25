import React from "react";

const HomeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className="newSidebarHome"
        style={{ width: 20, height: 20, display: "block", fill: "rgb(145, 145, 142)", flexShrink: 0 }}
        width="20"
        height="20"
    >
        <path
            d="M10.1416 3.77299C10.0563 3.71434 9.94368 3.71434 9.85837 3.77299L3.60837 8.06989C3.54053 8.11653 3.5 8.19357 3.5 8.2759V14.2499C3.5 14.9402 4.05964 15.4999 4.75 15.4999H7.5L7.5 10.7499C7.5 10.0595 8.05964 9.49987 8.75 9.49987H11.25C11.9404 9.49987 12.5 10.0595 12.5 10.7499L12.5 15.4999H15.25C15.9404 15.4999 16.5 14.9402 16.5 14.2499V8.2759C16.5 8.19357 16.4595 8.11653 16.3916 8.06989L10.1416 3.77299ZM9.00857 2.53693C9.60576 2.12636 10.3942 2.12636 10.9914 2.53693L17.2414 6.83383C17.7163 7.1603 18 7.69963 18 8.2759V14.2499C18 15.7687 16.7688 16.9999 15.25 16.9999H12.25C11.5596 16.9999 11 16.4402 11 15.7499L11 10.9999H9L9 15.7499C9 16.4402 8.44036 16.9999 7.75 16.9999H4.75C3.23122 16.9999 2 15.7687 2 14.2499V8.2759C2 7.69963 2.2837 7.1603 2.75857 6.83383L9.00857 2.53693Z"
            fill="#91918E"
        />
    </svg>
);

const ComposeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className="compose"
        style={{ width: 22, height: 22, display: "block", flexShrink: 0 }}
    >
        <path
            d="m16.774 4.341-.59.589-1.109-1.11.596-.594a.784.784 0 0 1 1.103 0c.302.302.302.8 0 1.102zM8.65 12.462l6.816-6.813-1.11-1.11-6.822 6.808a1.1 1.1 0 0 0-.236.393l-.289.932c-.052.196.131.38.315.314l.932-.288a.9.9 0 0 0 .394-.236"
            fill="currentColor"
        />
        <path
            d="M4.375 6.25c0-1.036.84-1.875 1.875-1.875H11a.625.625 0 1 0 0-1.25H6.25A3.125 3.125 0 0 0 3.125 6.25v7.5c0 1.726 1.4 3.125 3.125 3.125h7.5c1.726 0 3.125-1.4 3.125-3.125V9a.625.625 0 1 0-1.25 0v4.75c0 1.036-.84 1.875-1.875 1.875h-7.5a1.875 1.875 0 0 1-1.875-1.875z"
            fill="currentColor"
        />
    </svg>
);


const PlusSmallIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="plusSmall"
        style={{ width: 17, height: 17, display: "block", flexShrink: 0 }}
        width="17"
        height="17"
        aria-hidden="true"
        role="img"
    >
        <path
            d="M8 2.3a.7.7 0 0 0-.7.7v4.3H3a.7.7 0 1 0 0 1.4h4.3V13a.7.7 0 1 0 1.4 0V8.7H13a.7.7 0 1 0 0-1.4H8.7V3a.7.7 0 0 0-.7-.7"
            fillOpacity="0.6"
            fill="currentColor"
        />
    </svg>
);

const EllipsisSmallIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 13"
        className="ellipsisSmall"
        style={{ width: 17, height: 17, display: "block", flexShrink: 0 }}
        width="17"
        height="17"
        aria-hidden="true"
        role="img"
    >
        <path
            d="M3.2 6.725a1.275 1.275 0 1 0 0 2.55 1.275 1.275 0 0 0 0-2.55m4.8 0a1.275 1.275 0 1 0 0 2.55 1.275 1.275 0 0 0 0-2.55m4.8 0a1.275 1.275 0 1 0 0 2.55 1.275 1.275 0 0 0 0-2.55"
            fillOpacity="0.6"
            fill="currentColor"
        />
    </svg>
);


const EmojiIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 14"
        role="graphics-symbol"
        aria-hidden="true"
        className="addPage"
        width={14}
        height={14}
        style={{ width: 14, height: 14, display: "block", fill: "currentColor", flexShrink: 0, marginRight: 6 }}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 0c3.861 0 7 3.139 7 7s-3.139 7-7 7-7-3.139-7-7 3.139-7 7-7zM3.561 5.295a1.027 1.027 0 1 0 2.054 0 1.027 1.027 0 0 0-2.054 0zm5.557 1.027a1.027 1.027 0 1 1 0-2.054 1.027 1.027 0 0 1 0 2.054zm1.211 2.816a.77.77 0 0 0-.124-1.087.786.786 0 0 0-1.098.107c-.273.407-1.16.958-2.254.958-1.093 0-1.981-.55-2.244-.945a.788.788 0 0 0-1.107-.135.786.786 0 0 0-.126 1.101c.55.734 1.81 1.542 3.477 1.542 1.668 0 2.848-.755 3.476-1.541z"
            fillOpacity={0.5}
            fill="currentColor"
        />
    </svg>
)

const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" role="graphics-symbol" aria-hidden="true"
        className="addPageCover" width={14} height={14} style={{
            width: 14, height: 14, display: "block",
            fill: "currentColor", flexShrink: 0, marginRight: 6
        }}>
        <path fillRule="evenodd" clipRule="evenodd"
            d="M2 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm0 12h10L8.5 5.5l-2 4-2-1.5L2 12z"
            fillOpacity={0.5} fill="currentColor" />
    </svg>
)

const PageEmptyIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="graphics-symbol"
        viewBox="0 0 16 16"
        className="pageEmpty"
        width="18"
        height="18"
        style={{
            display: "block",
            fill: "rgb(145, 145, 142)",
            flexShrink: 0,
        }}
    >
        <path
            d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703Z"
            fill="#91918E"
        />
    </svg>
);


const TrashIcon = () => (
    <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="graphics-symbol"
        viewBox="0 0 20 20"
        className="trash"
        style={{
            width: 20,
            height: 20,
            display: "block",
            fill: "currentColor",
            flexShrink: 0,
        }}
        width={20}
        height={20}
    >
        <path d="M8.806 8.505a.55.55 0 0 0-1.1 0v5.979a.55.55 0 1 0 1.1 0zm3.488 0a.55.55 0 0 0-1.1 0v5.979a.55.55 0 1 0 1.1 0z" />
        <path d="M6.386 3.925v1.464H3.523a.625.625 0 1 0 0 1.25h.897l.393 8.646A2.425 2.425 0 0 0 7.236 17.6h5.528a2.425 2.425 0 0 0 2.422-2.315l.393-8.646h.898a.625.625 0 1 0 0-1.25h-2.863V3.925c0-.842-.683-1.525-1.525-1.525H7.91c-.842 0-1.524.683-1.524 1.525M7.91 3.65h4.18c.15 0 .274.123.274.275v1.464H7.636V3.925c0-.152.123-.275.274-.275m-.9 2.99h7.318l-.39 8.588a1.175 1.175 0 0 1-1.174 1.122H7.236a1.175 1.175 0 0 1-1.174-1.122l-.39-8.589z" />
    </svg>
);


const DuplicateIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="graphics-symbol"
            viewBox="0 0 20 20"
            className="duplicate"
            width="20"
            height="20"
            style={{
                display: "block",
                flexShrink: 0,
            }}
        >
            <path
                d="M4.5 2.375A2.125 2.125 0 0 0 2.375 4.5V12c0 1.174.951 2.125 2.125 2.125h1.625v1.625c0 1.174.951 2.125 2.125 2.125h7.5a2.125 2.125 0 0 0 2.125-2.125v-7.5a2.125 2.125 0 0 0-2.125-2.125h-1.625V4.5A2.125 2.125 0 0 0 12 2.375zm8.375 3.75H8.25A2.125 2.125 0 0 0 6.125 8.25v4.625H4.5A.875.875 0 0 1 3.625 12V4.5c0-.483.392-.875.875-.875H12c.483 0 .875.392.875.875zm-5.5 2.125c0-.483.392-.875.875-.875h7.5c.483 0 .875.392.875.875v7.5a.875.875 0 0 1-.875.875h-7.5a.875.875 0 0 1-.875-.875z"
                fill="currentColor"
            />
        </svg>
    );
};
const ArrowTurnUpRightIcon = () => (
    <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        role="graphics-symbol" viewBox="0 0 20 20" className="arrowTurnUpRight"
        style={{ width: 20, height: 20, display: "block", flexShrink: 0 }} width={20} height={20} >
        <path
            d="M12.408 4.792a.625.625 0 0 1 .884-.884l4.4 4.4a.625.625 0 0 1 0 .884l-4.4 4.4a.625.625 0 0 1-.884-.884l3.333-3.333H5.25a.875.875 0 0 0-.875.875v5a.625.625 0 1 1-1.25 0v-5c0-1.173.951-2.125 2.125-2.125h10.491z"
            fill="currentColor" />
    </svg >
)

const LinkIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="graphics-symbol"
            viewBox="0 0 20 20"
            className="link"
            width="20"
            height="20"
            style={{
                display: "block",
                flexShrink: 0,
            }}
        >
            <path
                d="M10.61 3.61a3.776 3.776 0 0 1 5.34 0l.367.368a3.776 3.776 0 0 1 0 5.34l-1.852 1.853a.625.625 0 1 1-.884-.884l1.853-1.853a2.526 2.526 0 0 0 0-3.572l-.368-.367a2.526 2.526 0 0 0-3.572 0L9.641 6.347a.625.625 0 0 1-.883-.884z"
                fill="currentColor"
            />
            <path
                d="M12.98 6.949a.625.625 0 0 1 0 .883l-5.45 5.449a.625.625 0 1 1-.884-.884l5.448-5.448a.625.625 0 0 1 .884 0"
                fill="currentColor"
            />
            <path
                d="M6.348 8.757a.625.625 0 0 1 0 .884l-1.853 1.853a2.526 2.526 0 0 0 0 3.572l.367.367a2.526 2.526 0 0 0 3.572 0l1.853-1.852a.625.625 0 1 1 .884.883l-1.853 1.853a3.776 3.776 0 0 1-5.34 0l-.367-.367a3.776 3.776 0 0 1 0-5.34l1.853-1.853a.625.625 0 0 1 .884 0"
                fill="currentColor"
            />
        </svg>
    );
};

const UndoIcon = () => (
    <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        role="graphics-symbol" viewBox="0 0 16 16" className="undo"
        style={{
            width: 16,
            height: 16,
            display: "block",
            fill: "currentColor",
            flexShrink: 0,
        }}
        width="16" height="16">
        <path
            d="M14.542 10.6826C14.542 7.96875 12.71 6.10254 9.59961 6.10254H5.29297L3.70703 6.1709L4.91016 5.15234L6.67383 3.43652C6.80371 3.30664 6.89258 3.14258 6.89258 2.91699C6.89258 2.5 6.59863 2.19238 6.1543 2.19238C5.96973 2.19238 5.76465 2.28125 5.61426 2.4248L1.69043 6.29395C1.5332 6.4375 1.45117 6.64258 1.45117 6.84766C1.45117 7.05273 1.5332 7.25098 1.69043 7.40137L5.61426 11.2705C5.76465 11.4141 5.96973 11.5029 6.1543 11.5029C6.59863 11.5029 6.89258 11.1953 6.89258 10.7715C6.89258 10.5527 6.80371 10.3887 6.67383 10.252L4.91016 8.53613L3.70703 7.52441L5.29297 7.59277H9.64746C11.8486 7.59277 13.0586 8.84375 13.0586 10.6211C13.0586 12.4053 11.8486 13.7109 9.64746 13.7109H8.05469C7.60352 13.7109 7.2959 14.0459 7.2959 14.4629C7.2959 14.873 7.61035 15.208 8.05469 15.208H9.69531C12.751 15.208 14.542 13.4102 14.542 10.6826Z"
        />
    </svg>
)

const EyesIcon = () => (
    <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        role="graphics-symbol" viewBox="0 0 72 72" className="eyes"
        style={{
            width: '64px',
            height: '64px',
            display: 'block',
            fill: 'rgb(55, 53, 47)',
            flexShrink: 0,
            color: 'rgb(55, 53, 47)',
            marginBottom: '16px',
        }}
        width="72" height="72">
        <path
            d="M17.0312 64.4375C26.25 64.4375 33.5625 52.9688 33.5625 36.4375C33.5625 19.9062 26.25 8.46875 17.0312 8.46875C7.8125 8.46875 0.5 19.9062 0.5 36.4375C0.5 52.9688 7.8125 64.4375 17.0312 64.4375ZM54.9688 64.4375C64.1875 64.4375 71.5 52.9688 71.5 36.4375C71.5 19.9062 64.1875 8.46875 54.9688 8.46875C45.75 8.46875 38.4375 19.9062 38.4375 36.4375C38.4375 52.9688 45.75 64.4375 54.9688 64.4375ZM10.0625 47.1875C15.125 47.1875 18.4688 43.6562 18.4688 38.3438C18.4688 33.0938 15.125 29.5625 10.0625 29.5625C7.6875 29.5625 5.71875 30.3125 4.25 31.6875C5.375 19.9375 10.6875 11.9375 17.0312 11.9062C24.25 11.875 30.125 22.0312 30.125 36.4375C30.125 50.7812 24.25 60.9688 17.0312 61C11.5312 61.0312 6.78125 54.9688 4.90625 45.5938C6.28125 46.625 8.03125 47.1875 10.0625 47.1875ZM47.9688 47.1875C53 47.1875 56.4062 43.6562 56.4062 38.3438C56.4062 33.0938 53 29.5625 47.9688 29.5625C45.5938 29.5625 43.5938 30.3438 42.1562 31.6875C43.2812 19.9375 48.5938 11.9375 54.9688 11.9375C62.1562 11.9062 68 22.0938 68 36.4375C68 50.7812 62.1562 60.9688 54.9688 60.9688C49.4375 61 44.6875 54.9375 42.7812 45.5938C44.1562 46.5938 45.9375 47.1875 47.9688 47.1875ZM45.5312 37.4062C44.4375 37.25 43.75 35.9688 44.0312 34.6562C44.3125 33.3125 45.3125 32.3438 46.375 32.5312C47.4688 32.75 48.0938 34.0312 47.8438 35.3125C47.5938 36.6562 46.5938 37.5938 45.5312 37.4062ZM7.625 37.4062C6.53125 37.25 5.84375 35.9688 6.09375 34.6562C6.375 33.3125 7.40625 32.3438 8.4375 32.5312C9.5625 32.7812 10.1875 34.0312 9.9375 35.3125C9.6875 36.6562 8.65625 37.5938 7.625 37.4062Z"
            fill="#37352F" />
    </svg>
)


const ChevronDownRoundedThick = () => (
    <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        role="graphics-symbol" viewBox="0 0 12 12" className="chevronDownRoundedThick"
        style={{
            width: '14px',
            height: '14px',
            display: 'block',
            fill: 'currentColor',
            flexShrink: 0,
            transition: 'transform 200ms ease-out',
            transform: 'rotateZ(-90deg)',
            opacity: 1,
        }}
        width="12" height="12">
        <path
            d="M6.02734 8.80274C6.27148 8.80274 6.47168 8.71484 6.66211 8.51465L10.2803 4.82324C10.4268 4.67676 10.5 4.49609 10.5 4.28125C10.5 3.85156 10.1484 3.5 9.72363 3.5C9.50879 3.5 9.30859 3.58789 9.15234 3.74902L6.03223 6.9668L2.90722 3.74902C2.74609 3.58789 2.55078 3.5 2.33105 3.5C1.90137 3.5 1.55469 3.85156 1.55469 4.28125C1.55469 4.49609 1.62793 4.67676 1.77441 4.82324L5.39258 8.51465C5.58789 8.71973 5.78808 8.80274 6.02734 8.80274Z"
            fillOpacity="0.35" fill="currentColor" />
    </svg>
)


const SearchIcon = () => (
    <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        role="graphics-symbol" viewBox="0 0 20 20" className="newSidebarSearch"
        style={{ width: 20, height: 20, display: 'block', fill: 'rgb(145, 145, 142)', flexShrink: 0 }}
        width="20" height="20">
        <path fillRule="evenodd" clipRule="evenodd"
            d="M4 8.75C4 6.12665 6.12665 4 8.75 4C11.3734 4 13.5 6.12665 13.5 8.75C13.5 11.3734 11.3734 13.5 8.75 13.5C6.12665 13.5 4 11.3734 4 8.75ZM8.75 2.5C5.29822 2.5 2.5 5.29822 2.5 8.75C2.5 12.2018 5.29822 15 8.75 15C10.2056 15 11.545 14.5024 12.6073 13.668L16.7197 17.7803C17.0126 18.0732 17.4874 18.0732 17.7803 17.7803C18.0732 17.4874 18.0732 17.0126 17.7803 16.7197L13.668 12.6073C14.5024 11.545 15 10.2056 15 8.75C15 5.29822 12.2018 2.5 8.75 2.5Z"
            fill="#91918E" />
    </svg>
)

export const icons = {
    home: <HomeIcon />,
    compose: <ComposeIcon />,
    plus: <PlusSmallIcon />,
    ellipsis: <EllipsisSmallIcon />,
    emoji: <EmojiIcon />,
    image: <ImageIcon />,
    pageEmpty: <PageEmptyIcon />,
    trash: <TrashIcon />,
    arrowTurnUpRight: <ArrowTurnUpRightIcon />,
    duplicate: <DuplicateIcon />,
    link: <LinkIcon />,
    undo: <UndoIcon />,
    eyes: <EyesIcon />,
    chevronDownRoundedThick: <ChevronDownRoundedThick />,
    search: <SearchIcon />
} as const;
