import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GameTableRowSkeleton from "../GameTableRowSkeleton";

describe("GameTableRowSkeleton", () => {
  it("should render correctly", () => {
    const { container } = render(
      <table>
        <tbody>
          <GameTableRowSkeleton />
        </tbody>
      </table>
    );

    // Check if it renders the correct number of cells (6 columns)
    const cells = container.querySelectorAll("td");
    expect(cells).toHaveLength(6);
  });
});
