# NestJS Workshop – Validation Questions

---

### Q1 — Dead route diagnosis

Look at tasks.controller.ts:27. Right now, findAll() has no route decorator. If you start the server and call GET /tasks, what response do you get — a 404, a 500, or something else? Explain why NestJS behaves that way, and describe exactly what you need to add to fix it.

**Respuesta:**

La respuesta sería **404 Not Found**. Esto ocurre porque no existe ninguna ruta registrada para GET /tasks. En NestJS, un método no se convierte en endpoint si no tiene un decorador como @Get(). Al no tenerlo, Nest no registra la ruta y devuelve 404.

Para solucionarlo, se debe agregar:

@Get()
findAll() {
  return this.tasksService.findAll();
}

---

### Q2 — When transform: true is not enough

main.ts:15 sets transform: true on the global ValidationPipe, which auto-converts types. Yet products.controller.ts:32 still uses ParseIntPipe explicitly on @Param('id').

**Respuesta:**

No hacen exactamente lo mismo. transform: true convierte tipos automáticamente en DTOs, mientras que ParseIntPipe valida explícitamente que el parámetro sea un número entero y lanza un error si no lo es. Es más estricto y claro para parámetros.

---

### Q3 — Silent strip vs hard rejection

main.ts:13-14 enables both whitelist: true and forbidNonWhitelisted: true.

**Respuesta:**

La respuesta sería **201 Created** si los datos válidos cumplen. El campo "password" no genera error, pero tampoco se guarda; se elimina automáticamente.

Esto es un problema de seguridad porque el sistema ignora datos sin avisar, lo que puede ocultar errores o intentos maliciosos.

---

### Q4 — Mutation side-effect

Read products.service.ts...

**Respuesta:**

Sí, sí cambia la información almacenada. Esto ocurre porque se devuelve la referencia directa del arreglo.

Ejemplo:
products[0].name = 'Hack';

Esto modifica el original.

Solución:
return this.products.map(p => ({ ...p }));

---

### Q5 — The optional field trap

**Respuesta:**

La primera petición falla porque el valor no cumple la condición de ser positivo.  
La segunda pasa porque el campo no está presente.

@IsOptional() significa que si el campo no viene, no se valida, pero si viene, debe cumplir todas las reglas.

---

### Q6 — ID reuse after deletion

**Respuesta:**

La nueva tarea recibe el siguiente ID disponible, no reutiliza el anterior.

Si se usara length + 1, se podrían repetir IDs después de eliminar elementos, causando errores.

---

### Q7 — Module forgotten

**Respuesta:**

El servidor inicia normalmente.  
Pero al hacer POST /users devuelve 404 porque las rutas no están registradas.

Es un error de configuración que se manifiesta en runtime.

---

### Q8 — Missing 201

**Respuesta:**

Por defecto, NestJS responde con **201 Created** en un POST.  
No es necesario usar @HttpCode(201) a menos que quieras cambiar el comportamiento.

---

### Q9 — Service throws, not returns null

**Respuesta:**

Se podría devolver null y validar en el controller.  
Pero es mejor lanzar la excepción desde el servicio porque evita repetir lógica y mantiene consistencia en toda la aplicación.
