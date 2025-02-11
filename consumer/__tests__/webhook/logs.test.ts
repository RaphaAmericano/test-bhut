import request from "supertest";
import server from "../../src/server";
import { logsWebhook } from "../../src/webhook";

const { sendLogNotification } = logsWebhook;

describe("Logs Webhooks", () => {
  it("should send webhook", async () => {
    const response = await sendLogNotification({
      car_id: "mensagem teste",
      data_hora_criacao: new Date().getTime(),
    });
    expect(response.success).toBe(true);
  });
});
