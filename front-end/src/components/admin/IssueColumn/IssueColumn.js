import IssueCard from '../IssueCard/IssueCard';
import './IssueColumn.css';

function IssueColumn({
    status,
    issues,
    activeOptionsOverlay,
    setActiveOptionsOverlay,
    setIsOverlayOptionsOpen,
    columnSortOptions,
    setColumnSortOptions,
    overlayRef,
    isOverlayOptionsOpen
}) {
    const handleSortOptionClick = (status, sortOption) => {
        const updatedSortOptions = { ...columnSortOptions, [status]: sortOption };
        setColumnSortOptions(updatedSortOptions);
    };

    return (
        <div className="issue-column">
            <div className="column-header">
                <span className={`status-circle ${status.replace(/\s+/g, '').toLowerCase()}`}></span>
                <h3>{status}</h3>
                <span className="issue-count">{issues.length}</span>
                <button
                    className="column-specific-overlay-button"
                    onClick={() => {
                        setActiveOptionsOverlay(status);
                        setIsOverlayOptionsOpen(true);
                    }}
                >
                    ...
                </button>
                {activeOptionsOverlay === status && isOverlayOptionsOpen && (
                    <div className="column-specific-overlay" ref={overlayRef}>
                        <button onClick={() => handleSortOptionClick(status, 'priority')}>
                            Priority ↑
                        </button>
                        <button onClick={() => handleSortOptionClick(status, 'priorityReverse')}>
                            Priority ↓
                        </button>
                        <button onClick={() => handleSortOptionClick(status, 'date')}>
                            Date ↑
                        </button>
                        <button onClick={() => handleSortOptionClick(status, 'dateAscending')}>
                            Date ↓
                        </button>
                    </div>
                )}
            </div>
            {issues.map(issue => (
                <IssueCard key={issue.index} issue={issue} />
            ))}
        </div>
    );
}

export default IssueColumn;
