const BattleLog = ({ log }) => {
  return (
    <div className="mt-6 max-h-60 overflow-y-auto bg-gray-800 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-2">Battle Log</h3>
      <ul className="space-y-2">
        {log.map((entry, index) => (
          <li key={index} className="text-sm text-gray-300">{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default BattleLog;

