import './SearchBarAdmin.css';

function SearchBarAdmin({ searchText, onSearchTextChange }) {
    return (
        <div className="search-bar-admin">
            <form onSubmit={(e) => e.preventDefault()} className="search-bar-admin-form">
                <input className="search-bar-admin-form-input"
                    type="text"
                    placeholder="Search by keyword, netid:, name:, date:, priority:"
                    value={searchText}
                    onChange={(e) => onSearchTextChange(e.target.value)}
                />
            </form>
        </div>
    );
}

export default SearchBarAdmin;
