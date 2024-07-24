"use client";
export interface TableElement {
  TableArray: TableArray[];
  pagecount: number;
}
export interface TableData {
  Player: string;
  Title: string;
  PP: number;
  Mods: number;
  Accuracy: number;
}
export interface TableArray {
  name: string;
  title: string;
  version: string;
  pp: number;
  mods: number;
  acc: number;
}
