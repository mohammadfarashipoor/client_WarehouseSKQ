import { Fragment } from "react";

function TabList(props) {
    const { tabOption, name } = props;
    return (
        <div role="tablist" className="tabs tabs-lifted">
            {tabOption.map((item, index) => (
                <Fragment key={index}>
                    <input
                        type="radio"
                        name={name}
                        role="tab"
                        className="tab"
                        aria-label={item.ariaLabel}
                        key={index}
                        defaultChecked={item.defaultChecked ? item.defaultChecked : false} />
                    <div role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        {item.children}
                    </div>
                </Fragment>
            ))}
        </div>
    );
}

export default TabList;
