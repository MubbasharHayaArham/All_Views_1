import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const TradingViewWidget = dynamic(() => import('../components/TradingViewWidget'), { ssr: false });

function CollapsibleChart({ id }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const storedState = localStorage.getItem(`tvWidgetCollapsed_${id}`);
    if (storedState !== null) {
      setCollapsed(storedState === "true");
    }
  }, [id]);

  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem(`tvWidgetCollapsed_${id}`, newState);
  };

  return (
    <div style={{ flex: 1, margin: 10 }}>
      <h2>Chart {id}</h2>
      <button onClick={toggleCollapse}>
        {collapsed ? "Expand Chart" : "Collapse Chart"}
      </button>
      <div style={{ display: collapsed ? 'none' : 'block' }}>
        <TradingViewWidget />
      </div>
    </div>
  );
}

export default function Home() {
  const chartRows = [];
  for (let i = 1; i <= 20; i += 2) {
    chartRows.push(
      <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
        <CollapsibleChart id={i.toString()} />
        <CollapsibleChart id={(i + 1).toString()} />
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Panel: 20 Persistent TradingView Charts</h1>
      {chartRows}
    </div>
  );
}