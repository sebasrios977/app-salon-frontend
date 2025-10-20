import AppointmentAPI from "@/api/AppointmentAPI";
import { convertToDDMMYYYY, convertToISO } from "@/helpers/date";
import { defineStore } from "pinia";
import { computed, inject, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./user";

export const useAppointmentsStore = defineStore("appointments", () => {
  const appointmentId = ref("");
  const services = ref([]);
  const date = ref("");
  const hours = ref([]);
  const time = ref("");
  const appointmentsByDate = ref([]);

  const toast = inject("toast");
  const router = useRouter();
  const user = useUserStore();

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id);
  });

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0);
  });

  const isSomeServiceSelected = computed(() => {
    return services.value.length > 0;
  });

  const isValidReservation = computed(() => {
    return services.value.length > 0 && date.value !== "" && time.value !== "";
  });

  const isDateSelected = computed(() => date.value !== "");

  const disableTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find(
        (appointment) => appointment.time === hour
      );
    };
  });

  onMounted(() => {
    const startHour = 10;
    const endHour = 19;

    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(`${hour}:00`);
    }
  });

  watch(date, async () => {
    time.value = "";

    if (date.value === "") return;

    const { data } = await AppointmentAPI.getByDate(date.value);

    if (appointmentId.value) {
      appointmentsByDate.value = data.filter(
        (appointment) => appointment._id !== appointmentId.value
      );

      time.value = data.find(
        (appointment) => appointment._id === appointmentId.value
      ).time;
    } else {
      appointmentsByDate.value = data;
    }
  });

  function setSelectedAppointment(appointment) {
    appointmentId.value = appointment._id;
    services.value = appointment.services;
    date.value = convertToDDMMYYYY(appointment.date);
    time.value = appointment.time;
  }

  function onServiceSelect(service) {
    if (
      services.value.some(
        (selectedService) => selectedService._id === service._id
      )
    ) {
      services.value = services.value.filter(
        (selectedService) => selectedService._id !== service._id
      );
    } else {
      if (services.value.length === 2) {
        alert("Solo puedes seleccionar dos servicios");
        return;
      }
      services.value.push(service);
    }
  }

  async function saveAppointment() {
    const appointment = {
      services: services.value.map((service) => service._id),
      date: convertToISO(date.value),
      time: time.value,
      totalAmount: totalAmount.value,
    };

    if (appointmentId.value) {
      try {
        const { data } = await AppointmentAPI.update(
          appointmentId.value,
          appointment
        );
        toast.success(data.msg);
      } catch (error) {
        toast.error("Error al actualizar la cita");
      }
    } else {
      try {
        const { data } = await AppointmentAPI.create(appointment);
        toast.success(data.msg);
      } catch (error) {
        toast.error("Error al crear la cita");
      }
    }

    clearAppointmentData();
    user.getUserAppointments();
    router.push({ name: "my-appointments" });
  }

  function clearAppointmentData() {
    services.value = [];
    date.value = "";
    time.value = "";
    appointmentId.value = "";
  }

  return {
    services,
    isServiceSelected,
    totalAmount,
    isSomeServiceSelected,
    setSelectedAppointment,
    onServiceSelect,
    clearAppointmentData,
    date,
    hours,
    time,
    isValidReservation,
    disableTime,
    saveAppointment,
    isDateSelected,
  };
});
