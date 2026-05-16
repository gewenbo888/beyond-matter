"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

type Node = d3.SimulationNodeDatum & { id: string; group: number; label?: string };
type Link = d3.SimulationLinkDatum<Node> & { strength: number };

const NODES: Node[] = [
  { id: "Mass",        group: 0 },
  { id: "Energy",      group: 0 },
  { id: "Spacetime",   group: 1 },
  { id: "Curvature",   group: 1 },
  { id: "Symmetry",    group: 2 },
  { id: "Group",       group: 2 },
  { id: "Field",       group: 1 },
  { id: "Particle",    group: 0 },
  { id: "Entanglement",group: 3 },
  { id: "Observer",    group: 3 },
  { id: "Information", group: 3 },
  { id: "Category",    group: 2 },
  { id: "Topology",    group: 2 },
  { id: "Manifold",    group: 1 },
  { id: "Computation", group: 4 },
  { id: "Rule",        group: 4 },
  { id: "Emergence",   group: 4 },
  { id: "Network",     group: 4 },
];

const E = (a: string, b: string, s = 0.4): Link => ({ source: a, target: b, strength: s });

const LINKS: Link[] = [
  E("Mass", "Energy", 0.9),
  E("Mass", "Particle", 0.7),
  E("Energy", "Field"),
  E("Field", "Spacetime"),
  E("Spacetime", "Curvature", 0.9),
  E("Curvature", "Manifold"),
  E("Manifold", "Topology", 0.8),
  E("Topology", "Category", 0.7),
  E("Category", "Symmetry"),
  E("Symmetry", "Group", 0.9),
  E("Group", "Particle", 0.4),
  E("Particle", "Field", 0.6),
  E("Entanglement", "Information", 0.8),
  E("Information", "Observer", 0.7),
  E("Observer", "Field"),
  E("Computation", "Rule", 0.9),
  E("Rule", "Emergence", 0.8),
  E("Emergence", "Network"),
  E("Network", "Category"),
  E("Information", "Computation"),
  E("Entanglement", "Spacetime", 0.3),
  E("Topology", "Spacetime"),
  E("Symmetry", "Information"),
];

const palette = ["#f4ecd8", "#7dd3fc", "#c9a96e", "#e9b96e", "#5eead4"];

export default function RelationGraph() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current!);
    const parent = ref.current!.parentElement!;
    let width = parent.clientWidth;
    let height = parent.clientHeight;
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const nodes: Node[] = NODES.map(n => ({ ...n }));
    const links: Link[] = LINKS.map(l => ({ ...l }));

    const sim = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(d => 80 - d.strength * 30).strength(d => d.strength))
      .force("charge", d3.forceManyBody<Node>().strength(-160))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide<Node>(18))
      .alphaDecay(0.02);

    svg.selectAll("*").remove();

    const defs = svg.append("defs");
    const grad = defs.append("radialGradient").attr("id", "nodeGlow");
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#f4ecd8").attr("stop-opacity", 0.9);
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#f4ecd8").attr("stop-opacity", 0);

    const linkSel = svg.append("g")
      .attr("stroke", "#f4ecd8")
      .attr("stroke-opacity", 0.18)
      .selectAll<SVGLineElement, Link>("line")
      .data(links)
      .enter().append("line")
      .attr("stroke-width", d => 0.4 + d.strength);

    const nodeG = svg.append("g")
      .selectAll<SVGGElement, Node>("g")
      .data(nodes)
      .enter().append("g")
      .style("cursor", "grab")
      .call(d3.drag<SVGGElement, Node>()
        .on("start", (event, d) => { if (!event.active) sim.alphaTarget(0.35).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag",  (event, d) => { d.fx = event.x; d.fy = event.y; })
        .on("end",   (event, d) => { if (!event.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
      );

    nodeG.append("circle")
      .attr("r", 14)
      .attr("fill", "url(#nodeGlow)")
      .attr("opacity", 0.35);

    nodeG.append("circle")
      .attr("r", 4.5)
      .attr("fill", (d: Node) => palette[d.group % palette.length])
      .attr("stroke", "rgba(7,7,10,0.9)")
      .attr("stroke-width", 1);

    nodeG.append("text")
      .text((d: Node) => d.id)
      .attr("x", 9).attr("y", 4)
      .attr("font-family", "var(--font-mono)")
      .attr("font-size", 10.5)
      .attr("fill", "rgba(244,236,216,0.78)")
      .attr("letter-spacing", "0.06em");

    sim.on("tick", () => {
      linkSel
        .attr("x1", d => (d.source as Node).x!)
        .attr("y1", d => (d.source as Node).y!)
        .attr("x2", d => (d.target as Node).x!)
        .attr("y2", d => (d.target as Node).y!);
      nodeG.attr("transform", (d: Node) => `translate(${d.x},${d.y})`);
    });

    const onResize = () => {
      width = parent.clientWidth; height = parent.clientHeight;
      svg.attr("viewBox", `0 0 ${width} ${height}`);
      (sim.force("center") as d3.ForceCenter<Node>).x(width / 2).y(height / 2);
      sim.alpha(0.4).restart();
    };
    const ro = new ResizeObserver(onResize); ro.observe(parent);

    return () => { sim.stop(); ro.disconnect(); };
  }, []);

  return <svg ref={ref} className="w-full h-full" role="img" aria-label="A live force-directed graph of physical and mathematical concepts." />;
}
