import AppointmentAPI from "@/api/AppointmentAPI";
import { convertToISO } from "@/helpers/date";
import { defineStore } from "pinia";
import { computed, inject, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

export const useAppointmentsStore = defineStore("appointments", () => {
  const services = ref([]);
  const date = ref("");
  const hours = ref([]);
  const time = ref("");
  const appointmentsByDate = ref([]);

  const toast = inject("toast");
  const router = useRouter();

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
    appointmentsByDate.value = data;
  });

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

  async function createAppointment() {
    const appointment = {
      services: services.value.map((service) => service._id),
      date: convertToISO(date.value),
      time: time.value,
      totalAmount: totalAmount.value,
    };

    try {
      const { data } = await AppointmentAPI.create(appointment);
      toast.success(data.msg);
      router.push({ name: "my-appointments" });
      clearAppointmentData();
    } catch (error) {
      toast.error("Error al crear la cita");
    }
  }

  function clearAppointmentData() {
    services.value = [];
    date.value = "";
    time.value = "";
  }

  return {
    services,
    isServiceSelected,
    totalAmount,
    isSomeServiceSelected,
    onServiceSelect,
    date,
    hours,
    time,
    isValidReservation,
    disableTime,
    createAppointment,
    isDateSelected,
  };
});
