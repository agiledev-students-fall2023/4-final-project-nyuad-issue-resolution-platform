import { useState, useRef, useEffect } from 'react';
import './SearchBarAdmin.css';

function SearchBarAdmin({ searchText, onSearchTextChange }) {
    const [keywordSuggestions, setKeywordSuggestions] = useState([]);
    const keywordList = ['name:', 'netid:', 'date:', 'priority:'];
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target) &&
                dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setKeywordSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        const suggestions = keywordList.filter(keyword => keyword.toLowerCase().includes(inputValue));
        setKeywordSuggestions(suggestions);
        onSearchTextChange(e.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        onSearchTextChange(suggestion);
        setKeywordSuggestions([]);
    };

    return (
        <div className="search-bar-admin">
            <form onSubmit={(e) => e.preventDefault()} className="search-bar-admin-form">
                <input
                    ref={inputRef}
                    className="search-bar-admin-form-input"
                    type="text"
                    placeholder="Search by keyword, netid:, name:, date:, priority:"
                    value={searchText}
                    onChange={handleInputChange}
                />
                {keywordSuggestions.length > 0 && (
                    <ul className="suggestions-dropdown" ref={dropdownRef}>
                        {keywordSuggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
}

export default SearchBarAdmin;
