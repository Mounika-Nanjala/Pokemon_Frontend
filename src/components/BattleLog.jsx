const BattleLog = ({ log }) => {
    return (
        <div className="container mt-6 max-h-100 max-w-[800px] overflow-y-auto border border-gray-700  p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-center">Battle Log</h3>
            <ul className="space-y-4">
                {log.length > 0 ? (
                    [...log].reverse().map((entry, index) => (
                        <li
                            key={index}
                            className={`text-sm flex items-center p-2 rounded-md ${
                                entry.type === "enemy"
                                    ? "border-red-500 justify-end border-r-4 bg-red-700/20 shadow-sm"
                                    : "border-yellow-500 bg-gray-900 justify-start border-l-4 bg-yellow-500/20 shadow-sm"
                            }`}>
                            {entry.text}
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm italic text-center">
                        No battle actions yet...
                    </p>
                )}
            </ul>
        </div>
    );
};

export default BattleLog;
