import { render } from "@testing-library/react"

import Home from "@pages/index"
import Welcome from "@components/Welcome"

it("render home page unchanged", () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})

it("render welcome page unchanged", () => {
  const { container } = render(<Welcome name="Anton!" />)
  expect(container).toMatchSnapshot()
})
