import "./StudentViewFilter.css";

export default function StudentViewFilter({ options, filterHandler, selectedOption }) {
    return (
        <div className="filter-bar">
            <select
                onChange={filterHandler}
                value={selectedOption}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
