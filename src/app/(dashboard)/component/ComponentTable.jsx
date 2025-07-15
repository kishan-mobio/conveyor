"use client";

import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEntryTypeConfig, getUnitLabel } from "@/data/components";

export default function ComponentTable({
  components,
  equipmentList,
  onView,
  onEdit,
  onDelete,
}) {
  const headers = ["Name", "Unit", "Entry Type", "Remarks", "Actions"];
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <Table>
          <TableHeader headers={headers} />
          <TableBody>
            {components.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No components found. Add a component to get started.
                </TableCell>
              </TableRow>
            ) : (
              components.map((component) => {
                const entryTypeConfig = getEntryTypeConfig(component.entryType);

                return (
                  <TableRow key={component.id}>
                    <TableCell className="font-medium">
                      {component.name}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {getUnitLabel(component.unit)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${entryTypeConfig.color} border`}
                        variant="outline"
                      >
                        {entryTypeConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <p
                        className="text-sm text-gray-600 truncate"
                        title={component.remarks}
                      >
                        {component.remarks || "—"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView(component)}
                          className="h-8 w-8 p-0"
                          title="View component"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(component)}
                          className="h-8 w-8 p-0"
                          title="Edit component"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(component)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          title="Delete component"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
