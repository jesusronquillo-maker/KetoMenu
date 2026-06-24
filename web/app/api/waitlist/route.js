import { NextResponse } from "next/server"

// Fase 0: stub. En Fase 1 (Auth + DB) este handler escribe en la tabla `waitlist`
// de Supabase y dispara un email de confirmación con Resend.
//
// Por ahora valida formato y devuelve 200 para que la UI funcione end-to-end.

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 })
    }

    // TODO Fase 1: insertar en `waitlist` y enviar email con Resend.
    console.log("[waitlist stub] nuevo signup:", email)

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: "Error procesando la solicitud." }, { status: 500 })
  }
}
