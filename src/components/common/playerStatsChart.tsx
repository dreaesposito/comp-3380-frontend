import { useEffect, useState, useMemo } from "react";
import { Button } from "@heroui/button";
import { Spinner, Switch } from "@heroui/react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

import { ChevronDownIcon } from "@/components/common/tableIcons.tsx";
import SearchBar from "@/components/common/searchBar";
import { Player } from "@/types/Player";
import supabase from "@/utils/supabase";

interface Props {
  player: Player
}

type PlayerStat = {
  season: string;
  numpenaltiez: number;
  numgoalz: number;
  numshotz: number;
  plusminuz: number;
};

const metrics = [
  { key: "numpenaltiez", label: "Penalties" },
  { key: "numgoalz", label: "Goals" },
  { key: "numshotz", label: "Shots" },
  { key: "plusminuz", label: "Plus / Minus" },
];

export default function PlayerStatsChart({ player }: Props) {
  const [playerStats, setplayerStats] = useState<PlayerStat[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("numpenaltiez");
  const [chartType, setChartType] = useState("bar");

  const [comparePlayer, setComparePlayer] = useState<Player | null>(null);
  const [comparePlayerStats, setComparePlayerStats] = useState<PlayerStat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.rpc("get_player_stats_by_season", {
        fname: player.firstname,
        lname: player.lastname,
      });
      if (error) {
        console.error("Error fetching player:", error);
      } else {
        setplayerStats(data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [player]);

  const combinedStats = useMemo(() => {
    // Get all unique seasons from both player and comparePlayer stats
    const allSeasons = [
      ...new Set([
        ...playerStats.map((stat) => stat.season),
        ...comparePlayerStats.map((stat) => stat.season),
      ]),
    ];

    // Combine stats for each season
    const result = allSeasons.map((season) => {
      // Find player and compare stats for the season or {} if not available
      const playerStat: any = playerStats.find((stat) => stat.season === season) || {};
      const compareStat: any = comparePlayerStats.find((stat) => stat.season === season) || {};

      // Build an object for each metric
      const seasonStats = metrics.reduce<{ [key: string]: number }>((acc, { key }) => {
        acc[`${key}`] = playerStat[key] || 0; // Fallback to 0 if no stat for this season
        acc[`comparePlayer_${key}`] = compareStat[key] || 0; // Fallback to 0 if no stat for this season
        return acc;
      }, {});
      
      return {
        season,
        ...seasonStats,
      };
    });

    const sortedData = result.sort((a, b) => {
      const [aStartYear] = a.season.split('-').map(Number);
      const [bStartYear] = b.season.split('-').map(Number);
  
      // Compare years: first by start year, then by end year if start years are equal
      return aStartYear - bStartYear || parseInt(a.season.split('-')[1]) - parseInt(b.season.split('-')[1]);
    });

    return sortedData;
  }, [playerStats, comparePlayerStats]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
  
    return (
      <div className="bg-white border border-gray-300 rounded p-2 shadow text-sm">
        <p><strong>Season:</strong> {label}</p>
        {payload.map((entry: any, index: number) => {
          const isCompare = entry.dataKey.startsWith("comparePlayer_");
          const name = isCompare
            ? `${comparePlayer?.firstname} ${comparePlayer?.lastname}`
            : `${player.firstname} ${player.lastname}`;
          const metricLabel =
            metrics.find((m) => m.key === selectedMetric)?.label || "";
  
          return (
            <p key={index} style={{ color: entry.color }}>
              {name} {metricLabel}: {entry.value}
            </p>
          );
        })}
      </div>
    );
  };
  
  const colour1 = "#3B82F6";
  const colour2 = "#FB923C";
  const chartContent = useMemo(() => {
    const margin = { top: 30, right: 30, left: 30, bottom: 30 };

    const xAxis = (<XAxis 
                    dataKey="season" 
                    label={{
                      value: "Season",
                      position: "insideBottom",
                      offset: -25,
                      style: { textAnchor: "middle", fill: "#555" },
                      fontSize: 20
                    }}
                    tick={{ fontSize: 14 }}
                  />);
            
    const yAxis = (<YAxis
                    label={{
                      value: `${metrics.find((metric) => metric.key === selectedMetric)?.label}`,
                      angle: -90,
                      position: "insideLeft",
                      dx: -25,
                      style: { textAnchor: "middle", fill: "#555" },
                      fontSize: 20
                    }}
                    tick={{ fontSize: 14 }}
                  />);

    if (chartType === "bar") {
      return (
        <BarChart
          data={combinedStats}
          margin={margin}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {xAxis}
          {yAxis}
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey={selectedMetric} fill={colour1} />
          {comparePlayer && (
            <Bar dataKey={`comparePlayer_${selectedMetric}`} fill={colour2}/>
          )}
        </BarChart>
      );
    } else {
      return (
        <LineChart
          data={combinedStats}
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {xAxis}
          {yAxis}
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey={selectedMetric} stroke={colour1}/>
          {comparePlayer && (
            <Line type="monotone" dataKey={`comparePlayer_${selectedMetric}`} stroke={colour2}/> 
          )}
        </LineChart>
      );
    }
  }, [chartType, selectedMetric, playerStats, comparePlayerStats]);


  const ChartLegend = useMemo(() => {
    return(
      <div>
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: colour1 }}
          ></div>
          <span className="text-sm font-medium">{player.firstname} {player.lastname}</span>
          {comparePlayer && (
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: colour2}}
              ></div>
              <span className="text-sm font-medium">
                {comparePlayer.firstname} {comparePlayer.lastname}
              </span>
            </div>
          )}
        </div>
      </div>

    );

  }, [player, comparePlayer]);

  const handleSelect = async (comparePlayer: Player) => {
    setComparePlayer(comparePlayer)

    const { data, error } = await supabase.rpc("get_player_stats_by_season", {
      fname: comparePlayer.firstname,
      lname: comparePlayer.lastname,
    });
    if (error) {
      console.error("Error fetching player information:", error);
    } else {
      setComparePlayerStats(data);
    }
  }

  return (
    <div className="flex items-center">
      <div className=" w-1/4 h-full flex flex-col justify-center items-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
        <p><strong>Stat:</strong></p>
          <Dropdown>
            <DropdownTrigger className="flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="md"
                variant="flat"
              >
                {metrics.find((metric) => metric.key === selectedMetric)?.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Metrics"
              closeOnSelect={true}
              selectedKeys={selectedMetric}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const key = Array.from(keys)[0] as string; // get the first selected key
                setSelectedMetric(key);
              }}
            >
              {metrics.map((metric) => (
                <DropdownItem key={metric.key} className="capitalize">
                  {metric.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="w-3/4 mx-auto m-4 p-4 flex flex-col items-center space-y-4">
          <p><strong>Player to Compare:</strong></p>
          <SearchBar placeholder="Search players..." onSelect={handleSelect} /> 
        </div>
        <div className="flex justify-center space-x-4 m-6">
          <span className="mr-1">Bar Chart</span>
          <Switch
            checked={chartType === "line"}
            onChange={() => setChartType(chartType === "bar" ? "line" : "bar")}
            className="rounded-full w-12 h-6"
            color="default"
          />
          <span className="ml-1">Line Chart</span>
        </div>
      </div>
      {/* <div className=" w-lg place-items-center p-6 bg-default-100 rounded-xl shadow-lg mx-auto"> */}
      <div className="w-3/4 bg-default-100 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center space-x-4 mb-4">
          {ChartLegend}
        </div>
        {loading ? (
          <Spinner
            size="lg"
            className="scale-150 p-14"
            color="default"
            variant="gradient"
          />
        ) : (
          <ResponsiveContainer
            className="items-center"
            height={400}
            width="100%"
          >
            {chartContent}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
