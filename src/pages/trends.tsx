///////////////////////////////////////
// npm install recharts
//
// ///////////////////////////////////
// import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

import supabase from "../utils/supabase";

import React from "react";

import { useEffect, useState } from "react";
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

import { Button } from "@heroui/button";
import { Switch } from "@heroui/react";

const metrics = [
  { key: "numpenalties", label: "Penalties" },
  { key: "numgoals", label: "Goals" },
  { key: "numshots", label: "Shots" },
];

export default function TrendsPage() {
  const [data, setData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("numpenalties");
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    const fetchData = async () => {
      let rpcfunc = "";
      if (selectedMetric === "numpenalties")
        rpcfunc = "get_penalties_per_season";
      else if (selectedMetric === "numgoals") rpcfunc = "get_goals_per_season";
      else if (selectedMetric === "numshots") rpcfunc = "get_shots_per_season";

      const { data, error } = await supabase.rpc(rpcfunc);

      if (error) {
        console.error("Error fetching penalties:", error);
      } else {
        console.log(data);
        setData(data);
      }
    };

    fetchData();
  }, [selectedMetric, chartType]);

  const chartContent = React.useMemo(() => {
    if (chartType === "bar") {
      return (
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="season" />
          <YAxis
            label={{
              value: `Number of ${metrics.find((metric) => metric.key === selectedMetric)?.label}`,
              angle: -90,
              position: "insideLeft",
              dx: -25,
              style: { textAnchor: "middle", fill: "#555" },
            }}
          />
          <Tooltip />
          <Bar dataKey={selectedMetric} fill="#8884d8" />
        </BarChart>
      );
    } else {
      return (
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="season" />
          <YAxis
            label={{
              value: `Number of ${metrics.find((metric) => metric.key === selectedMetric)?.label}`,
              angle: -90,
              position: "insideLeft",
              dx: -25,
              style: { textAnchor: "middle", fill: "#555" },
            }}
          />
          <Tooltip />
          <Line type="monotone" dataKey={selectedMetric} stroke="#82ca9d" />
        </LineChart>
      );
    }
  }, [chartType, selectedMetric, data]);

  return (
    <DefaultLayout>
      {/* <h1 className="text-center text-3xl font-extrabold mb-8">Stats by Season</h1> */}
      <div className="w-3/4 mx-auto mb-4">
        <h1 className="text-center text-4xl font-bold">Stats by Season</h1>
      </div>

      <div className="p-6 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg w-3/4 mx-auto">
        {/* <h2 className="text-xl font-bold mb-4">Trends Per Season</h2> */}

        <div className="flex justify-center space-x-4 mb-6">
          {metrics.map((metric) => (
            <Button
              key={metric.label}
              variant={selectedMetric === metric.key ? "solid" : "bordered"}
              // color={selectedMetric === metric.key ? "success" : "default"}
              onPress={() => setSelectedMetric(metric.key)}
            >
              {metric.label}
            </Button>
          ))}
        </div>
        {/* <h2 className="text-xl font-bold mb-4">Penalties Per Season</h2>
        <h2 className="text-xl font-bold mb-4">
          {selectedMetric === "numpenalties" && "Penalties Per Season"}
          {selectedMetric === "numgoals" && "Goals Per Season"}
          {selectedMetric === "numshots" && "Shots Per Season"}
        </h2> */}

        <ResponsiveContainer width="100%" height={300}>
          {chartContent}
          {/* <BarChart data={data} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="season" />
            <YAxis label={{ 
              value: `Number of ${metrics.find(metric => metric.key === selectedMetric)?.label}`,
              angle: -90, 
              position: "insideLeft", 
              dx: -25,
              style: { textAnchor: "middle", fill: "#555" }
            }} />
            <Tooltip />
            <Bar dataKey={selectedMetric} fill="#8884d8" />
          </BarChart> */}
        </ResponsiveContainer>

        {/* <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="season" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="numpenalties" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>  */}

        <div className="flex justify-center space-x-4 mt-4">
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
    </DefaultLayout>
  );
}
