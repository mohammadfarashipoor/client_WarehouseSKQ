import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

function NotificationCard(props) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => setExpanded(prev => !prev);
    const { _id, title, message, onMarkAsRead, maxLength = 50 } = props

    // در اینجا threshold برابر با 100 کاراکتر در نظر گرفته شده است.
    const isLong = message.length > maxLength;
    const displayedText = expanded || !isLong ? message : message.slice(0, maxLength) + '...';

    // اگر تابع onMarkAsRead ارسال نشده باشد، یک تابع پیش‌فرض اجرا می‌شود.
    const markAsRead = () => {
        if (onMarkAsRead) {
            onMarkAsRead(_id);
        }
    };
    return (
        <div className="card  bg-base-100 shadow-lg my-4 relative" onClick={toggleExpand}>
            <div className="card-body w-auto p-0 md:w-[35vw]" >
                <button
                    className="absolute top-0 left-0 transform transition-transform duration-300 p-2"
                    style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    aria-label="Toggle Full Message"
                >
                    <ChevronDownIcon className='w-5 h-5' />
                </button>
                <p className='font-semibold'>
                    {title}
                </p>
                <p className='text-wrap'>
                    {displayedText}
                </p>

                {expanded && <div className="card-actions justify-end mt-4">
                    <button onClick={markAsRead} className="btn btn-ghost btn-sm w-full">
                        خوانده شده
                    </button>
                </div>}
            </div>
        </div>
    );
}

export default NotificationCard;
