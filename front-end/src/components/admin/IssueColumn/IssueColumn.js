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
        <div className="issue-column-admin">
            <div className="column-header-admin">
                <span className={`status-circle-column-header-admin ${status.replace(/\s+/g, '').toLowerCase()}`}></span>
                <h3 className="column-header-admin-status">{status}</h3>
                <span className="issue-count-column-header-admin">{issues.length}</span>
                <button
                    className="column-specific-header-overlay-options-button"
                    onClick={() => {
                        setActiveOptionsOverlay(status);
                        setIsOverlayOptionsOpen(true);
                    }}
                >
                    ...
                </button>
                {activeOptionsOverlay === status && isOverlayOptionsOpen && (
                    <div className="column-specific-header-overlay-options" ref={overlayRef}>
                        <button className="column-specific-header-overlay-options-buttons" onClick={() => handleSortOptionClick(status, 'priority')}>
                            Priority ↑
                        </button>
                        <button className="column-specific-header-overlay-options-buttons" onClick={() => handleSortOptionClick(status, 'priorityReverse')}>
                            Priority ↓
                        </button>
                        <button className="column-specific-header-overlay-options-buttons" onClick={() => handleSortOptionClick(status, 'date')}>
                            Date ↑
                        </button>
                        <button className="column-specific-header-overlay-options-buttons" onClick={() => handleSortOptionClick(status, 'dateAscending')}>
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
